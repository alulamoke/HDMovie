const Movie = require('../../models/movie.model');

// common function
module.exports.getAll = async (req, data, sort, include) => {
  const page = req.query.page ? parseInt(req.query.page) : 1;
  const limit = req.query.limit || 15;
  const startIndex = (page - 1) * limit;
  const select = ' _id title poster_path user_rate vote_average ';

  try {
    const total_pages =
      Math.ceil((await Movie.find(data).countDocuments()) / limit) || 1;

    const movies = await Movie.find(data)
      .limit(limit)
      .skip(startIndex)
      .sort(sort)
      .select(select.concat(include));

    return { data: movies, total_pages, page };
  } catch (err) {
    throw err;
  }
};
