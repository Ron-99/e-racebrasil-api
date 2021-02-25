const repository = require('../repositories/DriversParticipatedRepository');
const ValidationContract = require('../validators/FluentValidator');

module.exports = {

    async index (_, res){
        try{
            const drivers = await repository.findAll();
            res.status(200).send(drivers);
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
            const driver = await repository.findById(id);

            res.status(200).send(driver);
        }catch(e){
            res.status(400).send({
                message: 'Falha ao processar sua requisição'
            });
            console.error(e);
        }
    },

    async store (req, res){
        try{
            
            const { team_id, driver_id, season_id } = req.params;
            let { reserve } = req.query;
            // reserve = reserve === 'true' ? 1 : 0;

            const { created_by, updated_by } = req.body;
            const contract = new ValidationContract();

            contract.isRequired(driver_id, 'É necessário informar o piloto');
            contract.isRequired(team_id, 'É necessário informar a equipe');
            contract.isRequired(season_id, 'É necessário informar o rank');
            contract.isRequired(created_by, 'É necessário informar o usuário que está cadastrando a equipe');
            contract.isRequired(updated_by, 'É necessário informar o usuário que está atualizando a equipe');
            contract.isRequired(reserve, 'É necessário informar se o piloto foi reserva nessa equipe');

            if(!contract.isValid()){
                res.status(400).send(contract.errors()).end();
                return;
            }

            const team = await repository.create({driver_id, team_id, season_id, created_by, updated_by, reserve});
            
            res.status(201).send({
                message: 'Piloto associado com a equipe e rank com sucesso',
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
            const { driver_id, team_id, season_id, updated_by } = req.body;
            const contract = new ValidationContract();

            contract.isRequired(driver_id, 'É necessário informar o piloto');
            contract.isRequired(team_id, 'É necessário informar a equipe');
            contract.isRequired(season_id, 'É necessário informar o rank');
            contract.isRequired(updated_by, 'É necessário informar o usuário que está atualizando a equipe');
            contract.isRequired(reserve, 'É necessário informar se o piloto foi reserva nessa equipe');

            if(!contract.isValid()){
                res.status(400).send(contract.errors()).end();
                return;
            }

            const team = await repository.update(id, {driver_id, team_id, updated_by, reserve});
            
            res.status(200).send({
                message: 'Piloto associado com a equipe e rank com sucesso',
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

            contract.isRequired(id, 'É necessário informar a associação que deseja excluir');

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