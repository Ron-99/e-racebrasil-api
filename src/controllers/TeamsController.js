const repository = require('../repositories/TeamsRepository');
const ValidationContract = require('../validators/FluentValidator');

module.exports = {
    
    async index (_, res){
        try{
            const teams = await repository.findAll();
            res.status(200).send(teams);
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
            const team = await repository.findById(id);
            res.status(200).send(team);
        }catch(e){
            res.status(400).send({
                message: 'Falha ao processar sua requisição'
            });
            console.error(e);
        }
    },

    async store (req, res) {
        try{
            const { name, created_by, updated_by } = req.body;
            const contract = new ValidationContract();

            contract.isRequired(name, 'É necessário informar o nome da equipe');
            contract.isRequired(created_by, 'É necessário informar o usuário que está cadastrando a equipe');
            contract.isRequired(updated_by, 'É necessário informar o usuário que está atualizando a equipe');

            if(!contract.isValid()){
                res.status(400).send(contract.errors()).end();
                return;
            }

            const team = await repository.create({name, created_by, updated_by});
            
            res.status(201).send({
                message: 'Equipe criada com sucesso',
                data: team
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

            contract.isRequired(name, 'É necessário informar o nome da equipe');
            contract.isRequired(updated_by, 'É necessário informar o usuário que está atualizando a equipe');

            if(!contract.isValid()){
                res.status(400).send(contract.errors()).end();
                return;
            }

            const team = await repository.update(id, {name, updated_by});

            res.status(200).send({
                message: 'Equipe atualizada com sucesso',
                data: team
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

            contract.isRequired(id, 'É necessário informar a equipe que deseja excluir');

            if(!contract.isValid()){
                res.status(400).send(contract.errors()).end();
                return;
            }

            await repository.delete(id);

            res.status(200).send({
                message: 'Equipe deletada com sucesso',
            });
        }catch(e){
            res.status(400).send({
                message: 'Falha ao processar sua requisição'
            });
            console.error(e);
        }
    }
}