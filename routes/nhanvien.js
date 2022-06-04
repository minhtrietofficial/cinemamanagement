var express = require('express');
var router = express.Router();

const nhanvienController = require('../controllers/nhanvien.controller')

router.get('/', nhanvienController.homePage)

router.get('/:IDPhim', nhanvienController.updatePage)

router.get('/add', nhanvienController.addPage)

module.exports = router;
