const { hash, compare } = require('bcryptjs');

class User {
    _password;
    _avatarUrl;
    constructor(email, name, passwordHash = undefined) {
        this._email = email;
        this._name = name;

        if (passwordHash) {
            this._password = passwordHash;
        }
    }

    get email() {
        return this._email;
    }
    get name() {
        return this._name;
    }
    get password() {
        return this._password;
    };

    get avatarUrl() {
        return this._avatarUrl;
    }

    async setAvatarUrl(avatarUrl) {
        this._avatarUrl = await avatarUrl;
    }

    async setPassword(password, salt) {
        this._password = await hash(password, salt);
    }

    async comparePassword(password) {
        return compare(password, this._password);
    }
}

module.exports = User; 