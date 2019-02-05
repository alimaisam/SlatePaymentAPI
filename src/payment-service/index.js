import Store from './store'
import Model from './model'
import Route from './route'

import express from 'express'
const router = express.Router()

function Service ({ db }) {
  const store = Store(db)
  const model = Model({ store })
  const route = Route(model)

  router
    .post('/process', route.processOrder)
    
  return router
}

export default (options) => {
  return {
    basePath: '/payment',
    info: {
      name: 'Payment Service',
      service: 'Payment',
      version: '1.0.0',
      description: 'Endpoint for payment service',
      paths: {
        process: {
          method: 'POST',
          path: '/payment/process'
        }
      }
    },
    route: Service(options)
  }
}