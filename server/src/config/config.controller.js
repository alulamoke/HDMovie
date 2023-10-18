const express = require('express');
const router = new express.Router();

router.get('/', (req, res, next) => {
  let staticCategories;
  switch (req.query.type) {
    case 'admin':
      staticCategories = [
        'dashboard',
        'casts',
        'genres',
        'movies',
        'users',
        'account',
      ];
      break;
    case 'user':
      staticCategories = [
        'Popular',
        'Top Rated',
        'Upcoming',
        'My Favorite',
        'Watch Later',
      ];
      break;
    default:
      staticCategories = [];
      break;
  }
  try {
    return res.send({
      staticCategories,
      base_url: `${req.protocol}://${req.get('host')}/api/v1`,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
