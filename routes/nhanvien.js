var express = require('express');
var router = express.Router();

const nhanvienController = require('../controllers/nhanvien.controller')

router.get('/add', nhanvienController.addPage)
router.get('/', nhanvienController.homePage)

router.get('/:IDPhim', nhanvienController.updatePage)


module.exports = router;
