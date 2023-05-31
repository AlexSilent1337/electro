import { readFile, writeFile } from 'fs/promises'

interface IFavorite {
  username: string
  card: { name: string; productID: number }[]
}

class Favorite {
  private dbPath: string

  constructor(path: string) {
    this.dbPath = path
  }

  private async readDB() {
    const str = await readFile(this.dbPath, 'utf-8')

    const db: IFavorite[] = await JSON.parse(str)

    return db
  }

  private async writeDB(db: IFavorite[]) {
    await writeFile(this.dbPath, JSON.stringify(db))
  }

  public async getFavoriteByUsername(username: string) {
    const db = await this.readDB()

    for (let i = 0; i < db.length; ++i) {
      if (db[i].username === username) {
        return db[i].card
      }
    }

    return []
  }

  public async addToFavorite(
    username: string,
    productID: number,
    name: string
  ) {
    const db = await this.readDB()

    let status = 'ok'

    let userFounded = false

    for (let i = 0; i < db.length; ++i) {
      if (db[i].username === username) {
        userFounded = true

        let productExists = false

        for (let j = 0; j < db[i].card.length; ++j) {
          if (db[i].card[j].productID === productID) {
            status = 'уже существует'

            productExists = true

            break
          }
        }

        if (productExists === false) {
          db[i].card.push({ name, productID })
        }

        break
      }
    }

    if (userFounded === false) {
      db.push({ username, card: [{ name, productID }] })
    }

    await this.writeDB(db)

    return status
  }

  public async removeProduct(username: string, id: number) {
    const db = await this.readDB()

    for (let i = 0; i < db.length; ++i) {
      if (db[i].username !== username) continue

      for (let j = 0; j < db[i].card.length; ++j) {
        if (db[i].card[j].productID !== id) continue

        db[i].card.splice(j, 1)

        break
      }

      break
    }

    await this.writeDB(db)
  }
}

export { Favorite }
