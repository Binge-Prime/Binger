const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    validate:{
        notEmpty: true,  
    }
  }
  ,
  category: {
    type: Sequelize.STRING
  },
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue : 1
  },
  price: {
    // prints out price in money format ex: user inputs 15.2  outputs 15.20
    type: Sequelize.DECIMAL(10, 2)  
  },
  description: {
    type: Sequelize.STRING
  },
  ImgUrl: {
    type: Sequelize.STRING
  },
  review:{
    type: Sequelize.STRING
  },
  avgRating:{
    type: Sequelize.INTEGER
  },
  timesPurchased:{
    type: Sequelize.INTEGER
  }, 
  isAddedToCart:{
      type: Sequelize.BOOLEAN,
      defaultValue: false
  }
})
module.exports = Product;