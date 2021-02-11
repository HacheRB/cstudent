const router = require('express').Router()
const udemyAPIController = require('../controllers/udemyAPI.controller')
const middleware = require('../utils/middleware');

router.get('/', middleware.authUser, udemyAPIController.getUdemyCoursesBySearchString2)
router.get('/course', middleware.authUser, udemyAPIController.getUdemyCourseById)

module.exports = router
