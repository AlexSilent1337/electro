import { Router } from 'express'
import { pagesPath } from '../config'
import { resolve } from 'path'

module.exports = Router().get('/search', (req, res) => {
  res.sendFile(resolve(pagesPath, 'search.html'))
})
