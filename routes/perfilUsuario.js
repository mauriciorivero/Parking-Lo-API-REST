const express = require('express');
const PerfilUsuario = require('../models/perfilUsuario');
const router = express.Router();

// GET todos los perfiles
router.get('/', async (req, res) => {
  try {
    const perfiles = await PerfilUsuario.getAll();
    res.json(perfiles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET perfil por id
router.get('/:id', async (req, res) => {
  try {
    const perfil = await PerfilUsuario.getById(req.params.id);
    if (perfil) res.json(perfil);
    else res.status(404).json({ error: 'Perfil no encontrado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST crear perfil
router.post('/', async (req, res) => {
  try {
    const id = await PerfilUsuario.create(req.body.perfil);
    res.status(201).json({ id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT actualizar perfil
router.put('/:id', async (req, res) => {
  try {
    await PerfilUsuario.update(req.params.id, req.body.perfil);
    res.json({ message: 'Perfil actualizado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE eliminar perfil
router.delete('/:id', async (req, res) => {
  try {
    await PerfilUsuario.delete(req.params.id);
    res.json({ message: 'Perfil eliminado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
