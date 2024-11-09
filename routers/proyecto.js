const { Router } = require('express');
const Proyecto = require('../models/Proyecto');
const { validationResult, check } = require('express-validator');

const router = Router();

// Listar proyectos

router.get('/', async (req, res) => {
    try {
        const proyectos = await Proyecto.find().populate('cliente tipo_proyecto universidad etapa');
        res.send(proyectos);
    } catch (error) {
        console.error(error);
        res.status(500).send('Ocurrió un error');
    }
});

// Crear proyecto

router.post('/', [
    check('numero', 'El número es obligatorio').not().isEmpty(),
    check('titulo', 'El título es obligatorio').not().isEmpty(),
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errores: errors.array() });
        }

        let proyecto = new Proyecto(req.body);
        proyecto.fecha_creacion = new Date();
        proyecto.fecha_actualizacion = new Date();

        proyecto = await proyecto.save();
        res.send(proyecto);
    } catch (error) {
        console.error('Error al guardar el proyecto:', error);
        res.status(500).send('Ocurrió un error al intentar guardar el proyecto');
    }
});

// Actaulizar proyecto

router.put('/:id', async (req, res) => {
    try {
        const proyecto = await Proyecto.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!proyecto) {
            return res.status(404).send('Proyecto no encontrado');
        }

        proyecto.fecha_actualizacion = new Date();
        await proyecto.save();
        res.send(proyecto);
    } catch (error) {
        console.error('Error al actualizar el proyecto:', error);
        res.status(500).send('Ocurrió un error al intentar actualizar el proyecto');
    }
});

module.exports = router;
