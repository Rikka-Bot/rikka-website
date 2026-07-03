require('dotenv').config();

const express = require('express');
const session = require('express-session');
const passport = require('passport');
const DiscordStrategy = require('passport-discord').Strategy;
const next = require('next');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');
const { sendNewUserWebhook } = require('./lib/discordWebhook');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const PORT = process.env.PORT || 3000;
const DISCORD_CLIENT_ID = process.env.DISCORD_CLIENT_ID;
const DISCORD_CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET;
const DISCORD_REDIRECT_URI = process.env.DISCORD_REDIRECT_URI || `https://rikka-website-production.up.railway.app/auth/discord/callback`;

// Validar configuração Discord obrigatória
if (!DISCORD_CLIENT_ID || !DISCORD_CLIENT_SECRET) {
  console.error('DISCORD_CLIENT_ID e DISCORD_CLIENT_SECRET são obrigatórios');
  console.error('   Configure essas variáveis no arquivo .env');
  process.exit(1);
}

// Store temporário de usuários para a sessão
const userStore = new Map();

let serviceAccount = null;

if (process.env.FIREBASE_SERVICE_ACCOUNT) {
  try {
    serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
  } catch (error) {
    console.error(' Erro ao parsear FIREBASE_SERVICE_ACCOUNT:', error);
  }
}

if (serviceAccount) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    projectId: process.env.FIREBASE_PROJECT_ID,
  });
} else {
  console.warn('⚠️ FIREBASE_SERVICE_ACCOUNT não configurado. O cadastro no Firestore pode não funcionar.');
}

const firestore = admin.apps.length ? admin.firestore() : null;

function getClientIp(req) {
  const forwardedFor = req.headers['x-forwarded-for'];

  if (typeof forwardedFor === 'string' && forwardedFor.trim()) {
    return forwardedFor.split(',')[0].trim();
  }

  return req.ip || req.connection?.remoteAddress || 'unknown';
}

async function registerUserProfile(profile, ipAddress) {
  if (!firestore) {
    throw new Error('Firebase Admin não está inicializado.');
  }

  const discordId = String(profile.id);
  const userRef = firestore.collection('users').doc(discordId);
  const existingUser = await userRef.get();

  if (existingUser.exists) {
    return { status: 'existing' };
  }

  const existingIpSnapshot = await firestore
    .collection('users')
    .where('ipAddress', '==', ipAddress)
    .limit(1)
    .get();

  if (!existingIpSnapshot.empty) {
    return { status: 'ip_taken' };
  }

  const createdAt = admin.firestore.FieldValue.serverTimestamp();

  await userRef.set({
    discordId,
    username: profile.username || 'Unknown',
    avatar: profile.avatar || null,
    ipAddress,
    createdAt,
  });

  await userRef.collection('inventory').doc('potion_001').set({
    name: 'Poção',
    quantity: 1,
    rarity: 'common',
    obtainedAt: createdAt,
  });

  await userRef.collection('inventory').doc('sword_iron').set({
    name: 'Espada de Ferro',
    quantity: 1,
    rarity: 'uncommon',
    obtainedAt: createdAt,
  });

  await userRef.collection('inventory').doc('ticket_01').set({
    name: 'Ticket',
    quantity: 1,
    rarity: 'rare',
    obtainedAt: createdAt,
  });

  await userRef.collection('collection').doc('lumine').set({
    level: 1,
    experience: 0,
    constellations: 0,
    obtainedAt: createdAt,
    attributes: {
      element: 'anemo',
      rarity: '★★★★★',
    },
  });

  await userRef.collection('collection').doc('amber').set({
    level: 1,
    experience: 0,
    constellations: 0,
    obtainedAt: createdAt,
    attributes: {
      element: 'pyro',
      rarity: '★★★★☆',
    },
  });

  await userRef.collection('collection').doc('ayaka').set({
    level: 1,
    experience: 0,
    constellations: 0,
    obtainedAt: createdAt,
    attributes: {
      element: 'cryo',
      rarity: '★★★★★',
    },
  });

  await userRef.collection('currencies').doc('main').set({
    coins: 0,
    gems: 0,
    tickets: 0,
  });

  await userRef.collection('settings').doc('profile').set({
    language: 'pt-BR',
    notifications: true,
  });

  await userRef.collection('statistics').doc('summary').set({
    level: 1,
    xp: 0,
    createdAt,
  });

  await userRef.collection('wishlist_char').doc('default').set({
    characters: [],
  });

  try {
    await sendNewUserWebhook({
      username: profile.username,
      discordId,
      ipAddress,
    });
  } catch (webhookError) {
    console.error('❌ Erro ao enviar webhook do Discord:', webhookError.message);
  }

  return { status: 'created' };
}

// Configurar Passport Discord Strategy
passport.use(
  new DiscordStrategy(
    {
      clientID: DISCORD_CLIENT_ID,
      clientSecret: DISCORD_CLIENT_SECRET,
      callbackURL: DISCORD_REDIRECT_URI,
      scope: ['identify', 'email', 'guilds']
    },
    (accessToken, refreshToken, profile, done) => {
      // Armazenar o usuário completo
      const user = {
        id: profile.id,
        username: profile.username,
        avatar: profile.avatar,
        email: profile.email,
        accessToken: accessToken,
        refreshToken: refreshToken,
        guilds: profile.guilds
      };
      console.log('🎭 Novo login Discord:', user.username);
      userStore.set(user.id, user); // Salvar no store
      return done(null, user);
    }
  )
);

