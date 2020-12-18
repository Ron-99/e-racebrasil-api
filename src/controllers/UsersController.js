const Users = require('../models/Users');

module.exports = {
    async store(req, res){
        const { name, email, role, password } = req.body;

        const user = await Users.create({name, email, role, password});

        return res.json(user);
    }
}