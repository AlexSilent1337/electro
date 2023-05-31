import {Router} from 'express'
import {resolve} from 'path'
import {profilesPath} from '../config'
import {readFile} from 'fs/promises'


module.exports = Router().post('/profiles', async(req,res) => {
    const txt = await readFile(profilesPath, 'utf-8')
    const obj = await JSON.parse(txt)


    const {username} = req.body

    console.log(username);
    
    let about = 'nothing'

    console.log(obj);
    

    for (let i = 0; i < obj.length; ++i) {

        if (obj[i]['login'] == username) {

            about = obj[i]['about']

            break
        }
    }



    res.send({about})


})