var express = require('express');
var router = express.Router();

const moviesController = require('../controllers/movies.controller')

router.get('/', function (req, res, next) {
    let context = {

        title: 'Movies Management',
        layout: 'layout'
    }
    return res.render('movies', context);

});

//---------------
/*method: post*/
/*
request: {tenphim
        daodien
        theloai
        nhaphathanh
        khoichieu -- date
        ketthuc -- date
        thoiluong -- time (hours)
        ngonngu
        rated
        nsx -- date
    } 
response: {code,msg}
*/
router.post('/', moviesController.add)

//---------------
/*method: put*/
/*
request: {
        IDPhim
        tenphim
        daodien
        theloai
        nhaphathanh
        khoichieu -- date
        ketthuc -- date
        thoiluong -- time (hours)
        ngonngu
        rated
        nsx -- date
    } 
response: {code,msg}
*/
router.put('/', moviesController.modify)

//----------------
/*method: delete*/
/*
request: {
        IDPhim
    } 
response: {code,msg}
*/
router.delete('/', moviesController.delete)

//-------------
/*method: get*/
/*
request: none 
response: {code,msg}
*/
router.get('/', moviesController.getMovies)

//--------------
/*method: get -- Lưu ý: yêu cầu giá trị sau link VD: http://localhost:3000/movies/2 --*/
/*
request: none 
response: {code,msg}
*/
router.get('/:id', moviesController.getMovie)

module.exports = router;
