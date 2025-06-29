const express = require('express');
const Celda = require('../models/celda');
const router = express.Router();

// GET todas las celdas
router.get('/', async (req, res) => {
  try {
    const celdas = await Celda.getAll();
    res.json(celdas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET celda por id
router.get('/:id', async (req, res) => {
  try {
    const celda = await Celda.getById(req.params.id);
    if (celda) res.json(celda);
    else res.status(404).json({ error: 'Celda no encontrada' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST crear celda
router.post('/', async (req, res) => {
  try {
    const id = await Celda.create(req.body);
    res.status(201).json({ id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT actualizar celda
router.put('/:id', async (req, res) => {
  try {
    await Celda.update(req.params.id, req.body);
    res.json({ message: 'Celda actualizada' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE eliminar celda
router.delete('/:id', async (req, res) => {
  try {
    await Celda.delete(req.params.id);
    res.json({ message: 'Celda eliminada' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
