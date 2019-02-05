/*
 * src/index.js
 *
**/

import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors';
import path from 'path'
import helmet from 'helmet'
import morgan from 'morgan'

import config from './config'

// Infra
import Database from './database'
//import Schema from './schema'

// Services
import PaymentService from './payment-service'

// Schemas
//import FoodSchema from './schema/food.json'

// main is where our application resides
async function main () {
  // Create a new application
  const app = express()
  //const schema = Schema()

  //schema.add('food', FoodSchema)

  // Middlewares
  middlewares(app)
  
  app.use(cors())

  app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5004/');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

  // Host the schemas as static file
  app.use('/schemas', express.static(path.join(__dirname, 'schema')))

  // Initialize dependencies
  const db = await Database(config.get('db'))

   //const services = [
    // OrderService
//     // Would make much more sense when you have multiple services
//     // in the same application. e.g.
//     // ServiceA
//     // ServiceB
//     // ServiceC
   //].map(service => service({ db }))
   const paymentService = PaymentService({ db })

//   // Initialize service by looping through them
app.use(paymentService.basePath, paymentService.route)
// services.forEach((service) => {
    
//   })

  app.get('/', async (req, res) => {
    res.status(200).json({
      endpoints: paymentService.info,
      routes: app.routes
      //message: 'This is a Slate Order Management Service'
    })
  })

  // NOTE: This is a naive example, but you can create an endpoint to toggle the services (on/off)
  // app.get('/toggle', (req, res) => {
  //   const on = config.get('service.food')
  //   config.set('service.food', !on)
  //   res.status(200).json({
  //     on
  //   })
  // })
  
  // NOTE: It is always a good practice to have a health endpoint that checks every dependency you
  // have, such as databases/redis connection. It can be a simple PING to the database.
  // app.get('/health', function () {...})

  app.listen(config.get('port'), () => {
    console.log(`listening to port *:${config.get('port')}. press ctrl + c to cancel`)
  })

  return app
}

// middlewares takes the app, and inject the app with middlewares
function middlewares (app) {
  app.use(bodyParser.urlencoded({ extended: false }))
  // To parse json
  app.use(bodyParser.json())
  
  // For security
  app.use(helmet())

  // Enable logging during development
  app.use(morgan('dev', {
    skip(req, res) {
      return res.statusCode < 400
    },
    stream: process.stderr
  }))

  app.use(morgan('dev', {
    skip(req, res) {
      return res.statusCode >= 400
    },
    stream: process.stdout
  }))
}

main().catch(console.log)