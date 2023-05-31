import { resolve } from 'path'

const rootPath = __dirname
const pagesPath = resolve(rootPath, '..', 'pages')
const usersDBPath = resolve(rootPath, '..', 'DB', 'users.json')
const productsPath = resolve(rootPath, '..', 'DB', 'products.json')
const reviewPath = resolve(rootPath, '..', 'DB', 'reviews.json')
const cardPath = resolve(rootPath, '..', 'DB', 'card.json')
const favoritePath = resolve(rootPath, '..', 'DB', 'favorite.json')
const adminPath = resolve(rootPath, '..', 'DB', 'admin.json')
const profilesPath = resolve(rootPath, '..', 'DB', 'profiles.json')
const ordersPath = resolve(rootPath, '..', 'DB', 'orders.json')

export {
  pagesPath,
  usersDBPath,
  productsPath,
  reviewPath,
  cardPath,
  favoritePath,
  adminPath,
  profilesPath,
  ordersPath
}
