const express = require('express');
const router = new express.Router();

const auth = require('../../middlewares/auth');
const joimiddleware = require('../../middlewares/joi');
const { admin_rule } = require('./admin.schema');
const adminController = require('./admin.controller');

router.post(
  '/signup',
  joimiddleware(admin_rule.signup),
  adminController.signup
);
router.post('/login', joimiddleware(admin_rule.login), adminController.login);
router.get('/me', auth('admin'), adminController.getLoggedInAdminInfo);
router.get('/users', auth('admin'), adminController.getUsers);
router.post('/logout', auth('admin'), adminController.logout);
router.post('/logoutAll', auth('admin'), adminController.logoutAll);

module.exports = router;
