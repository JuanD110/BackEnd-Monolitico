const { Router } = require('express');
const Etapa = require('../models/Etapa');
const { validationResult, check } = require('express-validator');

const router = Router();

// Listar etapas

router.get('/', async (req, res) => {
    try {
        const etapas = await Etapa.find();
        res.send(etapas);
    } catch (error) {
        console.error(error);
        res.status(500).send('Ocurrió un error');
    }
});

// Crear etapa

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty()
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errores: errors.array() });
        }

        let etapa = new Etapa(req.body);
        etapa.fecha_creacion = new Date();
        etapa.fecha_actualizacion = new Date();

        etapa = await etapa.save();
        res.send(etapa);
    } catch (error) {
        console.error('Error al guardar la etapa:', error);
        res.status(500).send('Ocurrió un error al intentar guardar la etapa');
    }
});

// Actualizar etapa

router.put('/:id', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty()
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errores: errors.array() });
        }

        const etapa = await Etapa.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!etapa) {
            return res.status(404).send('Etapa no encontrada');
        }

        etapa.fecha_actualizacion = new Date();
        await etapa.save();
        res.send(etapa);
    } catch (error) {
        console.error('Error al actualizar la etapa:', error);
        res.status(500).send('Ocurrió un error al intentar actualizar la etapa');
    }
});




module.exports = router;
