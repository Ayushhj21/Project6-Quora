const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')
const questionController = require('../controllers/questionController')
const answerController = require('../controllers/answerController')

const middleware = require('../middlewares/authMiddleware')

//-----------------FEATURE I - USER API
//-----------------FIRST API CREATE USER
router.post('/user', userController.userRegistration)
//-----------------SECOND API USER LOGIN
 router.post('/login', userController.userLogin)
// //-----------------THIRD API GET USER DETAILS
 router.get('/user/:userId/profile',middleware.getUserDetails,userController.getUserList)
// //-----------------THIRD API UPDATE USER DETAILS
 router.put('/user/:userId/profile',middleware.getUserDetails,userController.updateUser)

// //-----------------FEATURE II - Question API

router.post('/question',middleware.getUserDetails,questionController.createQuestion)
router.get('/question',questionController.getQuestions)
 router.get('/questions/:questionId',questionController.getQuestionById)
// //-----------------FOURTH API UPDATE PRODUCT DETAIL
// router.put('/products/:productId',productController.updateProduct)


router.post('/answer',middleware.getUserDetails,answerController.createAnswer)


// //-----------------FIFTH API DELETE PRODUCT FROM DB
// router.delete('/products/:productId',productController.deleteProduct)


// router.post('/users/:userId',myMiddleware.getUserDetails,cartController.createCartProduct)

// //-----------------THIRD API GET CART DETAIL

// router.put('/users/:userId/cart',myMiddleware.getUserDetails,cartController.updateCart)
// router.get('/users/:userId/cart',myMiddleware.getUserDetails,cartController.getCartList)

// router.delete('/users/:userId/cart',myMiddleware.getUserDetails,cartController.deleteCart)


// router.post('/users/:userId/orders',myMiddleware.getUserDetails,orderController.createOrder)

// router.put('/users/:userId/orders',myMiddleware.getUserDetails,orderController.updateOrder)




//---------------------------GENERATE S3 URL----------------------------//
//router.post('/write-file-aws',awsController.userAws)

module.exports = router;