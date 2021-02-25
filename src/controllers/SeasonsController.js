const repository = require('../repositories/SeasonsRepository');
const ValidationContract = require('../validators/FluentValidator');

module.exports = {

    async index (_, res){
        try{
            const seasons = await repository.findAll();
            res.status(200).send(seasons);
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
            const season = await repository.findById(id);
            res.status(200).send(season);
        }catch(e){
            res.status(400).send({
                message: 'Falha ao processar sua requisição'
            });
            console.error(e);
        }
    },

    async findByRank (req, res){
        try{
            const { rank_id } = req.params;
            const seasons = await repository.findByRank(rank_id);
            res.status(200).send(seasons);
        }catch(e){
            res.status(400).send({
                message: 'Falha ao processar sua requisição'
            });
            console.error(e);
        }
    },

    async findLastSeasonByRank (req, res){
        
    },

    async store (req, res){
        try{
            const { season_id, number, initial_date, final_date, created_by, updated_by } = req.body;

            const contract = new ValidationContract();
            contract.isRequired(season_id, 'É necessário informar a temporada da liga');
            contract.isRequired(number, 'É necessário informar o número da temporada');
            contract.isInteger(number, 'É necessário que o número da temporada seja inteiro');
            contract.isRequired(initial_date, 'É necessário informar a data de inicio da temporada');
            contract.isRequired(final_date, 'É necessário informar a data de fim da temporada');
            contract.isRequired(created_by, 'É necessário informar o usuário que está cadastrando a temporada');
            contract.isRequired(updated_by, 'É necessário informar o usuário que está atualizando a temporada');

            if(!contract.isValid()){
                res.status(400).send(contract.errors()).end();
                return;
            }

            const season = await repository.create({ season_id, number, initial_date, final_date, created_by, updated_by });

            res.status(201).send({
                message: 'Temporada criada com sucesso',
                data: season
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
            const { season_id, number, initial_date, final_date, updated_by } = req.body;

            const contract = new ValidationContract();
            contract.isRequired(season_id, 'É necessário informar a temporada da liga');
            contract.isRequired(number, 'É necessário informar o número da temporada');
            contract.isInteger(number, 'É necessário que o número da temporada seja inteiro');
            contract.isRequired(initial_date, 'É necessário informar a data de inicio da temporada');
            contract.isRequired(final_date, 'É necessário informar a data de fim da temporada');
            contract.isRequired(updated_by, 'É necessário informar o usuário que está atualizando a temporada');

            if(!contract.isValid()){
                res.status(400).send(contract.errors()).end();
                return;
            }

            const season = await repository.update(id, { season_id, number, initial_date, final_date, updated_by });

            res.status(200).send({
                message: 'Temporada atualizada com sucesso',
                data: season
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

            contract.isRequired(id, 'É necessário informar a temporada que deseja excluir');

            if(!contract.isValid()){
                res.status(400).send(contract.errors()).end();
                return;
            }

            await repository.delete(id);

            res.status(200).send({
                message: 'Temporada deletada com sucesso',
            });
        }catch(e){
            res.status(400).send({
                message: 'Falha ao processar sua requisição'
            });
            console.error(e);
        }
    }
}