var express = require('express');
var router = express.Router();

const userController = require('../controllers/user.controller')

router.use((req,res,next)=>{
    if(req.session.role == 1){
        res.redirect('/nhanvien')
    }
    else{
        next()
    }
})

router.get('/thongtinve', userController.thongtinve)

router.get('/history', userController.history)

router.get('/checkout', userController.checkout)

router.get('/ghelichchieu/:IDLichChieu', userController.gheLichChieuPage)

router.get('/lichchieu/:IDPhim', userController.lichchieuPage)

router.get('/:IDPhim', userController.movieInfoPage)

router.get('/', userController.homePage)

module.exports = router;
