const User = require('./users.entity');
const UsersRepository = require('./users.repository');
// const { createIcon, avatarPath } = require('../../service/user.icon.service');
const UserIcon = require('../../service/user.icon.service');
require("dotenv").config();

const SALT = +process.env.SALT;

const UsersService = {
    async createUser({ email, name, password }) {
        const newUser = new User(email, name);
        await newUser.setPassword(password, SALT);

        const existedUser = await UsersRepository.find(email);

        if (existedUser) {
            return null;
        }
        const userIcon = new UserIcon(name);
        await newUser.setAvatarUrl(userIcon.getAvatarPath);
        return await UsersRepository.create(newUser);
    },
    async validateUser({ email, password }) {
        const existedUser = await UsersRepository.find(email);
        if (!existedUser) {
            return false;
        }
        const newUser = new User(existedUser.email, existedUser.name, existedUser.password);
        return newUser.comparePassword(password);
    },
    async getUserInfoByEmail(email) {
        return UsersRepository.find(email);
    },
    async getUserInfoById(id) {
        return UsersRepository.findById(id);
    }
};

module.exports = UsersService;