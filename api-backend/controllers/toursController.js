// toursController.js

const db = require('../db'); // Asegúrate de que la conexión a la base de datos esté bien configurada

// Obtener todos los tours
const getAllTours = (req, res) => {
  db.query('SELECT * FROM tours', (err, results) => {
    if (err) {
      return res.status(500).send({ error: 'Error al obtener los tours' });
    }
    res.json(results);
  });
};

// Obtener un tour por ID
const getTourById = (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM tours WHERE id = ?', [id], (err, result) => {
    if (err) {
      return res.status(500).send({ error: 'Error al obtener el tour' });
    }
    if (!result.length) {
      return res.status(404).send({ error: 'Tour no encontrado' });
    }
    res.json(result[0]);
  });
};

module.exports = { getAllTours, getTourById };
