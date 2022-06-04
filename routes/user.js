var express = require('express');
var router = express.Router();

const userController = require('../controllers/user.controller')


router.get('/ghelichchieu/:IDLichChieu', userController.gheLichChieuPage)

router.get('/lichchieu/:IDPhim', userController.lichchieuPage)

router.get('/history', userController.historyPage)

router.get('/:IDPhim', userController.movieInfoPage)

router.get('/', userController.homePage)

module.exports = router;
