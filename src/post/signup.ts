import { Router } from 'express'
import { DB } from '../classes/DB'
import { usersDBPath } from '../config'

const db = new DB(usersDBPath)

module.exports = Router().post('/signup', async (req, res) => {
  const { login, pass } = req.body

  try {
    await db.addNewUser(login, pass)

    res.send({ status: 'ok' })
  } catch (e) {
    res.send({ status: (e as Error).message })
  }
})
