import { Router } from 'express'
import { reviewPath } from '../config'
import { Review } from '../classes/Review'

const r = new Review(reviewPath)

module.exports = Router().post(
  '/submit_review/product/:id',
  async (req, res) => {
    const { name, comment } = req.body

    const product_id = req.params.id

    await r.submitNewReview(Number(product_id), name, comment)
    res.send({ status: 'ok' })
  }
)
