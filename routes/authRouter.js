const express = require('express')
const {
  loginStaffMember,
  getUser,
  signinCustomer,
  signupCustomer,
  getCustomer,
} = require('../controllers/authController')
const {
  authUserMiddleware,
  authCustomerMiddleware,
} = require('../middlewares/authMiddleware')
const authRouter = express.Router()

authRouter.route('/').post(loginStaffMember).get(authUserMiddleware, getUser)
authRouter
  .route('/customer/')
  .post(signinCustomer)
  .get(authCustomerMiddleware, getCustomer)
authRouter.route('/customer/signup').post(signupCustomer)

module.exports = authRouter
