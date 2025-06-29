const express = require('express');
const Vehiculo = require('../models/vehiculo');
const router = express.Router();

// GET todos los vehículos
router.get('/', async (req, res) => {
  try {
    const vehiculos = await Vehiculo.getAll();
    res.json(vehiculos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET vehículo por id
router.get('/:id', async (req, res) => {
  try {
    const vehiculo = await Vehiculo.getById(req.params.id);
    if (vehiculo) res.json(vehiculo);
    else res.status(404).json({ error: 'Vehículo no encontrado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST crear vehículo
router.post('/', async (req, res) => {
  try {
    const id = await Vehiculo.create(req.body);
    res.status(201).json({ id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT actualizar vehículo
router.put('/:id', async (req, res) => {
  try {
    await Vehiculo.update(req.params.id, req.body);
    res.json({ message: 'Vehículo actualizado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE eliminar vehículo
router.delete('/:id', async (req, res) => {
  try {
    await Vehiculo.delete(req.params.id);
    res.json({ message: 'Vehículo eliminado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
