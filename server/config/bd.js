//llamo a sequelize para conectarme a la base de datos
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('techZone', 'root', 'manager1', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;
// nota:por el momento solo traigo los produtos que estan en la base de datos falta colocar los nombres de los usuarios y las contraseñas