// Serializar e desserializar usuário
passport.serializeUser((user, done) => {
  console.log('📦 Serializando usuário:', user.username);
  // Serializar o usuário completo (não apenas o ID)
  done(null, JSON.stringify(user));
});

passport.deserializeUser((userData, done) => {
  console.log('📦 Desserializando usuário');
  try {
    const user = typeof userData === 'string' ? JSON.parse(userData) : userData;
    console.log('✅ Usuário recuperado:', user.username);
    done(null, user);
  } catch (error) {
    console.error('❌ Erro ao desserializar usuário:', error);
    done(error);
  }
});

// Iniciar a aplicação Next.js antes de configurar as rotas
app.prepare().then(() => {
  const server = express();

  // Middlewares
  server.use(bodyParser.json());
  server.use(bodyParser.urlencoded({ extended: true }));

  // Middleware para acessar userStore
  server.use((req, res, next) => {
    req.userStore = userStore;
    next();
  });

  // Configurar CORS para fetch com credentials
  server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'https://rikka-website-production.up.railway.app/');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    
    if (req.method === 'OPTIONS') {
      return res.sendStatus(200);
    }
    next();
  });

  // Configurar sessão
  server.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 // 24 horas
      }
    })
  );

  // Inicializar Passport
  server.use(passport.initialize());
  server.use(passport.session());

  // Paths que não requerem autenticação
  const publicPaths = [
    '/_next',
    '/public',
    '/api/hello',
    '/auth/discord',
    '/logout'
  ];

  // Middleware para debug de todas as requisições
  server.use((req, res, next) => {
    const isPublicPath = publicPaths.some(path => req.url.startsWith(path));
    if (!isPublicPath) {
      console.log(`📍 [${req.method}] ${req.url} - Autenticado: ${req.isAuthenticated()}`);
    }
    next();
  });

  // Rotas de autenticação Discord
  server.get('/auth/discord', passport.authenticate('discord'));

  server.get(
    '/auth/discord/callback',
    passport.authenticate('discord', { failureRedirect: '/' }),
    async (req, res) => {
      try {
        const ipAddress = getClientIp(req);
        console.log('✅ Usuário autenticado:', req.user?.username);
        console.log('🔐 Sessão ID:', req.sessionID);
        console.log('🌐 IP do usuário:', ipAddress);

        const result = await registerUserProfile(req.user, ipAddress);

        if (result.status === 'ip_taken') {
          return res.redirect('/bloqueado');
        }

        return res.redirect('/sucesso');
      } catch (error) {
        console.error('❌ Erro ao processar cadastro do Discord:', error);
        return res.redirect('/');
      }
    }
  );

  // Rota alternativa de callback da API (configurada no Discord Developer Portal)
  server.get(
    '/api/auth/callback',
    passport.authenticate('discord', { failureRedirect: '/' }),
    async (req, res) => {
      try {
        const ipAddress = getClientIp(req);
        console.log('✅ Usuário autenticado via /api/auth/callback:', req.user?.username);
        console.log('🔐 Sessão ID:', req.sessionID);
        console.log('🌐 IP do usuário:', ipAddress);

        const result = await registerUserProfile(req.user, ipAddress);

        if (result.status === 'ip_taken') {
          return res.redirect('/bloqueado');
        }

        return res.redirect('/sucesso');
      } catch (error) {
        console.error('❌ Erro ao processar cadastro do Discord via API:', error);
        return res.redirect('/');
      }
    }
  );

  // Rota de logout
  server.get('/logout', (req, res) => {
    console.log('🚪 Logout iniciado para:', req.user?.username);
    req.logout((err) => {
      if (err) {
        return res.status(500).json({ error: 'Erro ao fazer logout' });
      }
      res.redirect('/?logged_out=true');
    });
  });

  server.post('/logout', (req, res) => {
    console.log('🚪 Logout iniciado para:', req.user?.username);
    req.logout((err) => {
      if (err) {
        return res.status(500).json({ error: 'Erro ao fazer logout' });
      }
      res.redirect('/?logged_out=true');
    });
  });

  // Rota para obter informações do usuário
  server.get('/api/auth/user', (req, res) => {
    console.log('� [EXPRESS ROUTE] GET /api/auth/user');
    console.log('👤 Verificando autenticação. Autenticado?', req.isAuthenticated());
    console.log('📋 Sessão ID:', req.sessionID);
    console.log('👥 Usuário:', req.user?.username);
    
    if (!req.isAuthenticated()) {
      console.log('❌ Usuário não autenticado, retornando 401');
      return res.status(401).json({ authenticated: false });
    }
    console.log('✅ Retornando dados do usuário');
    res.json({ authenticated: true, user: req.user });
  });

  // Rota de logout da API
  server.post('/api/auth/logout', (req, res) => {
    req.logout((err) => {
      if (err) {
        return res.status(500).json({ error: 'Erro ao fazer logout' });
      }
      res.json({ success: true });
    });
  });

  // Tratador padrão para Next.js - usar middleware ao invés de rota
  server.use((req, res) => {
    console.log(`[NEXT.js] Processando: ${req.method} ${req.url}`);
    return handle(req, res);
  });

  server.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`✅ Servidor rodando em http://localhost:${PORT}`);
    console.log(`📝 Autenticação Discord configurada`);
  });
});





