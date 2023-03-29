const express = require('express')
const branchRouter = express.Router()
const {
  registerBranch,
  getBranches,
  getBranch,
  getBranchMenuitems,
  getBranchUsingSlug,
} = require('../controllers/branchController')
const {
  authUserMiddleware,
  parseCustomerMiddleware,
} = require('../middlewares/authMiddleware')
const positionCheckMiddleware = require('../middlewares/positionCheckMiddleware')

branchRouter
  .route('/')
  .post(authUserMiddleware, registerBranch)
  .get(getBranches)

branchRouter.route('/menu/:id').get(getBranchMenuitems)
branchRouter
  .route('/slug/:slug')
  .get(parseCustomerMiddleware, getBranchUsingSlug)
branchRouter.route('/:id').get(getBranch)

module.exports = branchRouter
