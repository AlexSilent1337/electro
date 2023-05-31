import { readFile } from 'fs/promises'

interface IProduct {
  id: number
  name: string
  price: number
  about: string
  images: string[]
}

class Product {
  private productDBPath: string

  constructor(path: string) {
    this.productDBPath = path
  }

  private async readDB() {
    const dbString = await readFile(this.productDBPath, 'utf-8')
    const db: IProduct[] = await JSON.parse(dbString)

    return db
  }

  public async getProductsByIDs(ids: number[]) {
    const product = []
    const db = await this.readDB()

    for (let j = 0; j < ids.length; ++j) {
      for (let i = 0; i < db.length; ++i) {
        if (db[i].id === ids[j]) {
          product.push(db[i])

          break
        }
      }
    }

    return product
  }

  public async getProductById(id: number) {
    const db = await this.readDB()
    let obj: IProduct | null = null

    for (let i = 0; i < db.length; ++i) {
      if (db[i].id === id) {
        obj = db[i]

        break
      }
    }

    if (obj === null) {
      throw new Error('Нет такого продукта')
    }

    return obj
  }

  public async getAllProducts() {
    const products = await this.readDB()

    return products
  }
}

export { Product, IProduct }
