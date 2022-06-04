
var express = require('express');
var router = express.Router();

const nhanvienController = require('../controllers/nhanvien.controller')



router.get('/add', nhanvienController.addPage)

router.get('/lichchieu', nhanvienController.lichchieuPage)

router.get('/lichchieu/add', nhanvienController.addLichChieuPage)

router.get('/lichchieu/:IDLichChieu', nhanvienController.lichchieuInfoPage)

router.get('/:IDPhim', nhanvienController.updatePage)

router.get('/', nhanvienController.homePage)

module.exports = router;
