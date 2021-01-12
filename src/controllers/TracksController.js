const ValidationContract = require('../validators/FluentValidator');
const Tracks = require('../models/Tracks');

module.exports = {
    async index(_, res){
        try{
            const tracks = await Tracks.findAll();
            res.status(200).send(tracks);
        }catch(e){
            res.status(400).send({
                message: 'Falha ao processar sua requisição'
            });
            console.error(e);
        }
    },

    async store(req, res){
        try{
            const { name, created_by, updated_by } = req.body;
            const contract = new ValidationContract();
            
            contract.isRequired(name, 'É necessário informar o nome da pista');
            contract.isRequired(created_by, 'É necessário informar o criador dessa punição');
            contract.isRequired(updated_by, 'É necessário informar o usuário que atualizou essa punição');

            if(!contract.isValid()){
                res.status(400).send(contract.errors()).end();
                return;
            }

            const track = await Tracks.create({name, created_by, updated_by});

            res.status(201).send({
                message: 'Pista criada com sucesso',
                data: track
            });
        }catch(e){
            res.status(400).send({
                message: 'Falha ao processar sua requisição'
            });
            console.error(e);
        }
    },

    async update(req, res){
        try{
            const { name, updated_by } = req.body;
            const { id } = req.params
            const contract = new ValidationContract();
            
            contract.isRequired(name, 'É necessário informar o nome da pista');
            contract.isRequired(updated_by, 'É necessário informar o usuário que atualizou essa punição');

            if(!contract.isValid()){
                res.status(400).send(contract.errors()).end();
                return;
            }

            await Tracks.update({name, updated_by}, {where: {id}});
            const track = await Tracks.findByPk(id);

            res.status(200).send({
                message: 'Pista atualizada com sucesso',
                data: track
            });
        }catch(e){
            res.status(400).send({
                message: 'Falha ao processar sua requisição'
            });
            console.error(e);
        }
    }
}