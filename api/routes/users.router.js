const router = require('express').Router()
const userController = require('../controllers/users.controller')
const middleware = require('../utils/middleware');

router.get('/', middleware.authUser, middleware.isAdmin, userController.getAllUsers)
router.get('/me', middleware.authUser, userController.getUserProfile)
router.get('/me/courses', () => { })
router.get('/:userName', userController.getUserByUserName)
router.get('/:username/courses', () => { })

router.post('/me/courses', () => { }) //Create course in user

router.put('/me', middleware.authUser, userController.updateUser)
router.put('/me/password', middleware.authUser, userController.updatePassword)
router.put('/me/courses/course_id', () => { }) //

router.delete('/me', middleware.authUser, userController.deleteUserById)
router.delete('/me/courses/:course_id', () => { }) //

module.exports = router
