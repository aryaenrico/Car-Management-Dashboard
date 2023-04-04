const express = require ("express");
const path =require('path');
const router = require('../config/routes');

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true }))
server.use(router)


module.exports =server;
