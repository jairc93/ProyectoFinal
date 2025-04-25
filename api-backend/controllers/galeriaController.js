const db = require('../db').promise();

const galeriaController = {
    getAllImagenes: async (req, res) => {
        try {
            const [results] = await db.query('CALL obtener_todas_las_imagenes_galeria()');
            res.json(results[0]);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Error al obtener las imágenes de la galería: ' + err.message });
        }
    },

    getImageById: async (req, res) => {
        const { id } = req.params;
        try {
            const [results] = await db.query('CALL obtener_imagen_galeria_por_id(?)', [id]);
            if (results[0].length === 0) {
                return res.status(404).json({ error: 'Imagen de la galería no encontrada' });
            }
            res.json(results[0][0]);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Error al obtener la imagen de la galería: ' + err.message });
        }
    }
};

module.exports = galeriaController;