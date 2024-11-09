const { Router } = require('express');
const TipoProyecto = require('../models/TipoProyecto');
const { validationResult, check } = require('express-validator');

const router = Router();

// Listar tipo proyecto

router.get('/', async (req, res) => {
    try {
        const tiposProyecto = await TipoProyecto.find();
        res.send(tiposProyecto);
    } catch (error) {
        console.error(error);
        res.status(500).send('Ocurrió un error');
    }
});


// Crear tipo proyecto

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty()
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errores: errors.array() });
        }

        let tipoProyecto = new TipoProyecto(req.body);
        tipoProyecto.fecha_creacion = new Date();
        tipoProyecto.fecha_actualizacion = new Date();

        tipoProyecto = await tipoProyecto.save();
        res.send(tipoProyecto);
    } catch (error) {
        console.error('Error al guardar el tipo de proyecto:', error);
        res.status(500).send('Ocurrió un error al intentar guardar el tipo de proyecto');
    }
});


// Actualizar tipo proyecto

router.put('/:id', async (req, res) => {
    try {
        const tipoProyecto = await TipoProyecto.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!tipoProyecto) {
            return res.status(404).send('Tipo de proyecto no encontrado');
        }

        tipoProyecto.fecha_actualizacion = new Date();
        await tipoProyecto.save();
        res.send(tipoProyecto);
    } catch (error) {
        console.error('Error al actualizar el tipo de proyecto:', error);
        res.status(500).send('Ocurrió un error al intentar actualizar el tipo de proyecto');
    }
});


module.exports = router;
