const repository = require('../repositories/RanksRepository');
const ValidationContract = require('../validators/FluentValidator');

module.exports = {
    async index (_, res){
        try{
            const ranks = await repository.findAll();
            res.status(200).send(ranks);
        }catch(e){
            res.status(400).send({
                message: 'Falha ao processar sua requisição'
            });
            console.error(e);
        }
    },

    async findById (req, res){
        try{
            const { id } = req.params;
            const rank = await repository.findById(id);
            res.status(200).send(rank);
        }catch(e){
            res.status(400).send({
                message: 'Falha ao processar sua requisição'
            });
            console.error(e);
        }
    },

    async store (req, res){
        try{
            const { name, created_by, updated_by } = req.body;
            const contract = new ValidationContract();

            contract.isRequired(name, 'É necessário informar a liga');
            contract.isRequired(created_by, 'É necessário informar o usuário que está criando esse rank');
            contract.isRequired(updated_by, 'É necessário informar o usuário que está atualizando esse rank');

            if(!contract.isValid()){
                res.status(400).send(contract.errors()).end();
                return;
            }

            const rank = await repository.create({ name, created_by, updated_by });
            res.status(201).send({
                message: 'Liga criada com sucesso',
                data: rank
            });

        }catch(e){
            res.status(400).send({
                message: 'Falha ao processar sua requisição'
            });
            console.error(e);
        }
    },

    async update (req, res){
        try{
            const { id } = req.params;
            const { name, updated_by } = req.body;

            const contract = new ValidationContract();

            contract.isRequired(name, 'É necessário informar a liga');
            contract.isRequired(updated_by, 'É necessário informar o usuário que está atualizando esse rank');

            if(!contract.isValid()){
                res.status(400).send(contract.errors()).end();
                return;
            }

            const rank = await repository.update(id, { name, updated_by });
            res.status(200).send({
                message: 'Liga atualizada com sucesso',
                data: rank
            });
        }catch(e){
            res.status(400).send({
                message: 'Falha ao processar sua requisição'
            });
            console.error(e);
        }
    },

    async delete (req, res){
        try{
            const { id } = req.params;
            const contract = new ValidationContract();

            contract.isRequired(id, 'É necessário informar a liga que deseja excluir');

            if(!contract.isValid()){
                res.status(400).send(contract.errors()).end();
                return;
            }

            await repository.delete(id);

            res.status(200).send({
                message: 'Liga deletada com sucesso',
            });
        }catch(e){
            res.status(400).send({
                message: 'Falha ao processar sua requisição'
            });
            console.error(e);
        }
    }
}