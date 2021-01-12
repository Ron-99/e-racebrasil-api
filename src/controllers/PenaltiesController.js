const ValidationContract = require('../validators/FluentValidator');
const Penalties = require('../models/Penalties');

module.exports = {
    
    async index(_, res){
        try{
            const penalties = await Penalties.findAll();
            res.status(200).send(penalties);
        }catch(e){
            console.error(e);
            res.status(400).send({
                message: 'Falha ao processar sua requisição'
            });
        }
    },

    async store(req, res){
        try{
            const { level, description, color, created_by, updated_by } = req.body;
            const contract = new ValidationContract();

            contract.isRequired(level, 'O nível da punição deve ser informado');
            contract.isRequired(description, 'A descrição da punição deve ser informado');
            contract.isRequired(color, 'A cor da punição deve ser informada');
            contract.isRequired(created_by, 'É necessário informar o criador dessa punição');
            contract.isRequired(updated_by, 'É necessário informar o usuário que atualizou essa punição');
            contract.isInteger(level, 'O nível da punição deve ser um número inteiro');

            if(!contract.isValid()){
                res.status(400).send(contract.errors()).end();
                return;
            }

            const penalty = await Penalties.create({level, description, color, created_by, updated_by});

            res.status(201).send({
                message: 'Penalidade criada com sucesso',
                data: penalty
            });
        }catch(e){
            console.error(e);
            res.status(400).send({
                message: 'Falha ao processar a sua requisição'
            });
        }
    },

    async update(req, res){
        try{
            const { level, description, color, updated_by } = req.body;
            const { id } = req.params;
            const contract = new ValidationContract();

            contract.isRequired(level, 'O nível da punição deve ser informado');
            contract.isRequired(description, 'A descrição da punição deve ser informado');
            contract.isRequired(color, 'A cor da punição deve ser informada');
            contract.isRequired(updated_by, 'É necessário informar o usuário que atualizou essa punição');
            contract.isInteger(level, 'O nível da punição deve ser um número inteiro');

            if(!contract.isValid()){
                res.status(400).send(contract.errors()).end();
                return;
            }

            await Penalties.update({level, description, color, updated_by}, {where: {id}});
            const penalty = await Penalties.findByPk(id);

            res.status(200).send({
                message: 'Penalidade atualizada com sucesso',
                data: penalty
            });
        }catch(e){
            res.status(400).send({
                message: 'Falha ao processar sua requisição'
            });
            console.error(e);
        }
    }
}