const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');
const redis = require("redis");
require('dotenv').config()

//For Swagger Api Documentation for local development
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

//importing route
const heartbeatRoute = require("./Route/Heartbeat");
const charecterRoute = require("./Route/Charecter");

//pulling env variable
const {PORT,NODE_ENV,REDISPORT} = process.env;

//connect redis
global.redisClient = redis.createClient(REDISPORT)


//Initializing app
const app = express()
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())

//app route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/", heartbeatRoute)
app.use("/charecters", charecterRoute);


const server = app.listen(PORT, function () {
  console.log("App Environment :", NODE_ENV)
  console.log("App is running on Port :", PORT)
})
module.exports = server;





