const routes = require('express').Router();
const TodoController = require('../controllers/TodoController')

const jwt = require('jsonwebtoken')
const {User, Todo} = require('../models')

function authentication (req, res, next){
    const access_token = req.headers.access_token

    if (!access_token) {
        console.log('salah')
    } else {
        const userData = jwt.verify(access_token, process.env.SECRET)
        req.userData = userData
        User.findOne({
            where: {email: userData.email}
        })
        .then(function(data){
            if (data) {
                next()
            } else {
               console.log('salah')
            }
        })
        .catch(function(err){
            console.log(err)
        })
    }
}
// Ini API KEY Currency:
// bdac3a97a07df53ba90d7c77

//ROUTING TODO
routes.get('/', authentication,TodoController.read)
routes.get('/currency',TodoController.currency)

module.exports = routes