const bcrypt = require('bcrypt');
const { DataTypes } = require('sequelize');
const sequelize = require('../../server/config/bd');
//modelo de la tabla administrador que esta en la base de datos
const Administrador = sequelize.define('Administrador', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  contraseña: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'administrador',
  timestamps: false
});

module.exports = Administrador;

