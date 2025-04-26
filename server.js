const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const cors = require('cors'); // <- Para evitar errores de CORS

const app = express();
const port = 3000;

// --- Middlewares ---
app.use(cors()); // Permitir peticiones de otros orígenes
app.use(express.json()); // Procesar JSON
app.use(express.static('public')); // Servir archivos de 'public' si quieres (opcional)
app.use('/img', express.static('img')); // Servir imágenes desde /img

// --- Configuración de Multer para subir imágenes ---
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'img'); // Carpeta para guardar imágenes
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Nombre único para la imagen
  }
});
const upload = multer({ storage });

// --- Ruta para registrar un nuevo animal ---
app.post('/registrar', upload.single('foto'), (req, res) => {
  const { nombre, especie, edad, descripcion, tipo, habitat, color, fecha_nacimiento } = req.body;

  // Puede que habitat venga como string si es solo uno, aseguramos que sea array:
  const habitatArray = Array.isArray(habitat) ? habitat : [habitat];

  const fotoUrl = req.file ? `/img/${req.file.filename}` : null;

  const nuevoAnimal = {
    nombre,
    especie,
    edad: parseInt(edad), // Aseguramos que edad sea número
    descripcion,
    tipo,
    habitat: habitatArray,
    color,
    fecha_nacimiento,
    foto: fotoUrl
  };

  const animalesPath = path.join(__dirname, 'data', 'animales.json');

  fs.readFile(animalesPath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error al leer el archivo JSON:', err);
      return res.status(500).json({ mensaje: 'Error leyendo los animales.' });
    }

    let animales = [];
    try {
      animales = JSON.parse(data);
    } catch (parseError) {
      console.error('Error al parsear JSON:', parseError);
    }

    animales.push(nuevoAnimal);

    fs.writeFile(animalesPath, JSON.stringify(animales, null, 2), (err) => {
      if (err) {
        console.error('Error al escribir en el archivo JSON:', err);
        return res.status(500).json({ mensaje: 'Error guardando el animal.' });
      }

      res.status(200).json({ mensaje: 'Animal registrado con éxito.' });
    });
  });
});

// --- Ruta para obtener todos los animales ---
app.get('/animales', (req, res) => {
  const animalesPath = path.join(__dirname, 'data', 'animales.json');

  fs.readFile(animalesPath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error al leer el archivo de animales:', err);
      return res.status(500).json({ mensaje: 'Error leyendo los animales.' });
    }

    try {
      const animales = JSON.parse(data);
      res.json(animales);
    } catch (parseError) {
      console.error('Error al parsear JSON:', parseError);
      res.status(500).json({ mensaje: 'Error al parsear animales.' });
    }
  });
});

// --- Iniciar el servidor ---
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
