const express = require('express');

const { createAccount, login } = require('../controllers/auth-controller');

const router = express.Router();

router.post('/create', createAccount);

router.post('/', login);

module.exports = router;