//this is the access point for all things database related!

const db = require('./db')

const User = require('./models/user');
const Cart = require('./models/cart');
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
    Product.create({name: 'milk', price: 4, category: 'diary', quantity: 10, descripton: 'milk'})
  ])

  const [cody, murphy] = users;
  const [milk] = products;
  
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
