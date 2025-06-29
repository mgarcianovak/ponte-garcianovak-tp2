const express = require('express');
const router = express.Router();
const TicketController = require('../../controller/ticketController');

router.post('/', TicketController.create);

module.exports = router;