module.exports.dataFilters = (userId, movie) => {
  let isMovieLiked = false;
  let isWatchLater = false;

  if (movie.likes.includes(userId)) {
    isMovieLiked = true;
  }
  if (movie.watch_later.includes(userId)) {
    isWatchLater = true;
  }
  return { isMovieLiked, isWatchLater };
};
