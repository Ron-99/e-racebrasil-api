const ValidationContract = require('../validators/FluentValidator');
const repository = require('../repositories/TempTeamsRepository');
const repositoryDriver = require('../repositories/DriversRepository');


module.exports = {

    async findAll(req, res){
        try{
            let { name } = req.query;
            let tempTeams;
            if(name){
                tempTeams = await repository.findByName(name);
                if(tempTeams == null){
                    name = name.substring(3, 6) + name.substring(0, 3)
                    tempTeams = await repository.findByName(name);
                }
                    
            }else{
                tempTeams = await repository.findAll();
            }

            res.status(200).send(tempTeams);
        }catch(e){
            res.status(400).send({
                message: 'Falha ao processar sua requisição'
            });
            console.error(e);
        }
    },

    async store(req, res){
        try{
            const {first_driver, second_driver, created_by, updated_by} = req.body;
            const contract = new ValidationContract();

            contract.isRequired(first_driver, 'É necessário informar o primeiro piloto');
            contract.isRequired(second_driver, 'É necessário informar o segundo piloto');
            contract.isRequired(created_by, 'É necessário informar o criador desse time temporário');
            contract.isRequired(updated_by, 'É necessário informar o usuário que atualizou esse time temporário');
            
            if (!contract.isValid()) {
                res.status(400).send(contract.errors()).end();
                return;
            }

            const driverOne = await repositoryDriver.findById(first_driver);
            const driverTwo = await repositoryDriver.findById(second_driver);

            const name = driverOne[0].name.substring(0, 3).toLowerCase() + driverTwo[0].name.substring(0, 3).toLowerCase();

            const tempTeam = await repository.create({name, first_driver, second_driver, created_by, updated_by});

            res.status(201).send({
                message: 'Equipe temporária criada com sucesso',
                data: tempTeam
            });

        }catch(e){
            res.status(400).send({
                message: 'Falha ao processar sua requisição'
            });
            console.error(e);
        }
    }
}