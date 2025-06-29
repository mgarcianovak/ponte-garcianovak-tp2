const { DataTypes } = require('sequelize');
const sequelize = require('../config/bd');
// Importa la instancia de Sequelize desde tu archivo de configuración
//Define la estructura de la tabla y cómo debe comportarse en Node.js. 
const Producto = sequelize.define('Producto', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  precio: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    // Validación para asegurarse de que el precio sea un número positivo
    get() {
        const Value = this.getDataValue('precio');
        return Value === null ? null : parseFloat(Value);
      }
  },
  imagen: {
    type: DataTypes.STRING,
  },
  tipo: {
    type: DataTypes.ENUM('pc', 'notebook'),
    allowNull: false,
  },
  activo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
}, {
  tableName: 'productos',
  timestamps: false,
});

module.exports = Producto;