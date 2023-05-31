import { Router } from 'express'
import { resolve } from 'path'
import { pagesPath } from '../config'

module.exports = Router().get('/delivery', (req, res) => {
  res.sendFile(resolve(pagesPath, 'delivery.html'))
})
