const Ticket = require('../models/Ticket');

exports.createTicket = async (data) => {
  return await Ticket.create({
    nombre_cliente: data.nombre_cliente,
    total: data.total
    // fecha se setea automáticamente por defaultValue
  });
};

exports.getAllTickets = async () => {
  return await Ticket.findAll();
};