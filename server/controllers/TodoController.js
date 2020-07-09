"use strict"

const {Todo} = require('../models')
const axios = require('axios')

class TodoController {
    static read (req, res) {
        Todo.findAll({
            order:[['id', 'ASC']]
        })
        .then(function(data){
            return res.status(200).json(data)
        })
        .catch(function(err){
            console.log(err)
        })
    }
    static currency (req, res) {
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
                q:"1.0",
                from:"SGD",
                to:"IDR"
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

module.exports = TodoController