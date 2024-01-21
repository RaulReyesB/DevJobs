const mongoose = require('mongoose');
require('dotenv').config({ path: 'variables.env' });

mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('error', (error) => {
  console.error('Error en la conexión a la base de datos:', error);
});

mongoose.connection.once('open', () => {
  console.log('Conexión exitosa a la base de datos');
});

// Importación de los modelos
require('../models/Vacantes.js');
require('../models/Usuarios.js');