// Exemplo de como integrar com MongoDB/PostgreSQL para persistir usuários
// Este arquivo é apenas um exemplo - você precisará escolher seu banco de dados

/*
=== OPÇÃO 1: MongoDB com Mongoose ===

npm install mongoose

---

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  discordId: { type: String, unique: true, required: true },
  username: String,
  email: String,
  avatar: String,
  accessToken: String,
  refreshToken: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

// No server.js, na função done do DiscordStrategy:
(accessToken, refreshToken, profile, done) => {
  User.findOneAndUpdate(
    { discordId: profile.id },
    {
      username: profile.username,
      email: profile.email,
      avatar: profile.avatar,
      accessToken: accessToken,
      refreshToken: refreshToken,
      updatedAt: Date.now()
    },
    { upsert: true, new: true }
  ).then(user => {
    done(null, user);
  }).catch(err => {
    done(err);
  });
}

---

=== OPÇÃO 2: PostgreSQL com Prisma ===

npm install @prisma/client prisma

npx prisma init

---

// schema.prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id            Int     @id @default(autoincrement())
  discordId     String  @unique
  username      String
  email         String?
  avatar        String?
  accessToken   String
  refreshToken  String
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
}

---

// No server.js:
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

(accessToken, refreshToken, profile, done) => {
  prisma.user.upsert({
    where: { discordId: profile.id },
    update: {
      username: profile.username,
      email: profile.email,
      avatar: profile.avatar,
      accessToken: accessToken,
      refreshToken: refreshToken
    },
    create: {
      discordId: profile.id,
      username: profile.username,
      email: profile.email,
      avatar: profile.avatar,
      accessToken: accessToken,
      refreshToken: refreshToken
    }
  }).then(user => {
    done(null, user);
  }).catch(err => {
    done(err);
  });
}

---

=== OPÇÃO 3: SQLite com sqlite3 simples ===

npm install sqlite3

---

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./users.db');

// Criar tabela
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY,
    discordId TEXT UNIQUE,
    username TEXT,
    email TEXT,
    avatar TEXT,
    accessToken TEXT,
    refreshToken TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);
});

// No server.js:
(accessToken, refreshToken, profile, done) => {
  db.run(
    `INSERT OR REPLACE INTO users (discordId, username, email, avatar, accessToken, refreshToken)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [profile.id, profile.username, profile.email, profile.avatar, accessToken, refreshToken],
    (err) => {
      if (err) return done(err);
      done(null, { id: profile.id, username: profile.username });
    }
  );
}

*/

// ============================================
// IMPLEMENTAÇÃO SEM BANCO DE DADOS (ATUAL)
// ============================================

// No momento, os usuários são armazenados apenas na sessão.
// Para produção, recomenda-se usar um banco de dados.

// Exemplo simples com variável em memória (NÃO use em produção):
//const users = new Map();

// No DiscordStrategy:
/*
(accessToken, refreshToken, profile, done) => {
  const user = {
    id: profile.id,
    username: profile.username,
    avatar: profile.avatar,
    email: profile.email,
    accessToken: accessToken,
    refreshToken: refreshToken
  };
  
  users.set(profile.id, user);
  return done(null, user);
}
*/
