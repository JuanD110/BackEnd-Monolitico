const express = require ('express')
const { getConnection} = require ('./database/db-mongo-connection') 
const cors = require('cors');
require('dotenv').config();

const app = express()
const port = process.env.PORT;

// Implementamos cors
app.use(cors());

getConnection();

// Parseo JSON
app.use(express.json());
app.use('/cliente', require('./routers/cliente'));
app.use('/etapa', require('./routers/etapa'));
app.use('/tipoProyecto', require('./routers/tipoProyecto'));
app.use('/universidad', require('./routers/universidad'));

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
})