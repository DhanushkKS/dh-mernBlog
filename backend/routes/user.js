/**
 * Route hadana widiya
 * 
 * (1) express ganna
 * (2) adala controllers tika ganna
 * (3) express eken router variable eka hada ganna
 * (4) adala routes tika danna
 * (5) router eka export karanna
 */
const express = require('express');
const { loginUser, registerUser } = require('../controllers/userController')
const router = express.Router();
/** login */
router.post('/login', loginUser);
/**Register */
router.post('/register', registerUser)

module.exports = router