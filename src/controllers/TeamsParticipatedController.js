const repository = require('../repositories/TeamsParticipatedRepository');
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

    async store (req, res){
        try{
            
            let { team_id, driver_id } = req.params;

            team_id = parseInt(team_id);
            driver_id = parseInt(driver_id);

            console.log(team_id, driver_id);
            const { created_by, updated_by } = req.body;
            const contract = new ValidationContract();

            contract.isRequired(driver_id, 'É necessário informar o piloto');
            contract.isRequired(team_id, 'É necessário informar a equipe');
            contract.isRequired(created_by, 'É necessário informar o usuário que está cadastrando a equipe');
            contract.isRequired(updated_by, 'É necessário informar o usuário que está atualizando a equipe');

            if(!contract.isValid()){
                res.status(400).send(contract.errors()).end();
                return;
            }

            const team = await repository.create({driver_id, team_id, created_by, updated_by});
            
            res.status(201).send({
                message: 'Piloto associado com a equipe com sucesso',
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
            const { driver_id, team_id, updated_by } = req.body;
            const contract = new ValidationContract();

            contract.isRequired(driver_id, 'É necessário informar o piloto');
            contract.isRequired(team_id, 'É necessário informar a equipe');
            contract.isRequired(updated_by, 'É necessário informar o usuário que está atualizando a equipe');

            if(!contract.isValid()){
                res.status(400).send(contract.errors()).end();
                return;
            }

            const team = await repository.update(id, {driver_id, team_id, created_by, updated_by});
            
            res.status(200).send({
                message: 'Piloto associado com a equipe com sucesso',
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
                message: 'Associação deletada com sucesso',
            });
        }catch(e){
            res.status(400).send({
                message: 'Falha ao processar sua requisição'
            });
            console.error(e);
        }
    }
}