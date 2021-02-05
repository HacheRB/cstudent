const router = require('express').Router()
const userController = require('../controllers/users.controller')
const middleware = require('../utils/middleware');

router.get('/', middleware.authUser, middleware.isAdmin, userController.getAllUsers)
router.get('/me', middleware.authUser, userController.getUserProfile)
router.get('/:userName', userController.getUserByUserName)

router.post('/me/courses', middleware.authUser, userController.addCourseProgress) //Create course in user

router.put('/me', middleware.authUser, userController.updateUser)
router.put('/me/courses/:id/favorite', middleware.authUser, userController.updateCourseFavorite)
router.put('/me/password', middleware.authUser, userController.updatePassword)

router.delete('/me', middleware.authUser, userController.deleteUserById)
router.delete('/me/courses/:id', middleware.authUser, userController.deleteUserCourseById)


module.exports = router

//add daily, edit daily routes ?
