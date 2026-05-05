 require('dotenv').config();

const express = require('express');
const cors = require('cors');

const ensureDatabaseExists = require('./loaders/ensureDatabase');
const sequelize = require('./config/database');
const seedLeiturasIfEmpty = require('./loaders/seedLeituras');
const leiturasRoutes = require('./routes/leiturasRoutes');

const app = express();
const PORT = Number(process.env.PORT || 3000);

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({
    mensagem: 'API Estação meteorológica',
    descricao: 'Rota /api/leituras lê dados do PostgreSQL.',
  });
});

app.use('/api', leiturasRoutes);

async function startServer() {
  try {
    await ensureDatabaseExists();
    await sequelize.authenticate();
    console.log('Conexão com PostgreSQL realizada com sucesso.');

    await sequelize.sync();
    console.log('Tabela sincronizada com sucesso.');

    await seedLeiturasIfEmpty();

    app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Erro ao iniciar a aplicação:', error.message);
  }
}

startServer();
