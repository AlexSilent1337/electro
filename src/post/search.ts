import { Router } from 'express'
import { IProduct, Product } from '../classes/Product'
import { productsPath } from '../config'

const pr = new Product(productsPath)

module.exports = Router().post('/search', async (req, res) => {
  const { productName } = req.body

  const products = await pr.getAllProducts()

  const result: IProduct[] = []

  for (let i = 0; i < products.length; ++i) {
    if (
      products[i].name
        .toLowerCase()
        .includes(decodeURI(productName.toLowerCase()))
    ) {
      result.push(products[i])
    }
  }

  res.send({ products: result })
})
