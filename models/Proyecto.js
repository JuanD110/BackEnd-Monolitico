const mongoose = require('mongoose');

const proyectoSchema = new mongoose.Schema({
    numero: { type: String, required: true, unique: true },
    titulo: { type: String, required: true },
    fecha_iniciacion: { type: Date, required: true },
    fecha_entrega: { type: Date, required: true },
    valor: { type: Number, required: true },
    fecha_creacion: { type: Date, default: Date.now },
    fecha_actualizacion: { type: Date, default: Date.now },
    cliente: { type: mongoose.Schema.Types.ObjectId, ref: 'Cliente' },
    tipo_proyecto: { type: mongoose.Schema.Types.ObjectId, ref: 'TipoProyecto' },
    universidad: { type: mongoose.Schema.Types.ObjectId, ref: 'Universidad' },
    etapa: { type: mongoose.Schema.Types.ObjectId, ref: 'Etapa' }
});

module.exports = mongoose.model('Proyecto', proyectoSchema);