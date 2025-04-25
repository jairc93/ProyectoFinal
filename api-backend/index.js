const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;
const toursRoutes = require('./routes/tours');
const destinosPopularesRoutes = require('./routes/destinospopulares');
const actividadesRoutes = require('./routes/actividades'); // Importa las rutas de actividades
const galeriaRoutes = require('./routes/galeria'); // Importa las rutas de la galería

app.use(cors());
app.use(express.json());

app.use('/api/tours', toursRoutes);
app.use('/api/destinospopulares', destinosPopularesRoutes);
app.use('/api/actividades', actividadesRoutes); // Monta las rutas de actividades
app.use('/api/galeria', galeriaRoutes); // Monta las rutas de la galería

app.get('/', (req, res) => {
    res.send('API funcionando correctamente');
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});