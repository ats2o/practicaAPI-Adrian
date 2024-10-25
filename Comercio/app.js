// Cargar las variables de entorno desde el archivo .env
require('dotenv').config();

// Importar el módulo express
const express = require('express');

// Crear una instancia de la aplicación express
const app = express();

// Middleware para parsear JSON en las solicitudes
app.use(express.json());

// Importa y usa las rutas definidas en el archivo 'routes.js' para cualquier solicitud que comience con '/api'
app.use('/api', require('./routes'))

// Importar el módulo mongoose para interactuar con MongoDB
const mongoose = require('mongoose');

// Imprimir el valor de la variable de entorno PORT en la consola
console.log(process.env.PORT);

// Función asíncrona para conectar a la base de datos MongoDB
async function connect() {
  try {
    // Intentar conectar a la base de datos usando la URI de la variable de entorno DB_URI
    const db = await mongoose.connect(process.env.DB_URI);
    console.log('Conexión exitosa');
  } catch (error) {
    // Capturar y mostrar cualquier error que ocurra durante la conexión
    console.error('Error al conectar:', error);
  }
}

// Definir el puerto en el que el servidor escuchará, usando la variable de entorno PORT o el puerto 1234 por defecto
const port = process.env.PORT || 1234;

// Iniciar el servidor y escuchar en el puerto definido
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    // Llamar a la función para conectar a la base de datos
    connect();
});