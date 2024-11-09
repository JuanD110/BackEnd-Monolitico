const { Router } = require('express');
const Cliente = require('../models/Cliente');
const { validationResult, check } = require('express-validator');

const router = Router();

// Obtener todos los clientes
router.get('/', async (req, res) => {
    try {
        const clientes = await Cliente.find();
        res.send(clientes);
    } catch (error) {
        console.error(error);
        res.status(500).send('Ocurrió un error');
    }
});


// Crear cliente
router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        
        return res.status(400).json({ errores: errors.array() });
    }

    try {
        const cliente = new Cliente({
            nombre: req.body.nombre,
            email: req.body.email
        });

        const nuevoCliente = await cliente.save();
        res.status(201).json(nuevoCliente); 
    } catch (error) {
        console.error('Error al guardar el cliente:', error);
        res.status(500).send('Ocurrió un error al intentar guardar el cliente');
    }
});

module.exports = router;


// Actualizar un cliente
router.put('/:id', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio y debe ser válido').isEmail()
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errores: errors.array() });
        }

        let cliente = await Cliente.findById(req.params.id);
        if (!cliente) {
            return res.status(404).send('Cliente no encontrado');
        }

        cliente.nombre = req.body.nombre;
        cliente.email = req.body.email;
        cliente.fecha_actualizacion = new Date();

        await cliente.save();
        res.send(cliente);
    } catch (error) {
        console.error('Error al actualizar el cliente:', error);
        res.status(500).send('Ocurrió un error al intentar actualizar el cliente');
    }
});


module.exports = router;

