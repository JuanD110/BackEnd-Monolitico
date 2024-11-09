const mongoose = require('mongoose');

const getConnection = async () => {
    try{

        await mongoose.connect(process.env.MONGO_URI);
        dbName: 'ProjectIUDigital'
        console.log ('Conexion exitosa');

}    catch(error){
    console.log(error);
   }
}

module.exports = {
    getConnection
}