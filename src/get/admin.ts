import { Router } from 'express'
import { resolve } from 'path'
import { pagesPath } from '../config'

module.exports = Router().get('/admin', (req, res) => {
  res.sendFile(resolve(pagesPath, 'admin.html'))
})
