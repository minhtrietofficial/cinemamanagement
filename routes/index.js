var express = require('express');
var router = express.Router();
const accountRouter = require('./account')
const moviesRouter = require('./movies')

function routes(app){

  app.use('/account', accountRouter)

  app.use('/movies', moviesRouter)
  
  app.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
  });

}
module.exports = routes;
