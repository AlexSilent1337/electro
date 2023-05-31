import { Router } from 'express'
import { pagesPath } from '../config'
import { resolve } from 'path'

const router = Router()

router.get('/card', (req, res) => {
  res.sendFile(resolve(pagesPath, 'card.html'))
})

router.get('/favorite', (req, res) => {
  res.sendFile(resolve(pagesPath, 'favorite.html'))
})

module.exports = router
