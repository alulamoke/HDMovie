const express = require('express');
const router = new express.Router();

const auth = require('../../middlewares/auth');
const { upload } = require('../../middlewares/multer');
const movieController = require('./movie.controller');

//
// ADMIN
//
//creating movies and info
router.post(
  '/',
  auth('admin'),
  upload('images').single('poster_path'),
  movieController.createMovie
);
router.put(
  '/:id',
  auth('admin'),
  upload('images').single('poster_path'),
  movieController.updateMovieInfo
);
router.put('/updateTrailer/:id', auth('admin'), movieController.updateTrailer);
router.put('/updateVideo/:id', auth('admin'), movieController.updateVideo);
router.put(
  '/updateSeriesMovie/:id',
  auth('admin'),
  movieController.updateSeriesMovie
);
router.get('/admin', auth('admin'), movieController.getMoviesForAdmin);
router.get('/:id/admin', auth('admin'), movieController.getMovieInfoForAdmin);
router.delete('/:id', auth('admin'), movieController.deleteMovie);

//
// USER
//
// getting movie info
router.get('/', auth(), movieController.getMoviesByParams);
router.get('/discover/:name', auth(), movieController.getMovieByDiscover);
router.get('/search', movieController.getMoviesBySearch);
router.get('/:id', auth(), movieController.getMovieById);
router.get(
  '/:id/recommendations',
  auth(),
  movieController.getMovieRecommendations
);

// movie actions
router.post('/:id/like', auth(), movieController.likeMovie);
router.patch(
  '/clearFavoriteMovies',
  auth(),
  movieController.clearFavoriteMovies
);
router.post('/:id/watchLater', auth(), movieController.watchLater);
router.patch(
  '/clearWatchLaterMovies',
  auth(),
  movieController.clearWatchLaterMovies
);
router.post('/:id/rateMovie', auth(), movieController.rateMovie);
router.post('/:id/addReview', auth(), movieController.addReview);
router.delete(
  '/:movieId/:reviewId',
  auth(),
  movieController.deleteSpecificReview
);

// playing movie or tv show
router.get('/:id/playMovieContent', movieController.playMovieContent);
router.get('/:id/playSeriesContent', movieController.playSeriesContent);

module.exports = router;
