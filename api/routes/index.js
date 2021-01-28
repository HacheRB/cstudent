const router = require('express').Router()
const authRouter = require('./auth.router')
const udemyRouter = require('./udemy.router')
const udemyAPIRouter = require('./udemyAPI.router')
const usersRouter = require('./users.router')
const middleware = require('../utils/middleware');

router.use('/auth', authRouter)
router.use('/users', usersRouter)
router.use('/udemy', udemyRouter)
router.use('/udemyAPI', udemyAPIRouter)

router.get('/whoami', middleware.authUser, (req, res) => {
  res.send(`hi there! ${res.locals.user.userName}`)
})

module.exports = router
