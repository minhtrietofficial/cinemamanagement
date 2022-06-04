var express = require('express');
var router = express.Router();

const scheduleController = require('../controllers/schedule.controller')

/*GET "/schedule"*/
router.get('/', scheduleController.getMovieSchedule)

/*POST "/schedule"*/
router.post('/', scheduleController.addSchedule)

module.exports = router;
