import { readFile, writeFile } from 'fs/promises'

interface ICard {
  username: string

  card: { name: string; id: number; quantity: number }[]
}

class Card {
  private cardDBPath: string

  constructor(path: string) {
    this.cardDBPath = path
  }

  private async readDB() {
    const str = await readFile(this.cardDBPath, 'utf-8')

    const db: ICard[] = await JSON.parse(str)

    return db
  }

  private async writeDB(db: ICard[]) {
    await writeFile(this.cardDBPath, JSON.stringify(db))
  }

  public async getCardByUsername(username: string) {
    const db = await this.readDB()

    for (let i = 0; i < db.length; ++i) {
      if (db[i].username === username) {
        return db[i].card
      }
    }

    return []
  }

  public async addToTheCard(
    username: string,
    productID: number,
    name: string,
    quantity: number
  ) {
    const db = await this.readDB()

    let status = 'ok'

    let userFounded = false

    for (let i = 0; i < db.length; ++i) {
      if (db[i].username === username) {
        userFounded = true

        let productExists = false

        for (let j = 0; j < db[i].card.length; ++j) {
          if (db[i].card[j].id === productID) {
            if (db[i].card[j].quantity === quantity) {
              status = 'уже существует'
            } else {
              db[i].card[j].quantity = quantity

              status = 'обновлено'
            }

            productExists = true

            break
          }
        }

        if (productExists === false) {
          // adding

          db[i].card.push({ name, id: productID, quantity })
        }

        break
      }
    }

    if (userFounded === false) {
      db.push({ username, card: [{ name, id: productID, quantity }] })
    }

    await this.writeDB(db)

    return status
  }

  public async removeProduct(username: string, id: number) {
    const db = await this.readDB()

    for (let i = 0; i < db.length; ++i) {
      if (db[i].username !== username) continue

      for (let j = 0; j < db[i].card.length; ++j) {
        if (db[i].card[j].id !== id) continue

        db[i].card.splice(j, 1)

        break
      }

      break
    }

    await this.writeDB(db)
  }

  public async removeProducts(username: string, ids: number[]) {
    const db = await this.readDB()

    for (let i = 0; i < db.length; ++i) {
      if (db[i].username !== username) continue


      console.log('ids', ids);
      

      for (let j = 0; j < db[i].card.length; ++j) {

        console.log('db[i].card', db[i].card);
        

        for (let k = 0; k < ids.length; ++k) {

          console.log('db[i].card[j].id', db[i].card[j].id);
          
          if (db[i].card[j].id !== ids[k]) continue

          db[i].card.splice(j, 1)

        }
      }

      break
    }

    await this.writeDB(db)
  }
}

export { Card }
