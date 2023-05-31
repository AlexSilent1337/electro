import { Router } from 'express'
import { favoritePath, productsPath } from '../config'
import { Favorite } from '../classes/Favorite'
import { Product } from '../classes/Product'

const f = new Favorite(favoritePath)
const pr = new Product(productsPath)

const router = Router()

router.post('/favorite', async (req, res) => {
  const { username } = req.body

  const card = await f.getFavoriteByUsername(username)

  const ids = []

  for (let i = 0; i < card.length; ++i) {
    ids.push(card[i].productID)
  }

  const products = await pr.getProductsByIDs(ids)

  const newProducts = []

  for (let i = 0; i < card.length; ++i) {
    newProducts.push({ ...products[i] })
  }

  res.send({ card: newProducts })
})

router.post('/add_to_favorite/product/:id', async (req, res) => {
  const { id } = req.params
  const { username, name } = req.body

  const status = await f.addToFavorite(username, Number(id), name)

  res.send({ status })
})

router.post('/remove_favorite_product', async (req, res) => {
  const { username, id } = req.body

  await f.removeProduct(username, Number(id))

  res.send({ status: 'ok' })
})

module.exports = router
