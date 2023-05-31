import fs from 'fs/promises'

interface IUser {
  login: string
  pass: string
}

class DB {
  private usersDBPath: string

  constructor(usersDBPath: string) {
    this.usersDBPath = usersDBPath
  }

  private async readDB(dbPath: string) {
    const str = await fs.readFile(dbPath, 'utf8')

    return await JSON.parse(str)
  }

  private checkUser(login: string, users: IUser[]) {
    let status = true

    for (let i = 0; i < users.length; ++i) {
      if (users[i].login == login) {
        status = false
        break
      }
    }

    return status
  }

  public async isUserExists(login: string, pass: string) {
    const users: IUser[] = await this.readDB(this.usersDBPath)

    let status = false

    for (let i = 0; i < users.length; ++i) {
      if (users[i].login === login) {
        if (users[i].pass == pass) {
          status = true
        }

        break
      }
    }

    return status
  }

  public async addNewUser(login: string, pass: string) {
    const users: IUser[] = await this.readDB(this.usersDBPath)

    const isTheSame = this.checkUser(login, users)

    if (!isTheSame) throw new Error('That user already exists')

    // add user
    users.push({ login, pass })
    await fs.writeFile(this.usersDBPath, JSON.stringify(users))

    // end add user
  }
}

export { DB }
