import { Router } from 'express'
import { resolve } from 'path'
import { pagesPath } from '../config'

module.exports = Router().get('/finished_delivery', (req, res) => {
  res.sendFile(resolve(pagesPath, 'finished_delivery.html'))
})
