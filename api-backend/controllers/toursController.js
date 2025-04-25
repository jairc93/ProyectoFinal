const db = require('../db').promise();

const toursController = {
    getAllTours: async (req, res) => {
        try {
            const [results] = await db.query('SELECT * FROM tours');
            res.json(results);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Error al obtener los tours: ' + err.message });
        }
    },

    getTourById: async (req, res) => {
        const { id } = req.params;
        try {
            const [results] = await db.query('SELECT * FROM tours WHERE id = ?', [id]);
            if (results.length === 0) {
                return res.status(404).json({ error: 'Tour no encontrado' });
            }
            res.json(results[0]);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Error al obtener el tour: ' + err.message });
        }
    },

    createTour: async (req, res) => {
        const { titulo, ubicacion, imagen, descripcion, descripcion_completa, precio } = req.body;
        try {
            const [result] = await db.query(
                'INSERT INTO tours (titulo, ubicacion, imagen, descripcion, descripcion_completa, precio) VALUES (?, ?, ?, ?, ?, ?)',
                [titulo, ubicacion, imagen, descripcion, descripcion_completa, precio]
            );
            res.status(201).json({ id: result.insertId, ...req.body });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Error al crear el tour: ' + err.message });
        }
    },

    deleteTour: async (req, res) => {
        const { id } = req.params;
        try {
            const [results] = await db.query('DELETE FROM tours WHERE id = ?', [id]);
            if (results.affectedRows === 0) {
                return res.status(404).json({ error: 'Tour no encontrado' });
            }
            res.status(204).send();
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Error al eliminar el tour: ' + err.message });
        }
    },
};

module.exports = toursController;