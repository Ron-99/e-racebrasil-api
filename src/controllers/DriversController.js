const ValidationContract = require('../validators/FluentValidator');
const Drivers = require('../models/Drivers');
const repository = require('../repositories/DriversRepository');

module.exports = {

    async index(_, res) {
        try {
            const drivers = await repository.findAll();
            res.status(200).send(drivers);
        } catch (e) {
            res.status(400).send({
                message: 'Falha ao processar sua requisição'
            });
            console.error(e);
        }
    },

    async findByName(req, res) {
        try {
            const { name } = req.query;
            const drivers = await repository.findByName(name);
            res.status(200).send(drivers);
        } catch (e) {
            res.status(400).send({
                message: 'Falha ao processar sua requisição'
            });
            console.error(e);
        }
    },

    async findBydId(req, res){
        try{
            const driver = await repository.findById();
            res.status(200).send(driver);
        }catch(e){
            res.status(400).send({
                message: 'Falha ao processar sua requisição'
            });
            console.error(e);
        }
    },

    async findWins(req, res){

    },

    async findRaces(req, res){

    },

    async store(req, res) {
        try {
            const { name, user_id, created_by, updated_by } = req.body;
            const contract = new ValidationContract();

            contract.isRequired(name, 'É necessário informar o nome do piloto');
            contract.isRequired(user_id, 'É necessário informar o usuário do piloto');
            contract.isRequired(created_by, 'É necessário informar o criador dessa punição');
            contract.isRequired(updated_by, 'É necessário informar o usuário que atualizou essa punição');

            if (!contract.isValid()) {
                res.status(400).send(contract.errors()).end();
                return;
            }

            const driver = await repository.create({name, user_id, created_by, updated_by});

            res.status(201).send({
                message: 'Piloto criado com sucesso',
                data: driver
            });
        } catch (e) {
            res.status(400).send({
                message: 'Falha ao processar sua requisição'
            });
            console.error(e);
        }
    },

    async update(req, res){
        try{
            const { name, user_id, updated_by } = req.body;
            const { id } = req.params;
            const contract = new ValidationContract();

            contract.isRequired(name, 'É necessário informar o nome do piloto');
            contract.isRequired(user_id, 'É necessário informar o usuário do piloto');
            contract.isRequired(updated_by, 'É necessário informar o usuário que atualizou essa punição');

            if (!contract.isValid()) {
                res.status(400).send(contract.errors()).end();
                return;
            }

            const driver = await repository.update(id, { name, user_id, updated_by });

            res.status(200).send({
                message: 'Piloto atualizado com sucesso',
                data: driver
            });
        }catch(e){
            res.status(400).send({
                message: 'Falha ao processar sua requisição'
            });
            console.error(e);
        }
    },

    async updatePenalty(req, res){
        try{
            const { penalty_id } = req.query;
            
        }catch(e){
            res.status(400).send({
                message: 'Falha ao processar sua requisição'
            });
            console.error(e);
        }
    }


}