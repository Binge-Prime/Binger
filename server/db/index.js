//this is the access point for all things database related!

const db = require('./db')

const User = require('./models/user');
// const Cart = require('./models/cart');
const Orders = require('./models/order');
const Product = require('./models/product');
const Reviews = require('./models/review');
//associations could go here!
// User.hasMany(Orders)
// User.hasMany(Reviews)
// //---
// // Cart.belongsTo(User)
// Cart.hasMany(Product)
// //---
// //does order belong to cart or user??
// Orders.belongsTo(Cart)
// //---
// Product.hasMany(Reviews)

const syncAndSeed =  async()=> {
  await db.sync({force: true})
  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'})
    
  ])

  const products = await Promise.all([
    Product.create({ name: 'milk', price: 3, category: 'dairy', quantity: 10, description: 'milk', ImgUrl: 'http://cdn.shopify.com/s/files/1/0071/5826/7994/products/19064664101_800x.jpg?v=1564927226'}),
    Product.create({ name: 'tesla', price: 30000, category: 'car', quantity: 10, description: 'model 3', ImgUrl: 'https://i1.wp.com/eastwest.thegadgetman.org.uk/wp-content/uploads/2017/07/tesla256.png?fit=256%2C256&ssl=1'}),
    Product.create({ name: 'doge', price: 1, category: 'crypto', quantity: 10, description: 'moon', ImgUrl: 'https://i.pinimg.com/originals/b7/26/7a/b7267aef163f639140791606f0bcdfd6.png' })
  ])

  const [cody, murphy] = users;
  const [milk, tesla, doge] = products;

  return {
    users: {
      cody,
      murphy
    },
    products:{
      milk
    }
  };
}

module.exports = {
  db,
  syncAndSeed,
  models: {
    User,
    Product
  }
}
