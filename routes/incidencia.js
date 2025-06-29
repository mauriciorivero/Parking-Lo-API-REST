const express = require('express');
const Incidencia = require('../models/incidencia');
const router = express.Router();

// GET todas las incidencias
router.get('/', async (req, res) => {
  try {
    const incidencias = await Incidencia.getAll();
    res.json(incidencias);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET incidencia por id
router.get('/:id', async (req, res) => {
  try {
    const incidencia = await Incidencia.getById(req.params.id);
    if (incidencia) res.json(incidencia);
    else res.status(404).json({ error: 'Incidencia no encontrada' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST crear incidencia
router.post('/', async (req, res) => {
  try {
    const id = await Incidencia.create(req.body);
    res.status(201).json({ id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT actualizar incidencia
router.put('/:id', async (req, res) => {
  try {
    await Incidencia.update(req.params.id, req.body);
    res.json({ message: 'Incidencia actualizada' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE eliminar incidencia
router.delete('/:id', async (req, res) => {
  try {
    await Incidencia.delete(req.params.id);
    res.json({ message: 'Incidencia eliminada' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
