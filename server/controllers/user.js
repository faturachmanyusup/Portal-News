const { User } = require('../models')
const { generateToken } = require('../helpers/jwt')
const { decryptPassword } = require('../helpers/bcrypt')
class UserController {
    static register(req, res, next) {
        console.log(req.body);
        const payload = {
            email: req.body.email,
            password: req.body.password,
            name: req.body.name
        }
        
        User.create(payload)
        .then(data => {
            return res.status(201).json(data)
        })
        .catch(err=> {
            console.log((err));
            next (err)
        })
    }
    
    static login(req, res, next) {
        const { email, password } = req.body
        User.findOne({
            where: {
                email
            }
        })
        .then(data=> {
            if(data) {
                if(decryptPassword(password, data.password)){
                    const access_token = generateToken({
                        id: data.id,
                        email: data.email,
                        name: data.name
                    })
                    return res.status(200).json({
                        id: data.id,
                        email: data.email,
                        name:data.name,
                        access_token
                    })
                } else {
                    return next({
                        name: 'Bad Request',
                        errors: [{
                            message: 'Invalid email/password'
                        }]
                    })
                }
            } else {
                return next({
                    name: 'Bad Request',
                    errors: [{
                        message: 'Invalid email/password'
                    }]
                })
            }
        })
        .catch(err => {
            next (err)
        })
    }
}
module.exports = UserController