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
//este codigo crea un administrador(por cosola) con la contraseña incriptada//no especifica en el tp si tiene que estar creado o se tiene que crear
async function crearAdmin(email, contraseña) {
  try {
    const hash = await bcrypt.hash(contraseña, 10);
    await Administrador.create({ email, contraseña: hash });
    console.log('Administrador creado correctamente.');
    await sequelize.close(); 
  } catch (error) {
    console.error('Error al crear administrador:', error);
  }
}


crearAdmin('lucasponteponte204@gmail.com', 'lucas1234');