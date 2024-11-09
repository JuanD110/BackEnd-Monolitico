const { Router } = require('express');
const Universidad = require('../models/Universidad');
const { validationResult, check } = require('express-validator');

const router = Router();

// Listar universidades

router.get('/', async (req, res) => {
    try {
        const universidades = await Universidad.find();
        res.send(universidades);
    } catch (error) {
        console.error(error);
        res.status(500).send('Ocurrió un error');
    }
});

// Crear universidad

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('direccion', 'La dirección es obligatoria').not().isEmpty(),
    check('telefono', 'El teléfono es obligatorio').not().isEmpty()
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errores: errors.array() });
        }

        let universidad = new Universidad(req.body);
        universidad.fecha_creacion = new Date();
        universidad.fecha_actualizacion = new Date();

        universidad = await universidad.save();
        res.send(universidad);
    } catch (error) {
        console.error('Error al guardar la universidad:', error);
        res.status(500).send('Ocurrió un error al intentar guardar la universidad');
    }
});

// Actuzalizar universidad

router.put('/:id', async (req, res) => {
    try {
        const universidad = await Universidad.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!universidad) {
            return res.status(404).send('Universidad no encontrada');
        }

        universidad.fecha_actualizacion = new Date();
        await universidad.save();
        res.send(universidad);
    } catch (error) {
        console.error('Error al actualizar la universidad:', error);
        res.status(500).send('Ocurrió un error al intentar actualizar la universidad');
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const universidad = await Universidad.findByIdAndDelete(req.params.id);
        if (!universidad) {
            return res.status(404).send('Universidad no encontrada');
        }
        res.send('Universidad eliminada');
    } catch (error) {
        console.error('Error al eliminar la universidad:', error);
        res.status(500).send('Ocurrió un error al intentar eliminar la universidad');
    }
});

module.exports = router;
