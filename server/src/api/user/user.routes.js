const express = require('express');
const router = new express.Router();

const auth = require('../../middlewares/auth');
const joimiddleware = require('../../middlewares/joi');
const { user_rule } = require('./user.schema');
const userController = require('./user.controller');
const { upload } = require('../../middlewares/multer');

router.post('/pay', userController.pay);
router.get('/payment/verify/:userId/:TX_Ref', userController.verifyPayment);
router.post('/signup', joimiddleware(user_rule.signup), userController.signup);
router.post('/login', joimiddleware(user_rule.login), userController.login);
router.get('/me', auth(), userController.getLoggedInUserInfo);
router.put(
  '/photo',
  auth(),
  upload('/users').single('photo'),
  userController.uploadImage
);
router.post('/logout', auth(), userController.logout);
router.post('/logoutAll', auth(), userController.logoutAll);

module.exports = router;
