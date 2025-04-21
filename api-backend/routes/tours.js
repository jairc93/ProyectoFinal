const express = require('express');
const router = express.Router();
const db = require('../db'); // Asegúrate de que la conexión a la base de datos esté bien configurada

// Rutas para tours

// Obtener todos los tours
router.get('/', (req, res) => {
  db.query('SELECT * FROM tours', (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// Obtener un tour por ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM tours WHERE id = ?', [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'Tour no encontrado' });
    }
    res.json(results[0]);
  });
});

// Crear un nuevo tour
router.post('/', (req, res) => {
  const { titulo, ubicacion, imagen, descripcion, descripcion_completa, precio } = req.body;
  db.query(
    'INSERT INTO tours (titulo, ubicacion, imagen, descripcion, descripcion_completa, precio) VALUES (?, ?, ?, ?, ?, ?)',
    [titulo, ubicacion, imagen, descripcion, descripcion_completa, precio],
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ id: results.insertId, ...req.body });
    }
  );
});

// Eliminar un tour
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM tours WHERE id = ?', [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Tour no encontrado' });
    }
    res.status(204).send();
  });
});

// Rutas para banners

// Obtener todos los banners
router.get('/banners', (req, res) => {
  db.query('SELECT * FROM banners', (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener los banners' });
    }
    res.json(results);
  });
});

// Obtener un banner por ID
router.get('/banners/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM banners WHERE id = ?', [id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener el banner' });
    }
    if (result.length === 0) {
      return res.status(404).json({ error: 'Banner no encontrado' });
    }
    res.json(result[0]);
  });
});

// Crear un nuevo banner
router.post('/banners', (req, res) => {
  const { titulo, imagen, descripcion } = req.body;
  db.query(
    'INSERT INTO banners (titulo, imagen, descripcion) VALUES (?, ?, ?)',
    [titulo, imagen, descripcion],
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ id: results.insertId, titulo, imagen, descripcion });
    }
  );
});

// Eliminar un banner
router.delete('/banners/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM banners WHERE id = ?', [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Banner no encontrado' });
    }
    res.status(204).send();
  });
});

module.exports = router;
