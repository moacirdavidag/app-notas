const sequelize = require('../database/postgres');
const { DataTypes, Sequelize } = require('sequelize');

const Nota = sequelize.define("Nota", {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
    },
    titulo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descricao: {
        type: DataTypes.STRING,
        allowNull: false
    },
    corDeFundo: {
        type: DataTypes.STRING(7),
        defaultValue: '#FFFFFF',
        allowNull: false
    }
});

Nota.sync();

module.exports = Nota;