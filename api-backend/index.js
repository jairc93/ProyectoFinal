const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;
const toursRoutes = require('./routes/tours'); // Importa las rutas de tours

app.use(cors());
app.use(express.json());

// Usar las rutas de tours bajo /api/tours
app.use('/api/tours', toursRoutes);

// Ruta básica de prueba
app.get('/', (req, res) => {
  res.send('API funcionando correctamente');
});

// Inicia el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
