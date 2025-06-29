const express = require('express');
const PicoPlaca = require('../models/picoPlaca');
const router = express.Router();

// GET todos los pico y placa
router.get('/', async (req, res) => {
  try {
    const picos = await PicoPlaca.getAll();
    res.json(picos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET pico y placa por id
router.get('/:id', async (req, res) => {
  try {
    const pico = await PicoPlaca.getById(req.params.id);
    if (pico) res.json(pico);
    else res.status(404).json({ error: 'Pico y placa no encontrado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST crear pico y placa
router.post('/', async (req, res) => {
  try {
    const id = await PicoPlaca.create(req.body);
    res.status(201).json({ id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT actualizar pico y placa
router.put('/:id', async (req, res) => {
  try {
    await PicoPlaca.update(req.params.id, req.body);
    res.json({ message: 'Pico y placa actualizado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE eliminar pico y placa
router.delete('/:id', async (req, res) => {
  try {
    await PicoPlaca.delete(req.params.id);
    res.json({ message: 'Pico y placa eliminado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
