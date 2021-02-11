const router = require('express').Router()
const udemyController = require('../controllers/udemy.controller')
const middleware = require('../utils/middleware');

router.get('/', middleware.authUser, middleware.isAdmin, udemyController.getAllUdemyCourses)
router.get('/:courseId', udemyController.getUdemyCourseByCourseId)

router.post('/', udemyController.addUdemyCourse)

router.put('/:courseId', udemyController.updateUdemyCourseByCourseId)

router.delete('/:courseId', middleware.authUser, middleware.isAdmin, udemyController.deleteUdemyCourseById)

module.exports = router
