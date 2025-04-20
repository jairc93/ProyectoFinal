const mysql = require('mysql2');

// Crear la conexión
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',  // Ajusta la contraseña según tu configuración
  database: 'tours_santamarta',
});

// Conectar a la base de datos
db.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
    process.exit(1); // Terminar el proceso si hay un error en la conexión
  }
  console.log('✅ Conexión a la base de datos establecida.');
});

module.exports = db;
