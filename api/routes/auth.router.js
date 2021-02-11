const router = require('express').Router()
const authController = require('../controllers/auth.controller')
const middleware = require('../utils/middleware')

router.post('/register', authController.register)
router.post('/login', authController.login)

module.exports = router
