const express = require('express');
const router = new express.Router();

const auth = require('../../middlewares/auth');
const genreController = require('./genre.controller');

router
  .route('/')
  .post(auth('admin'), genreController.createGenre)
  .get(genreController.getGenres);
router.delete('/:id', auth('admin'), genreController.deleteGenre);

module.exports = router;
