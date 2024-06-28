const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

// Configuración de la conexión a la base de datos
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'data_table'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Conectado a la base de datos MySQL');
});

// Crear un nuevo curso
router.post('/cursos', (req, res) => {
  const { nombre_curso, docente, creditos, duracion } = req.body;
  const sql = 'INSERT INTO cursos (nombre_curso, docente, creditos, duracion) VALUES (?, ?, ?, ?)';
  db.query(sql, [nombre_curso, docente, creditos, duracion], (err, result) => {
    if (err) throw err;
    res.send({ id: result.insertId, nombre_curso, docente, creditos, duracion });
  });
});

// Obtener todos los cursos
router.get('/cursos', (req, res) => {
  const sql = 'SELECT * FROM cursos';
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

// Obtener un curso por id
router.get('/cursos/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM cursos WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// Actualizar un curso
router.put('/cursos/:id', (req, res) => {
  const { id } = req.params;
  const { nombre_curso, docente, creditos, duracion } = req.body;
  const sql = 'UPDATE cursos SET nombre_curso = ?, docente = ?, creditos = ?, duracion = ? WHERE id = ?';
  db.query(sql, [nombre_curso, docente, creditos, duracion, id], (err, result) => {
    if (err) throw err;
    res.send({ id, nombre_curso, docente, creditos, duracion });
  });
});

// Eliminar un curso
router.delete('/cursos/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM cursos WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) throw err;
    res.send({ message: 'Curso eliminado', id });
  });
});

module.exports = router;