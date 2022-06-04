var express = require('express');
var router = express.Router();
const accountRouter = require('./account')
const moviesRouter = require('./movies')
const scheduleRouter = require('./schedule')
const nhanvienRouter = require('./nhanvien')

function routes(app){

  app.use('/login', (req,res) => {
    res.render('login')
  })

  app.use('/signup', (req,res) => {
    res.render('signup')
  })

  app.use('/nhanvien', nhanvienRouter)

  app.use('/account', accountRouter)

  app.use('/movies', moviesRouter)
  
  app.use('/schedule', scheduleRouter)

  app.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
  });

}
module.exports = routes;
