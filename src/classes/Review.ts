import { readFile, writeFile } from 'fs/promises'

interface IReview {
  product_id: number
  reviews: { name: string; date: string; comment: string }[]
}

class Review {
  private reviewPath: string

  constructor(path: string) {
    this.reviewPath = path
  }

  private async readDB() {
    const str = await readFile(this.reviewPath, 'utf-8')
    const db: IReview[] = await JSON.parse(str)

    return db
  }

  private async writeDB(newDB: IReview[]) {
    await writeFile(this.reviewPath, JSON.stringify(newDB))
  }

  public async submitNewReview(id: number, name: string, comment: string) {
    const db = await this.readDB()

    for (let i = 0; i < db.length; ++i) {
      if (db[i].product_id !== id) continue

      const date = new Date()
      const day = date.getDate()

      db[i].reviews.push({ name, comment, date: `March ${day}, 2023` })

      break
    }
    await this.writeDB(db)
  }

  public async getReviewById(id: number) {
    const db = await this.readDB()

    let review: IReview | null = null

    for (let i = 0; i < db.length; ++i) {
      if (db[i].product_id === id) {
        review = db[i]

        break
      }
    }

    if (review === null) {
      throw new Error('Нет оценок')
    } else {
      return review
    }
  }
}

export { Review }
