const express = require('express');
const { getHello } = require('../controllers/helloController');

const router = express.Router();

router.get('/hello', getHello);

module.exports = router;
