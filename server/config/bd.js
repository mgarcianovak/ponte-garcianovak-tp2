//llamo a sequelize para conectarme a la base de datos
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('techZone', 'root', 'manager1', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;
       