const { DataTypes } = require('sequelize');
const sequelize = require('../config/bd'); 
// crear una instancia del modelo Usuarios
// que representa la tabla usuarios en la base de datos
const Usuarios = sequelize.define('Usuarios', {
  nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    tableName: 'usuarios',
    timestamps: false,
  });


module.exports = Usuarios;