const router = require('express').Router()
const { models: { Product, Review }} = require('../db')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll()
    res.json(products)
  } 
  catch (err) {
    next(err)
  }
})


router.get('/:id', async (req, res, next) => {
  try {
    res.send(await Product.findAll({

      where:{
          id:req.params.id
      }
  }));
  } 
  catch (err) {
    next(err)
  }
})


// router.get('/:id', async (req, res, next) => {
//   try {
//       res.send(await Product.findByPk(req.params.id));
//   } 
//   catch (err) {
//     next(err)
//   }
// })

router.put('/update/:id',async(req,res,next)=>{
  try {
    const product = await Product.findByPk(req.params.id)
    res.send(await product.update(req.body))
  }
  catch(error) {
    next(error)
  }
})

router.post('/create',async(req,res,next)=>{
  try {
    const newProduct = await Product.create(req.body)
    res.status(201).send(newProduct)
  }
  catch(error) {
    next(error)
  }
})

router.delete('/delete/:id',async(req,res,next)=>{
  try{
      const product = await Product.findByPk(req.params.id)
      await product.destroy()
      res.send(product)
  }
  catch(error){
      next(error)
  }
})