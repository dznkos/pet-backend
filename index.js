const express = require('express');
require('dotenv').config();

const { dbConnection } = require('./database/config');

// console.log(process.env);
//Server Express
const app = express();

//Data Base Connection
dbConnection();

// direc publico
app.use( express.static('public'));

//Lectura y parseo dl body
app.use( express.json());

//rutas authentication
app.use('/api/auth', require('./routes/auth'));

app.listen( process.env.PORT, ()=> {
  console.log(`Servidor corriendo en puerto ${ process.env.PORT }`);
})