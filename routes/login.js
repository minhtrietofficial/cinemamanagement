var express = require('express');
var router = express.Router();

const moviesController = require('../controllers/movies.controller')

router.get('/', function (req, res, next) {
    let context = {

        title: 'Login',
        layout: 'layout1'
    }
    return res.render('login', context);

});
module.exports = router;