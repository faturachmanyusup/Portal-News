const { User } = require('../models')
const { generateToken } = require('../helpers/jwt')
const { decryptPassword } = require('../helpers/bcrypt')
const sendEmail = require(`../helpers/mailgun`)
const {OAuth2Client} = require('google-auth-library');
const axios = require('axios')

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
            let subject = `Successfully Registered to Portal News!`
            let text = `Welcome ${data.email} to Portal News!\nWe hope to be your best buddy in terms of your source choice for everything happens around you.\nHave a good day!\n\nCheers,\nPortal News!`
            sendEmail(data.email, subject, text)
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
                    let subject = `Successfully Sign in to Portal News!`
                    let text = `Welcome ${data.email} to Portal News!\nHappy reading!\n\nCheers,\nPortal News!`
                    sendEmail(data.email, subject, text)
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

    static googleLogin (req,res) {
        const id_token = req.body.id_token
        const client = new OAuth2Client(process.env.CLIENT_ID)
        let payload = null
        client.verifyIdToken({
            idToken: id_token,
            audience: process.env.CLIENT_ID
        })
        .then(ticket => {
            // console.log(ticket)
            payload = ticket.getPayload();
            const userid = payload['sub'];
            return User.findOne({
                where: 
                {email: payload.email}
            })
        })
        .then(user => {
            if(user) {
                return user
            } else {
                let dataUser = {
                    name: payload.name,
                    email: payload.email,
                    password: "password123"
                }
                return User.create(dataUser)
            }
        })
        .then(data => {
            const token = generateToken({ id: data.id, email: data.email})
            // let subject = `Successfully Sign in to Portal News!`
            // let text = `Welcome ${data.email} to Portal News!\nHappy reading!\n\nCheers,\nPortal News!`
            // sendEmail(data.email, subject, text)
            return res.status(200).json({access_token: token})
        })
        .catch(function(err){
            console.log(err)
            return res.status(500).json('Internal Server Error')
        })
    }

    static currency (req, res) {
        console.log(req.body)
        axios({
            method:"GET",
            url:"https://currency-exchange.p.rapidapi.com/exchange",
            headers:{
                "content-type":"application/octet-stream",
                "x-rapidapi-host":"currency-exchange.p.rapidapi.com",
                "x-rapidapi-key":"c6534378c0msh1be906041d04804p1e54d6jsn77673b7b484b",
                "useQueryString":true
            },
            params:{
                q:req.body.q,
                from:req.body.from,
                to:req.body.to
            }
        })
        .then((response)=>{
            return res.status(201).json(response.data)
        })
        .catch((error)=>{
            console.log(error)
            return res.status(500).json("Internal Server Error")
        })
    }
}
module.exports = UserController