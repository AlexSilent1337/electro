import { readFile, writeFile } from 'fs/promises'
import { IProduct } from './Product'

interface IAdmin {
  username: string
}

class Admin {
  private productsPath: string
  private adminInfoPath: string

  constructor(adminInfoPath: string, productsPath: string) {
    this.productsPath = productsPath
    this.adminInfoPath = adminInfoPath
  }

  private async readDB<T>(path: string) {
    const str = await readFile(path, 'utf-8')

    const admins: T[] = await JSON.parse(str)

    return admins
  }

  public async isAdmin(username: string) {
    let status = false
    const admins = await this.readDB<IAdmin>(this.adminInfoPath)

    for (let i = 0; i < admins.length; ++i) {
      if (admins[i].username === username) {
        status = true

        break
      }
    }

    return status
  }

  public async addProduct(
    name: string,
    price: number,
    about: string,
    images: string[]
  ) {
    const products = await this.readDB<IProduct>(this.productsPath)

    const lastId = products[products.length - 1].id

    products.push({ name, price, id: lastId + 1, images, about })

    await writeFile(this.productsPath, JSON.stringify(products))
  }
}

export { Admin }
