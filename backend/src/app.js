require('dotenv').config();

const express = require('express');
const cors = require('cors');
const corsOptions = require('./config/cors');
const sessionMiddleware = require('./config/session');
const { configurePassport, passport } = require('./config/passport');
const apiRoutes = require('./routes');
const authRoutes = require('./routes/authRoutes');
const notFound = require('./middleware/notFound');
const errorHandler = require('./middleware/errorHandler');

configurePassport();

const app = express();

app.set('trust proxy', 1);

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());

app.use(authRoutes);
app.use('/api', apiRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
