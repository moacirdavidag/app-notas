const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize('app-notas', process.env.DATABASE_USERNAME, process.env.DATABASE_PASSWORD, {
    host: process.env.DATABASE_HOST,
    dialect: 'postgres',
    logging: false
});

function main() {
    try {
        sequelize.authenticate().then(() => {
            console.log('Banco de Dados conectado com sucesso!');
        })
    } catch(e) {
        console.log(`Falha ao conectar ao Banco de Dados: ${e.message}`);
    }
}

main();

module.exports = sequelize;