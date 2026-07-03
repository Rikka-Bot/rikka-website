const express = require('express');
const helloRoutes = require('./helloRoutes');

const router = express.Router();

router.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

router.use(helloRoutes);

module.exports = router;
