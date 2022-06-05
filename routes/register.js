var express = require('express');

var router = express.Router();


router.get('/', function (req, res, next) {
    let context = {

        title: 'Register',
        layout: 'layout1'
    }
    return res.render('register', context);

});
module.exports = router;