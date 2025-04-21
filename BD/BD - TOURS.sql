-- Crear la base de datos
CREATE DATABASE IF NOT EXISTS tours_santamarta;
USE tours_santamarta;

-- Tabla principal de tours
CREATE TABLE IF NOT EXISTS tours (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titulo VARCHAR(100) NOT NULL,
  ubicacion VARCHAR(100) NOT NULL,
  imagen VARCHAR(255) NOT NULL,
  descripcion TEXT NOT NULL,
  descripcion_completa TEXT NOT NULL,
  precio INT NOT NULL,
  creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insertar algunos tours con las rutas actualizadas a /assets/
INSERT INTO tours (titulo, ubicacion, imagen, descripcion, descripcion_completa, precio) VALUES
("Tour a la Ciudad Perdida", "Sierra Nevada de Santa Marta", "/assets/ciudadperdida.png", "Descubre las antiguas ruinas en la Sierra Nevada.", "Un recorrido inolvidable a una de las maravillas arqueológicas de Colombia.", 450000),
("Tour en Barco a Playa Cristal", "Playa Cristal, Santa Marta", "/assets/playacristal.png", "Disfruta de aguas cristalinas en un paraíso tropical.", "Playa Cristal es el destino ideal para relajarte y disfrutar del mar.", 120000),
("Excursión al Parque Tayrona", "Parque Nacional Natural Tayrona", "/assets/parquetayrona.png", "Explora la biodiversidad del parque Tayrona.", "Una excursión perfecta para los amantes de la naturaleza y la aventura.", 100000),
("Parador Turístico de Pueblo Viejo", "Pueblo Viejo, Magdalena", "/assets/pueblo_viejo.png", "Disfruta de la gastronomía local y vistas al mar Caribe.", "Un lugar ideal para relajarse y degustar platos típicos con una vista inigualable.", 80000),
("Nueva Venecia", "Ciénaga Grande de Santa Marta", "/assets/nueva_venecia.png", "Explora el pueblo palafítico y su cultura única.", "Una experiencia inolvidable navegando por la Ciénaga y conociendo la vida sobre el agua.", 150000),
("Mompox", "Mompox, Magdalena", "/assets/mompox.png", "Descubre la ciudad colonial y su patrimonio cultural.", "Recorre las calles empedradas y admira la arquitectura que cuenta la historia de Colombia.", 200000),
("Magangué", "Magangué, Magdalena", "/assets/magangue.png", "Vive experiencias fluviales en la 'Ciudad de los Ríos'.", "Navega por los ríos y disfruta de la biodiversidad que ofrece esta región.", 120000),
("Ciénaga", "Ciénaga, Magdalena", "/assets/cienaga.png", "Conoce la ciudad histórica y sus playas tranquilas.", "Un destino perfecto para quienes buscan historia y descanso junto al mar.", 90000);

-- Vista para el frontend
CREATE OR REPLACE VIEW vista_tours_resumen AS
SELECT id, titulo, ubicacion, imagen, descripcion, precio FROM tours;

-- Tabla de auditoría para eliminaciones
CREATE TABLE IF NOT EXISTS auditoria_tours (
  id_auditoria INT AUTO_INCREMENT PRIMARY KEY,
  id_tour INT,
  accion VARCHAR(10),
  fecha_accion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Trigger para guardar eliminaciones
DELIMITER //
CREATE TRIGGER despues_eliminar_tour
AFTER DELETE ON tours
FOR EACH ROW
BEGIN
  INSERT INTO auditoria_tours (id_tour, accion) VALUES (OLD.id, 'ELIMINAR');
END;
//
DELIMITER ;

-- Procedimiento para insertar un tour
DELIMITER //
CREATE PROCEDURE insertar_tour(
  IN p_titulo VARCHAR(100),
  IN p_ubicacion VARCHAR(100),
  IN p_imagen VARCHAR(255),
  IN p_descripcion TEXT,
  IN p_descripcion_completa TEXT,
  IN p_precio INT
)
BEGIN
  INSERT INTO tours (titulo, ubicacion, imagen, descripcion, descripcion_completa, precio)
  VALUES (p_titulo, p_ubicacion, p_imagen, p_descripcion, p_descripcion_completa, p_precio);
END;
//
DELIMITER ;

-- Procedimiento para eliminar un tour
DELIMITER //
CREATE PROCEDURE eliminar_tour(IN p_id INT)
BEGIN
  DELETE FROM tours WHERE id = p_id;
END;
//
DELIMITER ;

-- Procedimiento para obtener todos los tours
DELIMITER //
CREATE PROCEDURE obtener_todos_los_tours()
BEGIN
  SELECT * FROM tours ORDER BY creado_en DESC;
END;
//
DELIMITER ;


-- Procedimiento para buscar un tour por id
DELIMITER //
CREATE PROCEDURE buscar_tour_por_id(IN p_id INT)
BEGIN
  SELECT * FROM tours WHERE id = p_id;
END;
//
DELIMITER ;




