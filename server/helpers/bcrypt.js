const bcrypt = require('bcrypt')
const salt = 10

const encryptPassword = (password) => {
    return bcrypt.hashSync(password, salt)
}

const decryptPassword = (password, hash) => {
    return bcrypt.compareSync(password, hash)
}

module.exports = {
    encryptPassword, decryptPassword
}