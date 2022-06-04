var express = require('express');
var router = express.Router();

const ticketController = require('../controllers/ticket.controller')


router.post('/', ticketController.confirmTicket)


router.post('/confirm', ticketController.saveTicket)

module.exports = router;
