const express = require('express');
const { sync_user } = require('../controllers/sync-user.controller');
const api_route =express.Router();


api_route.get('/sync-user', sync_user)


module.exports = api_route