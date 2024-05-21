const jdentIcon = require('jdenticon');
const path = require('path');
const fs = require('fs');

const createIcon = (name) => {
    const png = jdentIcon.toPng(200);
    const avatarName = `${name}_${Date.now()}.png`;
    const avatarPath = path.join(__dirname, '../uploads', avatarName);
    fs.writeFileSync(avatarPath, png);
};

module.exports = createIcon;