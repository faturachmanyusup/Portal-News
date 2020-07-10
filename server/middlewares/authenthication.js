const { User } = require('../models')
const { verify } = require('../helpers/jwt')
const Authentication = (req, res, next) => {
    try {
        let decode = verify(req.headers.access_token)
        User.findOne({
            where: {
              id: decode.id
            }
          })
            .then(result => {
              if (result) {
                req.currentUserId = result.id
                next()
              }
              else {
                return next({
                  name: 'Unauthenticated',
                  errors: [{ message: 'User Unauthenticated' }]
                })
              }
            })
            .catch(err => {
              return next({
                name: 'Unauthenticated',
                errors: [{ message: "User Unauthenticated" }]
              })
            })
    }
    catch (err){
        return next({
            name: 'JsonWebTokenError',
            errors: [{ message: "Please login first" }]
      
          })
    }
}

module.exports = Authentication