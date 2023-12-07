const mongoose = require('mongoose')

const MONGO_DB_URI = process.env.MONGO_DB_URI

const conectMongoDB = async () => {
    try {
    console.log('Conectando...');
        await mongoose.connect(MONGO_DB_URI);
    console.log('Conectado');
    } catch (error) {
        console.log('Error: ', error);
    }

}

module.exports = conectMongoDB;