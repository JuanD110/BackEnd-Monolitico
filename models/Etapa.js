const mongoose = require('mongoose');

const etapaSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    fecha_creacion: { type: Date, default: Date.now },
    fecha_actualizacion: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Etapa', etapaSchema);