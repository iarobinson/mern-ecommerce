const indexRouter = require('express').Router();
const apiRoutes = require('./api');

const keys = require('../config/keys');
const { apiURL } = keys.app;

const api = `/${apiURL}`;

// api routes
indexRouter.use(api, apiRoutes);
indexRouter.use(api, (req, res) => res.status(404).json('No API route found'));

module.exports = indexRouter;
