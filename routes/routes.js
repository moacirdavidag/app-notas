const { Router } = require('express');
const NotasController = require('../controllers/NotasController');

const router = Router();

// Aplicação

router.get('/', (req, res) => {
    res.status(200).sendFile('index.html');
});

// API

router.get('/api/notas', NotasController.listarNotas);

router.post('/api/nota', NotasController.criarNota);

router.delete('/api/nota/:id', NotasController.deletarNota);

router.put('/api/nota/:id', NotasController.atualizarNota);

module.exports = router;