import { Router} from 'express'
import {pagesPath} from '../config'
import { resolve } from 'path'


module.exports = Router().get('/profile', (req, res) => {
    res.sendFile(resolve(pagesPath, 'profile.html'))
})