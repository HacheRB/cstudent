const router = require('express').Router()
const udemyAPIController = require('../controllers/udemyAPI.controller')
const middleware = require('../utils/middleware');

//Maybe add a route to filter courses

router.get('/', middleware.authUser, udemyAPIController.getUdemyCoursesBySearchString)
router.get('/:id')

module.exports = router
