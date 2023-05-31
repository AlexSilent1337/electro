import { Router } from 'express'
import { Product } from '../classes/Product'
import { Review } from '../classes/Review'
import { productsPath, reviewPath } from '../config'

const pr = new Product(productsPath)
const r = new Review(reviewPath)

const router = Router().post('/product/:id', async (req, res) => {
  const product_id = req.params.id

  try {
    const nproduct_id = Number(product_id)
    const product = await pr.getProductById(nproduct_id)

    let reviews
    try {
      reviews = await r.getReviewById(nproduct_id)
    } catch (e) {
      reviews = []
    }

    res.send({ status: 'ok', product: { ...product, reviews } })
  } catch (e) {
    const error = e as Error

    res.send({ status: error.message })
  }
})

router.get('/get_all_products', async (req, res) => {
  const products = await pr.getAllProducts()

  res.send({ products })
})

module.exports = router
