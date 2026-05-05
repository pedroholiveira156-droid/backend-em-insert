const express = require('express');
const Leitura = require('../models/Leitura');

const router = express.Router();

router.get('/leituras', async (req, res) => {
  try {
    const leituras = await Leitura.findAll({ order: [['id', 'ASC']] });
    return res.status(200).json(leituras);
  } catch (error) {
    return res.status(500).json({
      mensagem: 'Erro ao buscar leituras no banco.',
      erro: error.message,
    });
  }
});

module.exports = router;
