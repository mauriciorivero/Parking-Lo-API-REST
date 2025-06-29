const express = require('express');
const ReporteIncidencia = require('../models/reporteIncidencia');
const router = express.Router();

// GET todos los reportes de incidencia
router.get('/', async (req, res) => {
  try {
    const reportes = await ReporteIncidencia.getAll();
    res.json(reportes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET reporte por ids
router.get('/:vehiculo_id/:incidencia_id', async (req, res) => {
  try {
    const reporte = await ReporteIncidencia.getById(req.params.vehiculo_id, req.params.incidencia_id);
    if (reporte) res.json(reporte);
    else res.status(404).json({ error: 'Reporte no encontrado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST crear reporte
router.post('/', async (req, res) => {
  try {
    const id = await ReporteIncidencia.create(req.body);
    res.status(201).json({ id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT actualizar reporte
router.put('/:vehiculo_id/:incidencia_id', async (req, res) => {
  try {
    await ReporteIncidencia.update(req.params.vehiculo_id, req.params.incidencia_id, req.body);
    res.json({ message: 'Reporte actualizado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE eliminar reporte
router.delete('/:vehiculo_id/:incidencia_id', async (req, res) => {
  try {
    await ReporteIncidencia.delete(req.params.vehiculo_id, req.params.incidencia_id);
    res.json({ message: 'Reporte eliminado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
