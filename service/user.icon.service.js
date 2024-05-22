const jDentIcon = require('jdenticon');
const path = require('path');
const fs = require('fs');

// let avatarPath;

// const createIcon = (name) => {
//     const png = jdentIcon.toPng(name, 200);
//     const avatarName = `${name}_${Date.now()}.png`;
//     avatarPath = path.join(__dirname, '../uploads', avatarName);
//     console.log(avatarPath);

// };

class UserIcon {
    _avatarPath;
    constructor(name) {
        this.png = jDentIcon.toPng(name, 200);
        this.avatarName = `${name}_${Date.now()}.png`;
        this.avatarPath = path.join(__dirname, '../uploads', this.avatarName);
        fs.writeFileSync(this.avatarPath, this.png);
    }

    get getAvatarPath() {
        return this.avatarPath;
    }

}



module.exports = UserIcon; 