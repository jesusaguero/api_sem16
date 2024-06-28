    const express = require('express');
    const router = express.Router();
    const db = require('./database');

    router.post('/cursos', (req, res) => {
    const { nombre_curso, docente, creditos, duracion } = req.body;
    const sql = 'INSERT INTO cursos (nombre_curso, docente, creditos, duracion) VALUES (?, ?, ?, ?)';
    db.query(sql, [nombre_curso, docente, creditos, duracion], (err, result) => {
        if (err) throw err;
        res.send({ id: result.insertId, nombre_curso, docente, creditos, duracion });
    });
    });

    router.get('/cursos/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM cursos WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) throw err;
        res.send(result);
    });
    });

    router.put('/cursos/:id', (req, res) => {
    const { id } = req.params;
    const { nombre_curso, docente, creditos, duracion } = req.body;
    const sql = 'UPDATE cursos SET nombre_curso = ?, docente = ?, creditos = ?, duracion = ? WHERE id = ?';
    db.query(sql, [nombre_curso, docente, creditos, duracion, id], (err, result) => {
        if (err) throw err;
        res.send({ id, nombre_curso, docente, creditos, duracion });
    });
    });

    router.delete('/cursos/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM cursos WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) throw err;
        res.send({ message: 'Curso eliminado', id });
    });
    });

    module.exports = router;