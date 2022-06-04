var express = require('express');
var router = express.Router();

const path = require('path')
const fs = require('fs')
const multer = require('multer')
const accountRouter = require('./account')
const moviesRouter = require('./movies')
const scheduleRouter = require('./schedule')
const nhanvienRouter = require('./nhanvien')
const userRouter = require('./user')
const ticketRouter = require('./ticket')

let fileStorageEngine = multer.diskStorage({
  destination: (req,file,callback) => {
    callback(null, path.join(__dirname,"../public/images"));
  },
  filename: (req,file,callback) => {
    callback(null, 'new.png');
  }
})

const upload = multer({storage: fileStorageEngine})

function routes(app){

  app.post('/upload', upload.single('image'), (req,res)=>{
      console.log(req.body.id)
      fs.rename(path.join(__dirname,'../public/images/new.png'), path.join(__dirname,`../public/images/${req.body.id}.png`), () => {
      console.log("\nFile Renamed!\n");
      })
      res.send(JSON.stringify({code: 200}))
  }
  )

  app.use('/login', (req,res) => {
    res.render('login')
  })

  app.use('/signup', (req,res) => {
    res.render('signup')
  })

  app.use('/account', accountRouter)

  app.use((req,res,next) => {
    if(!req.session.email){
      return res.redirect('/login')
    }
    else{
      next()
    }
  })

  app.use('/ticket', ticketRouter)

  app.use('/nhanvien', nhanvienRouter)

  app.use('/movies', moviesRouter)
  
  app.use('/schedule', scheduleRouter)

  app.use('/user', userRouter)

  app.use('/logout', (req,res) => {
    req.session.destroy()
    return res.redirect('/login')
  })
}
module.exports = routes;
