const express = require('express');
const { body } = require('express-validator');

const { createAccount, login } = require('../controllers/auth-controller');

const router = express.Router();

router.post('/create', 
[
    body('login', 'Use latin letters').isAlpha(),
    body('password', 'Minimum length 6 symbols').isLength({ min: 6})
]
,createAccount);

router.post('/',
[
    body('login', 'Use latin letters').isAlpha(),
    body('password', 'Minimum length 6 symbols').isLength({ min: 6})
]
, login);

module.exports = router;