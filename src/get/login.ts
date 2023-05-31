import { Router } from 'express'
import { pagesPath } from '../config'
import { resolve } from 'path'

module.exports = Router().get('/login', (req, res) => {
  res.sendFile(resolve(pagesPath, 'login.html'))
})
