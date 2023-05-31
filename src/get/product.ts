import { Router } from 'express'
import { pagesPath } from '../config'
import { resolve } from 'path'

module.exports = Router().get('/product/:product_id', (req, res) => {
  res.sendFile(resolve(pagesPath, 'product.html'))
})
