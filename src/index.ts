import express from 'express'
import { resolve } from 'path'

const run = () => {
  const app = express()

  const serverPort = 3020

  app.use(express.json())

  console.log(resolve(__dirname, '..', 'content'))

  app.use('/static', express.static(resolve(__dirname, '..', 'content')))

  app.use(
    '/',
    require('./get/main'),
    require('./get/login'),
    require('./get/signup'),
    require('./get/product'),
    require('./get/card'),
    require('./get/delivery'),
    require('./get/finished_delivery'),
    require('./get/search'),
    require('./get/admin'),
    require('./get/profile')
  )

  app.use(
    '/',
    require('./post/signup'),
    require('./post/login'),
    require('./post/product'),
    require('./post/submitReview'),
    require('./post/add_to_card'),
    require('./post/add_to_favorite'),
    require('./post/search'),
    require('./post/admin_access'),
    require('./post/profiles'),
    require('./post/orders')
  )

  app.listen(serverPort, () => {
    console.log(`Server is started on port ${serverPort}`)
  })
}

run()
