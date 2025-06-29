const ticketService = require('../service/ticketService');

exports.create = async (req, res) => {
  try {
    const nuevoTicket = await ticketService.createTicket(req.body);

    const mapeo_ticket = {
      id: nuevoTicket.id,
      nombre_cliente: nuevoTicket.nombre_cliente,
      fecha: nuevoTicket.fecha,
      total: nuevoTicket.total
    };

    res.status(201).json(mapeo_ticket);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al guardar ticket' });
  }
};