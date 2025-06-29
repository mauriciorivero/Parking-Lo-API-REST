// Archivo de ejemplo para rutas/endpoints
// Aquí se expondrán las funciones del modelo

const express = require('express');
const router = express.Router();

// Ejemplo de endpoint
router.get('/example', (req, res) => {
    res.json({ message: 'Endpoint de ejemplo funcionando' });
});

module.exports = router;
