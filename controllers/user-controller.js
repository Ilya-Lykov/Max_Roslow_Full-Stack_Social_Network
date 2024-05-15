const UserController = {
    register: async (req, res) => {
        res.send("register");
    },
    login: async (req, res) => {
        res.send("login");
    },
    current: async (req, res) => {
        res.send("current");
    },
    getUser: async (req, res) => {
        res.send("getUser");
    },
    updateUser: async (req, res) => {
        res.send("updateUser");
    },

};

module.exports = UserController;