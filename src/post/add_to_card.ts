import { Router } from 'express'
import { Card } from '../classes/Card'
import { IProduct, Product } from '../classes/Product'
import { cardPath, productsPath,  ordersPath} from '../config'

import {readFile, writeFile} from 'fs/promises'
import {randomIntFromInterval} from '../utils'
import { IOrders } from '../interfaces'





const c = new Card(cardPath)
const pr = new Product(productsPath)

const router = Router()

interface IFullProduct {
  id: number
  name: string
  price: number
  quantity: number | undefined
}

router.post('/card', async (req, res) => {
  const { username } = req.body

  const card = await c.getCardByUsername(username)

  const ids = []

  for (let i = 0; i < card.length; ++i) {
    ids.push(card[i].id)
  }

  const products = await pr.getProductsByIDs(ids)

  const newProducts: IFullProduct[] = []

  for (let i = 0; i < card.length; ++i) {
    newProducts.push({ ...products[i], quantity: card[i].quantity })
  }

  res.send({ card: newProducts })
})

router.post('/add_to_card/product/:id', async (req, res) => {
  const { id } = req.params

  const { username, name, quantity } = req.body

  //logic of adding to card

  const status = await c.addToTheCard(
    username,
    Number(id),
    name,
    Number(quantity)
  )

  res.send({ status })
})

router.post('/remove_product', async (req, res) => {
  const { username, id } = req.body

  await c.removeProduct(username, Number(id))

  res.send({ status: 'ok' })
})



router.post('/remove_products', async (req, res) => {
  const { username, ids, isOrder, price } = req.body

  await c.removeProducts(username, ids)


  if (isOrder) {
    const txt = await readFile(ordersPath, 'utf-8')
    const obj : IOrders = await JSON.parse(txt)

    if (obj[username] == null) {
      obj[username] = []
    }

    // ids.push(price)

    obj[username].push({orders : ids, id : randomIntFromInterval(1000, 9999), price})

    
    await writeFile(ordersPath, JSON.stringify(obj))
  }


  res.send({ status: 'ok' })
})

module.exports = router
