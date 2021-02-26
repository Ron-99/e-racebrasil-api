const ValidationContract = require('../validators/FluentValidator');
const repository = require('../repositories/DriversRepository');
const repositorySeasons = require('../repositories/SeasonsRepository');

module.exports = {

    async index(req, res) {
        try {
            const { name, all } = req.query;
            if(all){
                const drivers = await repository.findAll();
                res.status(200).send(drivers);
            }
            const season = await repositorySeasons.findLastSeason();
            const drivers = await repository.findByName(name, season.number);
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

    async findById(req, res){
        try{
            const { id } = req.params;

            const driver = await repository.findById(id);
            const teams = await repository.findTeams(id);
            let teams2 = [];
            teams.forEach(team => {
                const team2 = {
                    id: team.teams.id,
                    name: team.teams.name
                }
                teams2.push(team2)
            });
            
            driver[0].teams = teams2;

            console.log(driver[0])
            res.status(200).send(driver[0]);
        }catch(e){
            res.status(400).send({
                message: 'Falha ao processar sua requisição'
            });
            console.error(e);
        }
    },

    async findWins(req, res){
        try{
            const { id } = req.params;
            const driver = await repository.findTrophys(id);
            res.status(200).send(driver[0]);
        }catch(e){
            res.status(400).send({
                message: 'Falha ao processar sua requisição'
            });
            console.error(e);
        }
    },

    async findLatestsRaces(req, res){
        try{
            const { id } = req.params;
            const races = await repository.findLatestsRaces(id);
            res.status(200).send(races);
        }catch(e){
            res.status(400).send({
                message: 'Falha ao processar sua requisição'
            });
            console.error(e);
        }
    },

    async findPenalty (req, res){
        try{
            const { id } = req.params;
            const races = await repository.findLatestsRaces(id);
            res.status(200).send(races);
        }catch(e){
            res.status(400).send({
                message: 'Falha ao processar sua requisição'
            });
            console.error(e);
        }
    },

    async findRaces(req, res){

    },

    async store(req, res) {
        try {
            const { name, created_by, updated_by } = req.body;
            const contract = new ValidationContract();

            contract.isRequired(name, 'É necessário informar o nome do piloto');
            contract.isRequired(created_by, 'É necessário informar o criador dessa punição');
            contract.isRequired(updated_by, 'É necessário informar o usuário que atualizou essa punição');

            if (!contract.isValid()) {
                res.status(400).send(contract.errors()).end();
                return;
            }

            const driver = await repository.create({name, created_by, updated_by, penalty_id: 1});

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
            const { name, updated_by } = req.body;
            const { id } = req.params;
            const contract = new ValidationContract();

            contract.isRequired(name, 'É necessário informar o nome do piloto');
            contract.isRequired(updated_by, 'É necessário informar o usuário que atualizou esse piloto');

            if (!contract.isValid()) {
                res.status(400).send(contract.errors()).end();
                return;
            }

            const driver = await repository.update(id, { name, updated_by });

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
            const { id } = req.params;
            const { penalty_id } = req.query;
            const { updated_by } = req.body;
            const driver = await repository.updatePenalty(id, {penalty_id, updated_by})

            res.status(200).send({
                message: 'Penalidade do piloto atualizada com sucesso',
                data: driver
            });
        }catch(e){
            res.status(400).send({
                message: 'Falha ao processar sua requisição'
            });
            console.error(e);
        }
    },

    async updateName(req, res){
        try{
            const { name, newName, updated_by } = req.body;
            const season = await repositorySeasons.findLastSeason();
            const id = await repository.findByName(name, season);
            
            const driver = await repository.updateName(id[0].id, {name: newName, updated_by});
            res.status(200).send({
                message: 'Nome atualizado com sucesso',
                data: driver
            });

        }catch(e){
            res.status(400).send({
                message: 'Falha ao processar sua requisição'
            });
            console.error(e);
        }
    }


}