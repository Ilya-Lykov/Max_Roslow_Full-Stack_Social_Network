const UsersService = require('./users.service');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const SECRET_KEY = process.env.SECRET_KEY;

const UserController = {
    register: async (req, res) => {
        const result = await UsersService.createUser(req.body);
        if (!result) {
            return res.status(400).json({ error: 'Пользователь с email существует' });
        }
        return res.status(200).json({ email: result.email, id: result.id });
    },

    login: async (req, res) => {
        try {
            const result = await UsersService.validateUser(req.body);

            if (!result) {
                return res.status(400).json({ error: 'Неверный логин и пароль' });
            }

            const { id, email } = await UsersService.getUserInfoByEmail(req.body.email);
            const token = jwt.sign({ email: email, userId: id }, SECRET_KEY);
            res.json({ error: token });

        } catch (err) {
            console.log('login error', err);
        }
    },

    current: async (req, res) => {
        try {
            const user = await UsersService.getCurrentUser(req.user.userId);
            if (!user) {
                return res.status(404).json({ error: 'Пользователь не найден' });

            }
            res.json(user);

        } catch (err) {
            console.error("Get Current Error", err);
            res.status(500).json({ error: "InternalServerError" });
        }
    },

    getUser: async (req, res) => {
        try {
            const { id } = req.params;
            const userId = req.user.userId;
            const user = await UsersService.getUserInfoById(id);

            if (!user) {
                errors.UserNotFound;
            }

            const isFollowing = await UsersService.isFollowing(id, userId);

            res.json({ ...user, isFollowing: Boolean(isFollowing) });

        } catch (err) {
            console.error('getUser Error', err);
            res.status(500).json({ error: "InternalServerError" });
        }
    },

    updateUser: async (req, res) => {
        const { id } = req.params;
        const { email } = req.body;

        let filePath;

        if (req.file && req.file.path) {
            filePath = req.file.path;
        }

        if (id !== req.user.userId) {
            return res.status(403).json({ error: 'Нет доступа' });
        }

        try {
            if (email) {
                const existingUser = await UsersService.getUserInfoByEmail(email);

                if (existingUser && existingUser.id !== id) {
                    return res.status(400).json({ error: "Почта уже использована" });
                }

            }

            const user = await UsersService.updateUser(id, req.body, filePath);

            res.json(user);


        } catch (error) {
            console.error("Update Error", error);
            res.status(500).json({ error: "InternalServerError" });
        }
    },

};

module.exports = UserController;