const express = require('express');
const router = new express.Router();

const auth = require('../../middlewares/auth');
const { upload } = require('../../middlewares/multer');
const castController = require('./cast.controller');

router.post(
  '/',
  auth('admin'),
  upload('casts').single('imageurl'),
  castController.createCast
);

router.get('/', auth('admin'), castController.getCasts);
router.get('/:id', auth(), castController.getCastInfo);
router.put('/:id', auth('admin'), castController.updateCast);
router.delete('/:id', auth('admin'), castController.deleteCast);

module.exports = router;
