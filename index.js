const express = require('express');
require('dotenv').config();
const cors = require('cors');

const { dbConnection } = require('./database/config');

// console.log(process.env);
//Server Express
const app = express();

//Data Base Connection
dbConnection();

//Cors
app.use(cors())

// direc publico
app.use( express.static('public'));

//Lectura y parseo dl body
app.use( express.json());

//rutas users
app.use('/api/users', require('./routes/auth'));

//rutas pets
app.use('/api/pets', require('./routes/pets'));

//rutas types
app.use('/api/types', require('./routes/petsType'));

//rutas rol
app.use('/api/rol', require('./routes/role'));


app.listen( process.env.PORT, ()=> {
  console.log(`Servidor corriendo en puerto ${ process.env.PORT }`);
})