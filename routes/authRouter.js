const express = require('express')
const { loginStaffMember, getMe } = require('../controllers/authController')
const authMiddleware = require('../middlewares/authMiddleware')
const authRouter = express.Router()

authRouter.route('/').post(loginStaffMember).get(authMiddleware, getMe)

module.exports = authRouter
