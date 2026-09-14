process.env.NODE_ENV = 'test';
process.env.SESSION_SECRET = 'test-secret-that-is-long-enough-for-tests';
process.env.FRONTEND_URL = 'http://frontend.test';
process.env.CORS_ORIGINS = 'http://frontend.test,http://localhost:3000';

const assert = require('node:assert/strict');
const http = require('node:http');
const { after, before, test } = require('node:test');
const cors = require('cors');
const express = require('express');
const session = require('express-session');
const { configurePassport, passport } = require('../src/config/passport');
const { createSessionMiddleware, getCookieOptions } = require('../src/config/session');
const { createCorsOptions } = require('../src/config/cors');
const {
  createDiscordCallbackHandler,
  getAuthenticatedUser,
  logout,
} = require('../src/controllers/authController');

let server;
let baseUrl;

before(async () => {
  configurePassport({ loadIdentity: async (identity) => identity });
  const app = express();
  app.use(cors(createCorsOptions(['http://frontend.test'])));
  app.use(createSessionMiddleware({ store: new session.MemoryStore() }));
  app.use(passport.initialize());
  app.use(passport.session());

  app.get('/test/callback/:status', (req, res, next) => {
    req.logIn({ id: '123456', username: 'RikkaUser', avatar: 'avatar' }, (error) => {
      if (error) return next(error);
      return createDiscordCallbackHandler(async () => ({ status: req.params.status }))(req, res, next);
    });
  });
  app.get('/api/auth/user', getAuthenticatedUser);
  app.post('/api/auth/logout', logout);

  server = http.createServer(app);
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  baseUrl = `http://127.0.0.1:${server.address().port}`;
});

after(async () => {
  await new Promise((resolve) => server.close(resolve));
});

function cookieFrom(response) {
  return response.headers.get('set-cookie').split(';', 1)[0];
}

test('guest receives 401 from the current-user endpoint', async () => {
  const response = await fetch(`${baseUrl}/api/auth/user`);
  assert.equal(response.status, 401);
  assert.deepEqual(await response.json(), { authenticated: false });
});

for (const [registrationStatus, expectedStatus] of [['created', 'verified'], ['ip_taken', 'blocked']]) {
  test(`callback persists an authenticated ${expectedStatus} identity`, async () => {
    const callback = await fetch(`${baseUrl}/test/callback/${registrationStatus}`, { redirect: 'manual' });
    assert.equal(callback.status, 302);
    const setCookie = callback.headers.get('set-cookie');
    assert.match(setCookie, /rikka\.sid=/);
    assert.match(setCookie, /HttpOnly/i);
    assert.match(setCookie, /SameSite=Lax/i);
    const cookie = cookieFrom(callback);

    const first = await fetch(`${baseUrl}/api/auth/user`, { headers: { cookie } });
    assert.equal(first.status, 200);
    const firstBody = await first.json();
    assert.equal(firstBody.user.id, '123456');
    assert.equal(firstBody.user.verificationStatus, expectedStatus);
    assert.equal('accessToken' in firstBody.user, false);

    const refreshed = await fetch(`${baseUrl}/api/auth/user`, { headers: { cookie } });
    assert.equal(refreshed.status, 200);
    assert.equal((await refreshed.json()).authenticated, true);
  });
}

test('logout destroys the server session and expires the cookie', async () => {
  const callback = await fetch(`${baseUrl}/test/callback/created`, { redirect: 'manual' });
  const cookie = cookieFrom(callback);
  const logoutResponse = await fetch(`${baseUrl}/api/auth/logout`, {
    method: 'POST',
    headers: { cookie },
  });
  assert.equal(logoutResponse.status, 200);
  assert.match(logoutResponse.headers.get('set-cookie'), /Expires=Thu, 01 Jan 1970/i);

  const afterLogout = await fetch(`${baseUrl}/api/auth/user`, { headers: { cookie } });
  assert.equal(afterLogout.status, 401);
});

test('CORS allows the configured frontend with credentials and rejects other origins', async () => {
  const allowed = await fetch(`${baseUrl}/api/auth/user`, {
    headers: { origin: 'http://frontend.test' },
  });
  assert.equal(allowed.headers.get('access-control-allow-origin'), 'http://frontend.test');
  assert.equal(allowed.headers.get('access-control-allow-credentials'), 'true');

  const options = createCorsOptions(['http://frontend.test']);
  await new Promise((resolve) => options.origin('http://evil.test', (error) => {
    assert.match(error.message, /not allowed/i);
    resolve();
  }));
});

test('cookie policy is persistent locally and secure in production', () => {
  const local = getCookieOptions(false);
  const production = getCookieOptions(true);
  assert.equal(local.httpOnly, true);
  assert.equal(local.secure, false);
  assert.equal(local.sameSite, 'lax');
  assert.equal(local.maxAge, 7 * 24 * 60 * 60 * 1000);
  assert.equal(production.secure, true);
});
