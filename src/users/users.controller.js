const UsersService = require('./users.service');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const SECRET_KEY = process.env.SECRET_KEY;

const UserController = {
    register: async (req, res) => {
        const result = await UsersService.createUser(req.body);
        if (!result) {
            return res.status(400).json({ error: 'Пользователь с таким e-mail существует' });
        }
        return res.status(200).json({ email: result.email, id: result.id });
    },
    login: async (req, res) => {
        const result = await UsersService.validateUser(req.body);
        if (!result) {
            return res.status(400).json({ error: 'Неверный логин и пароль' });
        }
        const { id, email } = await UsersService.getUserInfoByEmail(req.body.email);
        const token = jwt.sign({ email: email, id: id }, SECRET_KEY);
        res.json(token);
    },
    current: async (req, res) => {
        res.send('current');
    },
    getUser: async (req, res) => {
        const { reqId } = req.params;
        res.json(await UsersService.getUserInfoById(reqId));
    },
    updateUser: async (req, res) => {
        res.send("updateUser");
    },

};

module.exports = UserController;