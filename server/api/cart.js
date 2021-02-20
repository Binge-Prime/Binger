const router = require('express').Router()
// exported product models to find their id 
const { models: { Cart, Order, Product, User }} = require('../db')
module.exports = router

router.get('/:id', async (req, res, next) => {
    try {
      const cart = await Cart.findOne({
          where:{
              userId:req.params.id,
              isOpen:true
          },
          include: [{
            model: Order,
            include: [ Product ]
          }]
      })
      res.send(cart)
    } catch (err) {
      next(err)
    }
})
  
router.post('/:id', async (req, res, next) => {
  try {
    let cart = await Cart.findOne({
        where:{
            userId:req.params.id
        }
    })

    if(!cart){
      cart = await Cart.create({
          userId: req.params.id,
          isOpen: true
      })
    } else if (!cart.isOpen) {
      await cart.update({ isOpen: true })
    }

    let newOrder = await Order.create({
      productId: req.body.productId,
      cartId: cart.id,
      userId: cart.userId
    })

    const order = await Order.findOne({
      where: {
        id: newOrder.id
      },
      include: [ Product ]
    })

    res.send(order).status(201);
  } catch (err) {
    next(err)
  }
})

router.put('/clear/:id', async (req, res, next) => {
  try{
    let cart = await Cart.findOne({
      where:{
          userId:req.params.id,
          isOpen:true
        },
        include: [ Order ]
    })

    // Updates product in stock quantity based on order
    cart.orders.forEach( async(order) => {
      const product = await Product.findByPk(order.productId)
      // Subtracts order quantity from quantity in stock
      await product.update({ quantity: product.quantity - order.quantity })
    })

    await cart.destroy();
    
    const newCart = await Cart.create({
      userId: req.params.id,
      isOpen: false,
    })

    cart = await Cart.findOne({
      where: {
        id: newCart.id
      },
      include: [ Order ]
    })

    res.send(cart);

  }
  catch(ex){
    next(ex)
  }
})
  
router.put('/delete/:id', async(req,res,next) => {
  try{
    const order = await Order.findOne({
      where: {
        id: req.params.id
      }
    })

    await order.destroy();
    
    res.send(order)
    }
  catch(error){
      next(error)
  }
})

router.put('/open/:id', async(req, res, next) => {
  try {
    const cart = await Cart.findOne({
      where: {
        userId: req.params.id
      },
      include: [ Order ]
    })
    
    await cart.update({ isOpen: true })

    res.send(cart)
  }
  catch(error) {
    next(error)
  }
})

router.put('/update/:id', async(req, res, next) => {
  try {
    const order = await Order.findOne({
      where: {
        id: req.params.id
      },
      include: [ Product ]
    })
  
    await order.update({ quantity: req.body.quantity*1 })
  
    res.send(order)
  }
  catch(error) {
    next(error)
  }
})