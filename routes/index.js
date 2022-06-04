var express = require('express');
var router = express.Router();
const accountRouter = require('./account')
const moviesRouter = require('./movies')
const scheduleRouter = require('./schedule')
const nhanvienRouter = require('./nhanvien')
const userRouter = require('./user')
const ticketRouter = require('./ticket')

function routes(app){

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
