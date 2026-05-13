require('dotenv').config();

if (!process.env.PORT) {
  throw new Error('El puerto no está definido. Crea un archivo .env con PORT=3000');
}

module.exports = { PORT: process.env.PORT };