const express = require('express');
const AccesoSalidas = require('../models/accesoSalidas');
const router = express.Router();

// GET todos los accesos/salidas
router.get('/', async (req, res) => {
  try {
    const accesos = await AccesoSalidas.getAll();
    res.json(accesos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET acceso/salida por id
router.get('/:id', async (req, res) => {
  try {
    const acceso = await AccesoSalidas.getById(req.params.id);
    if (acceso) res.json(acceso);
    else res.status(404).json({ error: 'Acceso/Salida no encontrado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST crear acceso/salida
router.post('/', async (req, res) => {
  try {
    const id = await AccesoSalidas.create(req.body);
    res.status(201).json({ id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT actualizar acceso/salida
router.put('/:id', async (req, res) => {
  try {
    await AccesoSalidas.update(req.params.id, req.body);
    res.json({ message: 'Acceso/Salida actualizado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE eliminar acceso/salida
router.delete('/:id', async (req, res) => {
  try {
    await AccesoSalidas.delete(req.params.id);
    res.json({ message: 'Acceso/Salida eliminado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
