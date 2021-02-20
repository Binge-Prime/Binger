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
    type: Sequelize.DECIMAL(10, 2)  
  },
  description: {
    type: Sequelize.STRING,
    defaultValue: ''
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
      type: Sequelize.BOOLEAN
  }
})
module.exports = Product;