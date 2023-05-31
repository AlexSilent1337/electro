import { Router } from "express"

import {ordersPath, productsPath} from '../config'

import {writeFile, readFile} from 'fs/promises'
import { IOrder, IOrders } from "../interfaces"


const router = Router()

 router.post('/orders', async(req, res) => {

    const {username} = req.body

    const txt = await readFile(ordersPath, 'utf-8')

    const obj  : IOrders = await JSON.parse(txt)

    let result = obj[username]


    if (result !== undefined) {

      
        const txt1 = await readFile(productsPath, 'utf-8')
        const obj1 = await JSON.parse(txt1)

        const products: any[] = []

        for (let i = 0; i < result.length; ++i) {
            products.push([])
        }


        for (let i = 0; i < obj1.length; ++i) {
            for (let j = 0; j < result.length; ++j) {
                for (let k = 0; k < result[j].orders.length; ++k) {

                    if (obj1[i].id === result[j].orders[k]) {
                        // products[j].push(obj1[i])


                        result[j].orders[k] = obj1[i]
                    }
                    
                }
            }
        }


    }
    else  {

        result = []
    }


  


    res.send({result})
})

router.post('/cancel_order', async(req, res) => {

    const {id, username} = req.body



    const txt = await readFile(ordersPath, 'utf-8')
    const obj : IOrders = await JSON.parse(txt)


    // console.log("mvdksk", obj[username]);
    


    const newUsername = []

    for (let i = 0; i < obj[username].length; ++i)
    {
        if (id !== obj[username][i].id) {
            newUsername.push(obj[username][i])
        }
        
    }

    obj[username] = newUsername

    await writeFile(ordersPath, JSON.stringify(obj))

    res.send({status :'ok'})
})

module.exports = router