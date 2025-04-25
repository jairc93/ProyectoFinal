const db = require('../db').promise();

const actividadesController = {
    getAllActividades: async (req, res) => {
        try {
            const [results] = await db.query('CALL obtener_todas_las_actividades()');
            res.json(results[0]);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Error al obtener las actividades: ' + err.message });
        }
    },

    getActividadById: async (req, res) => {
        const { id } = req.params;
        try {
            const [results] = await db.query('CALL obtener_actividad_por_id(?)', [id]);
            if (results[0].length === 0) {
                return res.status(404).json({ error: 'Actividad no encontrada' });
            }
            res.json(results[0][0]);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Error al obtener la actividad: ' + err.message });
        }
    },

    createActividad: async (req, res) => {
        const { nombre, imagen, descripcion, precio } = req.body;
        try {
            await db.query('CALL insertar_actividad(?, ?, ?, ?)',
                [nombre, imagen, descripcion, precio]
            );
            res.status(201).json({ message: 'Actividad creada exitosamente', ...req.body });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Error al crear la actividad: ' + err.message });
        }
    },

    deleteActividad: async (req, res) => {
        const { id } = req.params;
        try {
            const [results] = await db.query('CALL eliminar_actividad(?)', [id]);
            if (results.affectedRows === 0) {
                const [check] = await db.query('SELECT * FROM actividades WHERE id = ?', [id]);
                if (check[0].length === 0) {
                    return res.status(404).json({ error: 'Actividad no encontrada' });
                }
            }
            res.status(204).send();
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Error al eliminar la actividad: ' + err.message });
        }
    }
};

module.exports = actividadesController;