const routes = require('express').Router();
const userRouter = require('./userRoutes');
const todoRouter = require('./todoRoutes');

routes.use('/users', userRouter);
routes.use('/todos', todoRouter)

module.exports = routes;