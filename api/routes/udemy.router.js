const router = require('express').Router()
const udemyController = require('../controllers/udemy.controller')
const middleware = require('../utils/middleware');

//Maybe add a route to filter courses

router.get('/', middleware.authUser, middleware.isAdmin, udemyController.getAllCourses)

router.get('/:course_id', udemyController.getCourseById)

router.post('/', udemyController.addCourse)

router.put('/:course_id', udemyController.updateCourseById)

router.delete('/:course_id', middleware.authUser, middleware.isAdmin, udemyController.deleteCourseById)

module.exports = router
