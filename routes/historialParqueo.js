const express = require('express');
const HistorialParqueo = require('../models/historialParqueo');
const router = express.Router();

// GET todos los historiales
router.get('/', async (req, res) => {
  try {
    const historiales = await HistorialParqueo.getAll();
    res.json(historiales);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET historial por ids
router.get('/:celda_id/:vehiculo_id', async (req, res) => {
  try {
    const historial = await HistorialParqueo.getById(req.params.celda_id, req.params.vehiculo_id);
    if (historial) res.json(historial);
    else res.status(404).json({ error: 'Historial no encontrado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST crear historial
router.post('/', async (req, res) => {
  try {
    const id = await HistorialParqueo.create(req.body);
    res.status(201).json({ id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT actualizar historial
router.put('/:celda_id/:vehiculo_id', async (req, res) => {
  try {
    await HistorialParqueo.update(req.params.celda_id, req.params.vehiculo_id, req.body);
    res.json({ message: 'Historial actualizado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE eliminar historial
router.delete('/:celda_id/:vehiculo_id', async (req, res) => {
  try {
    await HistorialParqueo.delete(req.params.celda_id, req.params.vehiculo_id);
    res.json({ message: 'Historial eliminado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
