const db = require('../db').promise();

const destinospopularesController = {
    getAllDestinosPopulares: async (req, res) => {
        try {
            const [results] = await db.query('CALL obtener_todos_los_destinos_populares()');
            res.json(results[0]);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Error al obtener los destinos populares: ' + err.message });
        }
    },

    getDestinoPopularById: async (req, res) => {
        const { id } = req.params;
        try {
            const [results] = await db.query('CALL buscar_destino_popular_por_id(?)', [id]);
            if (results[0].length === 0) {
                return res.status(404).json({ error: 'Destino popular no encontrado' });
            }
            res.json(results[0][0]);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Error al obtener el destino popular: ' + err.message });
        }
    },

    createDestinoPopular: async (req, res) => {
        const { titulo, ubicacion, imagen, descripcion, descripcion_completa, precio } = req.body;
        try {
            await db.query('CALL insertar_destino_popular(?, ?, ?, ?, ?, ?)',
                [titulo, ubicacion, imagen, descripcion, descripcion_completa, precio]
            );
            res.status(201).json({ message: 'Destino popular creado exitosamente', ...req.body });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Error al crear el destino popular: ' + err.message });
        }
    },

    deleteDestinoPopular: async (req, res) => {
        const { id } = req.params;
        try {
            const [results] = await db.query('CALL eliminar_destino_popular(?)', [id]);
            if (results.affectedRows === 0) {
                const [check] = await db.query('SELECT * FROM destinospopulares WHERE id = ?', [id]);
                if (check[0].length === 0) {
                    return res.status(404).json({ error: 'Destino popular no encontrado' });
                }
            }
            res.status(204).send();
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Error al eliminar el destino popular: ' + err.message });
        }
    }
};

module.exports = destinospopularesController;