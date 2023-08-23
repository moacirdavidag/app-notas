const Nota = require('../models/Nota');

module.exports = {

    listarNotas: async (req, res) => {

        try {

            const notas = await Nota.findAll();
            return res.status(200).send(notas);

        } catch (e) {
            return res.status(400).send(`Ocorreu um erro: ${e.message}`);
        }

    },

    criarNota: async (req, res) => {

        try {

            const { titulo, descricao, corDeFundo } = req.body;

            if (titulo === null || titulo.length === 0) {
                throw new Error('Escreva um título');
            }

            if (descricao === null || descricao.length === 0) {
                throw new Error('Escreva uma descrição');
            }

            if (corDeFundo === "null") {
                throw new Error('Escolha uma cor de fundo');
            }

            const nota = {
                titulo,
                descricao,
                corDeFundo
            };

            await Nota.create(nota);

            return res.status(201).send("Nota criada com sucesso!");

        } catch (e) {
            return res.status(400).send(`${e.message}`);
        }

    },

    deletarNota: async (req, res) => {

        try {

            const { id } = req.params;

            const nota = await Nota.findOne({
                where: {
                    id
                }
            });

            if (!nota) {
                throw new Error("Essa nota não existe!");
            }

            await Nota.destroy({
                where: {
                    id
                }
            });

            return res.status(200).send("Nota excluída com sucesso");

        } catch (e) {
            return res.status(400).send(`Ocorreu um erro: ${e.message}`);
        }

    },

    atualizarNota: async (req, res) => {

        try {

            const { id } = req.params;

            const { titulo, descricao, cor } = req.body;

            const nota = await Nota.findOne({
                where: {
                    id
                }
            });

            if (!nota) {
                throw new Error("Essa nota não existe!");
            };

            const novaNota = {
                titulo,
                descricao,
                cor
            };

            const notaAtualizada = await Nota.update(novaNota, {
                where: {
                    id
                }
            });

            return res.status(200).send(notaAtualizada);

        } catch (e) {
            return res.status(400).send(`Ocorreu um erro: ${e.message}`);
        }

    }

}