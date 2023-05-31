import { Router } from 'express'
import { DB } from '../classes/DB'
import { usersDBPath } from '../config'

const db = new DB(usersDBPath)

module.exports = Router().post('/login', async (req, res) => {
  const { login, pass } = req.body

  const isExists = await db.isUserExists(login, pass)

  console.log(login, pass)

  if (isExists) {
    res.send({ status: 'ok' })
  } else {
    res.send({ status: 'Нет такого пользователя' })
  }
})
