const ValidationContract = require('../validators/FluentValidator');
const Users = require('../models/Users');
const md5 = require('md5');
const authService = require('../services/AuthService');

module.exports = {

    async index(_, res){
        try{
            const users = await Users.findAll();
            res.status(200).send(users);
        }catch(e){
            console.error(e);
            res.status(400).send({
                message: 'Falha ao processar sua requisição'
            });
        }
        
    },

    async store(req, res){
        try{
            const { name, email, role, password, phone, address, driver_id } = req.body;
            const contract = new ValidationContract();

            contract.isRequired(name, 'O seu nome de usuário deve ser informado');
            contract.isRequired(email, 'O seu e-mail deve ser informado');
            contract.isEmail(email, 'E-mail inválido');
            contract.isRequired(driver_id, 'O piloto deve ser informado');
            contract.isRequired(role, 'O seu cargo deve ser informado');
            contract.isRequired(password, 'A sua senha deve ser informada')
            contract.hasMinLen(password, 6,'A senha deve ter no minimo 6 caracteres');
            contract.hasMaxLen(password, 12,'A senha deve ter no máximo 12 caracteres');

            if(!contract.isValid()){
                res.status(400).send(contract.errors()).end();
                return;
            }
            const user = await Users.create({name, email, role, phone, address, password: md5(password), driver_id});

            res.status(201).send({
                message: 'Usuário criado com sucesso',
                data: user
            });
        }catch(e){
            console.error(e);
            res.status(400).send({
                message: 'Falha ao processar sua requisição'
            });
        }
    },

    async authenticate (req, res){
        const { email, password } = req.body;
        const contract = new ValidationContract();
        
        contract.isRequired(email, 'O seu E-mail deve ser informado');
        contract.isEmail(email, 'E-mail inválido');
        contract.isRequired(password, 'A sua senha deve ser informada');
        contract.hasMinLen(password, 6, 'A senha deve conter no minimo 6 caracteres');

        if(!contract.isValid()){
            res.status(400).send(contract.errors()).end();
            return;
        }

        try{

            const user = await Users.findOne({where: {email, password: md5(password)}});

            if(!user){
                res.status(404).send({
                    message: 'E-mail ou senha inválida'
                });

                return;
            }

            const token = await authService.generateToken({
                id: user.id,
                email: user.email,
                name: user.name
            });

            res.status(201).send({
                token: token,
                data: {
                    id: user.id,
                    email: user.email,
                    name: user.name
                }
            });

        }catch(e){
            res.status(400).send({
                message: 'Falha ao processar sua requisição'
            });
            console.error(e);
        }
    },

    async refreshToken (req, res) {
        try {
            const token = req.body.token || req.query.token || req.headers['x-access-token'];
            const data = await authService.decodeToken(token);

            const user = await Users.findByPk(data.id);

            if(!user){
                res.status(404).send({
                    message: 'Cliente não encontrado'
                });
                return;
            }
            
            await authService.generateToken({
                id: user.id,
                email: user.email, 
                name: user.name
            });

            res.status(201).send({
                token: token,
                data: {
                    email: user.email,
                    name: user.name
                }
            });
            
        }catch(e){
            if(e.code === 11000){
                res.status(400).send({
                    message: 'Esse usuário já existe'
                });
            }else{
                res.status(400).send({
                    message: 'Falha ao processar sua requisição'
                });
            }
        }
    },

    async update (req, res){
        try{
            const { name, email, role, password, driver_id } = req.body;
            const { id } = req.params;
            const contract = new ValidationContract();

            contract.isRequired(name, 'O seu nome de usuário deve ser informado');
            contract.isRequired(email, 'O seu e-mail deve ser informado');
            contract.isEmail(email, 'E-mail inválido');
            contract.isRequired(role, 'O seu cargo deve ser informado');
            contract.isRequired(driver_id, 'O piloto deve ser informado');
            contract.isRequired(password, 'A sua senha deve ser informada')
            contract.hasMinLen(password, 6,'A senha deve ter no minimo 6 caracteres');
            contract.hasMaxLen(password, 12,'A senha deve ter no máximo 12 caracteres');

            if(!contract.isValid()){
                res.status(400).send(contract.errors()).end();
                return;
            }
            await Users.update({name, email, role, password: md5(password), driver_id}, { where: {id}});
            const user = await Users.findByPk(id);

            res.status(200).send({
                message: 'Usuário atualizado com sucesso',
                data: {
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    updatedAt: user.updatedAt
                }
            });
        }catch(e){
            res.status(400).send({
                message: 'Falha ao processar sua requisição'
            });
            console.error(e);
        }
    }
}
