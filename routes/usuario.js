const express = require('express');
const Usuario = require('../models/usuario');
const router = express.Router();

// GET todos los usuarios
router.get('/', async (req, res) => {
  try {
    const usuarios = await Usuario.getAll();
    res.json(usuarios);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET usuario por id
router.get('/:id', async (req, res) => {
  try {
    const usuario = await Usuario.getById(req.params.id);
    if (usuario) res.json(usuario);
    else res.status(404).json({ error: 'Usuario no encontrado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST crear usuario
router.post('/', async (req, res) => {
  try {
    const id = await Usuario.create(req.body);
    res.status(201).json({ id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT actualizar usuario
router.put('/:id', async (req, res) => {
  try {
    await Usuario.update(req.params.id, req.body);
    res.json({ message: 'Usuario actualizado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE eliminar usuario
router.delete('/:id', async (req, res) => {
  try {
    await Usuario.delete(req.params.id);
    res.json({ message: 'Usuario eliminado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Buscar usuario por número de documento
router.get('/documento/:numero_documento', async (req, res) => {
  try {
    const usuario = await Usuario.getByNumeroDocumento(req.params.numero_documento);
    if (usuario) res.json(usuario);
    else res.status(404).json({ error: 'Usuario no encontrado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
