var express = require('express');
const { signUp } = require('../controllers/account.controller');
var router = express.Router();

const accountController = require('../controllers/account.controller')

/* Check login method = post (request: {email,password}, response: code(200 = true, 404 = not found, 500 = system error), msg). */
router.post('/', accountController.verifyAccount)

/* SIGN UP method = post (request: {email,hoten,password,sdt}, response: code(200 = Success, 403 = Failed, 500 = system error), msg). */
router.post('/signup', accountController.signUp)

module.exports = router;
