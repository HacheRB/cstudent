const router = require('express').Router()

const userController = require('../controllers/users.controller')
const middleware = require('../utils/middleware');

router.get('/', middleware.authUser, userController.getAllUsers) //Admin auth?
router.get('/:id', userController.getUserById)

router.get('/:id/courses', () => { })
router.get('/:id/courses/completed', () => { })
router.get('/:id/courses/favorites', () => { })
router.get('/:id/courses/progress', () => { })
router.get('/:id/courses/:course_id', () => { })

router.post('/:id/courses', () => { }) //Create course in user

router.put('/me', middleware.authUser, userController.updateUser)
router.put('/me/password', middleware.authUser, userController.updatePassword)
router.put('/:id/courses/course_id', () => { }) //

router.delete('/me', middleware.authUser, userController.deleteUserById)
router.delete('/:id/courses/:course_id', () => { }) //

module.exports = router
