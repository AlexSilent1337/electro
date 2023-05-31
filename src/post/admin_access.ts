import { Router } from 'express'
import { adminPath, productsPath } from '../config'
import { Admin } from '../classes/Admin'

const a = new Admin(adminPath, productsPath)

const router = Router()

router.post('/admin_access', async (req, res) => {
  const { username } = req.body

  const status = await a.isAdmin(username)

  res.send({ status })
})

router.post('/add_product', async (req, res) => {
  const { name, price, about, images } = req.body

  await a.addProduct(name, price, about, images)

  res.send({ status: 'ok' })
})

module.exports = router
