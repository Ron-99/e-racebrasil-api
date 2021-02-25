const repository = require('../repositories/ClassificationRepository');
const repositoryDriversParticipated = require('../repositories/DriversParticipatedRepository');
const repositoryDrivers = require('../repositories/DriversRepository');

const ValidationContract = require('../validators/FluentValidator');

module.exports = {

    async index (req, res) {
        try{
            const { date, rank, season } = req.query;
            const classifications = await repository.findAll(rank, season, date);

            let times = [];
            classifications.forEach((classification) => {
                const time = parseInt(classification.best_time.replace(':', '').replace(',', ''));
                const data = time

                if(!isNaN(data))
                    times.push(Math.min(data))
            })

            Array.min = function(array) {
                return Math.min.apply(Math, array);
            };

            String.prototype.splice = function(idx, rem, str) {
                return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
            };

            const best_time = Array.min(times).toString().splice(1, 0, ":").splice(4, 0, ",");

            classifications.forEach((classification, i) => {
                if(classification.best_time === best_time){
                    classification.best_lap = true;
                    return;
                }
            })

            res.status(200).send(classifications);
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
            const classification = await repository.findById(id);
            res.status(200).send(classification);
        }catch(e){
            res.status(400).send({
                message: 'Falha ao processar sua requisição'
            });
            console.error(e);
        }
    },

    async findDatesByRank (req, res){
        try{
            const { rank, season } = req.query;
            const classifications = await repository.findDatesByRank(rank, season);
            res.status(200).send(classifications);
        }catch(e){
            res.status(400).send({
                message: 'Falha ao processar sua requisição'
            });
            console.error(e);
        }
    },

    async findDriversPoints (req, res){
        try{
            const { rank, season } = req.query;
            const classifications = await repository.findDriversPoints(rank, season);
            res.status(200).send(classifications);
        }catch(e){
            res.status(400).send({
                message: 'Falha ao processar sua requisição'
            });
            console.error(e);
        }
    },

    async findTeamsPoints (req, res){
        try{
            const { rank, season } = req.query;
            const teamsPoints = await repository.findTeamsPoints(rank, season);
            let responses = [];
            for (let i = 0; i < teamsPoints.length; i++) {
                const drivers = await repositoryDrivers.findDriversByTeam(teamsPoints[i].teamId, teamsPoints[i].season);
                let driversTeams = "";
                for (let j = 0; j < drivers.length; j++) {
                    if(j === drivers.length - 1)
                        driversTeams += `${drivers[j].name}${drivers[j].drivers_participated[0].reserve ? `(Reserva)` : ''}`
                    else 
                        driversTeams += `${drivers[j].name}${drivers[j].drivers_participated[0].reserve ? `(Reserva)` : ''}, `;
                }
                const response = {
                    team: teamsPoints[i].team,
                    drivers: driversTeams,
                    points: teamsPoints[i].points
                }
                responses.push(response);
            }

            res.status(200).send(responses);
        }catch(e){
            res.status(400).send({
                message: 'Falha ao processar sua requisição'
            });
            console.error(e);
        }
    },

    async store (req, res){
        try{
            const { position, best_time, trial_time, date, points, driver_id, track_id, created_by, updated_by } = req.body;
            const contract = new ValidationContract();



            contract.isRequired(position, 'É necessário informar a posição do piloto');
            contract.isInteger(position, 'A posição do piloto deve ser um número inteiro');
            contract.isRequired(best_time, 'É necessário informar o melhor tempo do piloto');
            contract.isRequired(trial_time, 'É necessário informar o tempo total');
            contract.isRequired(date, 'É necessário informar a data do evento');
            contract.isRequired(points, 'É necessário informar a pontuação do piloto');
            contract.isInteger(points, 'Os pontos devem ser um número inteiro');
            contract.isRequired(driver_id, 'É necessário informar o piloto');
            contract.isRequired(track_id, 'É necessário informar a pista');
            contract.isRequired(created_by, 'É necessário informar o usuário que está cadastrando a classificação');
            contract.isRequired(updated_by, 'É necessário informar o usuário que está atualizando a classificação');

            const driverP = await repositoryDriversParticipated.findByDriver(driver_id);
            const season_id = driverP.seasons.id;
            console.log(season_id)

            const best_lap = false;

            if(!contract.isValid()){
                res.status(400).send(contract.errors()).end();
                return;
            }

            const classification = await repository.create({position, best_time, best_lap, trial_time, date, points, driver_id, track_id, season_id, created_by, updated_by});

            res.status(201).send({
                message: 'Classificação criada com sucesso',
                data: classification
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
            const { position, best_time, trial_time, date, points, driver_id, track_id, updated_by } = req.body;
            const contract = new ValidationContract();

            contract.isRequired(position, 'É necessário informar a posição do piloto');
            contract.isInteger(position, 'A posição do piloto deve ser um número inteiro');
            contract.isRequired(best_time, 'É necessário informar o melhor tempo do piloto');
            contract.isRequired(trial_time, 'É necessário informar o tempo total');
            contract.isRequired(date, 'É necessário informar a data do evento');
            contract.isRequired(points, 'É necessário informar a pontuação do piloto');
            contract.isInteger(points, 'Os pontos devem ser um número inteiro');
            contract.isRequired(driver_id, 'É necessário informar o piloto');
            contract.isRequired(track_id, 'É necessário informar a pista');
            contract.isRequired(updated_by, 'É necessário informar o usuário que está atualizando a classificação');


            if(!contract.isValid()){
                res.status(400).send(contract.errors()).end();
                return;
            }

            const classification = await repository.update(id, {position, best_time, trial_time, date, points, driver_id, track_id, updated_by});

            res.status(200).send({
                message: 'Classificação atualizada com sucesso',
                data: classification
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

            contract.isRequired(id, 'É necessário informar a classificação que deseja excluir');

            if(!contract.isValid()){
                res.status(400).send(contract.errors()).end();
                return;
            }

            await repository.delete(id);

            res.status(200).send({
                message: 'Classificação deletada com sucesso',
            });

        }catch(e){
            res.status(400).send({
                message: 'Falha ao processar sua requisição'
            });
            console.error(e);
        }
    }
}