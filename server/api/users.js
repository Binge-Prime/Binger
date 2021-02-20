const router = require('express').Router()
const { models: { User }} = require('../db')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    res.send(await User.findByPk(req.params.id));
  } 
  catch (err) {
    next(err)
  }
})

router.put('/update/:id',async(req,res,next)=>{
  try {
    const user = await User.findByPk(req.params.id)
    res.send(await user.update(req.body))
  }
  catch(error) {
    next(error)
  }
})

router.post('/create',async(req,res,next)=>{
  try {
    const newUser = await User.create(req.body)
    res.status(201).send(newUser)
  }
  catch(error) {
    next(error)
  }
})

router.delete('/delete/:id',async(req,res,next)=>{
  try{
      const user = await User.findByPk(req.params.id)
      await user.destroy()
      res.send(user)
  }
  catch(error){
      next(error)
  }
})