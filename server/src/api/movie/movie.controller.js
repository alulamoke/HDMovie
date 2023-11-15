const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');

const Movie = require('../../models/movie.model');
const { upload } = require('../../middlewares/multer');
const { dataFilters } = require('../../utils/filters');
const { getAll } = require('./utils');

module.exports = {
  //
  // ADMIN
  //
  //adding new movie
  createMovie: async (req, res, next) => {
    try {
      if (!req.file)
        return res
          .status(400)
          .send({ message: 'please upload a poster_path.' });
      const newMovie = new Movie({
        type: req.body.type,
        title: req.body.title,
        tagline: req.body.tagline,
        poster_path: `${req.file.destination.replace('.', '')}${
          req.file.filename
        }`,
        overview: req.body.overview,
        genres: req.body.genres,
        cast: req.body.cast,
        spoken_languages: req.body.spoken_languages,
        director: req.body.director,
        runtime: req.body.runtime,
        release_date: req.body.release_date,
      });
      await newMovie.save();
      return res.send(newMovie);
    } catch (error) {
      next(error);
    }
  },
  updateMovieInfo: async (req, res, next) => {
    try {
      const movie = await Movie.findById(req.params.id);
      if (!movie) return res.status(400).send({ message: 'movie not found.' });
      if (req.file) {
        const contentPath = path.join(
          __dirname + '../../../../' + movie.poster_path
        );
        if (contentPath)
          fs.unlink(contentPath, (err) => {
            if (err) throw err;
          });
        req.body.poster_path = `${req.file.destination.replace('.', '')}${
          req.file.filename
        }`;
      }
      await movie.update(req.body);
      return res.send(movie);
    } catch (error) {
      next(error);
    }
  },
  updateTrailer: async (req, res, next) => {
    try {
      const movie = await Movie.findById(req.params.id);
      if (!movie) return res.status(404).send({ message: 'movie not found.' });
      upload(`trailers/${movie.title}`).single('trailer')(
        req,
        res,
        async (err) => {
          if (err) {
            next(err);
          } else if (!req.file) {
            return res
              .status(400)
              .send({ message: 'please upload a trailer.' });
          } else {
            if (movie.trailer) {
              const contentPath = path.join(
                __dirname + '../../../../' + movie.trailer
              );
              if (contentPath)
                fs.unlink(contentPath, (err) => {
                  if (err) throw err;
                });
            }
            movie.trailer = `${req.file.destination.replace('.', '')}${
              req.file.filename
            }`;
            await movie.save();
            return res.send(movie);
          }
        }
      );
    } catch (error) {
      next(error);
    }
  },
  updateVideo: async (req, res, next) => {
    try {
      const movie = await Movie.findById(req.params.id);
      if (!movie) return res.status(404).send({ message: 'movie not found.' });
      upload(`movies/${movie.title}`).single('video')(req, res, async (err) => {
        if (err) {
          next(err);
        } else if (!req.file) {
          return res.status(400).send({ message: 'please upload a video.' });
        } else {
          if (movie.video) {
            const contentPath = path.join(
              __dirname + '../../../../' + movie.video
            );
            if (contentPath)
              fs.unlink(contentPath, (err) => {
                if (err) throw err;
              });
          }
          movie.video = `${req.file.destination.replace('.', '')}${
            req.file.filename
          }`;
          await movie.save();
          return res.send(movie);
        }
      });
    } catch (error) {
      next(error);
    }
  },
  updateSeriesMovie: async (req, res, next) => {
    try {
      const movie = await Movie.findById(req.params.id);
      if (!movie) return res.status(404).send({ message: 'movie not found.' });
      if (movie.type === 'Series') {
        upload(`/series/${movie.title}`).array('video')(
          req,
          res,
          async (err) => {
            if (err) {
              next(err);
            } else if (!req.files) {
              return res
                .status(400)
                .send({ message: 'please upload a content.' });
            } else {
              movie.seasons.push({
                name: req.body.name,
                video: req.files.map(
                  (el) => `${el.destination.replace('.', '')}${el.filename}`
                ),
              });
              await movie.save();
              return res.send(movie);
            }
          }
        );
      }
    } catch (error) {
      next(error);
    }
  },
  getMoviesForAdmin: async (req, res, next) => {
    const [value, fac] = req.query.sort_by.split('.');
    try {
      const sort = [[value, fac]];
      const include = 'type trailer video seasons likes';
      return res.send(await getAll(req, {}, sort, include));
    } catch (error) {
      next(error);
    }
  },
  getMovieInfoForAdmin: async (req, res, next) => {
    try {
      const movie = await Movie.findById(req.params.id)
        .populate('genres', '-__v')
        .populate('cast', '_id fullname');
      if (!movie) return res.status(404).send({ message: 'movie not found.' });
      return res.send(movie);
    } catch (error) {
      next(error);
    }
  },
  deleteMovie: async (req, res, next) => {
    try {
      const movie = await Movie.findByIdAndDelete(req.params.id);
      if (movie.poster_path) {
        fs.unlink(
          path.join(__dirname + '../../../../' + movie.poster_path),
          (err) => {
            if (err) throw err;
          }
        );
      }
      if (movie.trailer) {
        fs.unlink(
          path.join(__dirname + '../../../../' + movie.trailer),
          (err) => {
            if (err) throw err;
          }
        );
      }
      if (movie.video) {
        fs.unlink(
          path.join(__dirname + '../../../../' + movie.video),
          (err) => {
            if (err) throw err;
          }
        );
      }
      if (movie.seasons) {
        movie.seasons.map((season) => {
          return season.video.map((el) => {
            if (el) {
              fs.unlink(path.join(__dirname + '../../../../' + el), (err) => {
                if (err) throw err;
              });
            }
          });
        });
      }
      return res.send(movie);
    } catch (error) {
      next(error);
    }
  },

  //
  // USER
  //
  // getting movie info
  getMoviesByParams: async (req, res, next) => {
    const genreId = req.query.with_genres
      ? new mongoose.mongo.ObjectId(req.query.with_genres)
      : null;
    const castId = req.query.with_cast
      ? new mongoose.mongo.ObjectId(req.query.with_cast)
      : null;
    const [value, fac] = req.query.sort_by.split('.');

    try {
      const data = { $or: [{ genres: genreId }, { cast: castId }] };
      const sort = [[value, fac]];
      return res.send(await getAll(req, data, sort));
    } catch (error) {
      next(error);
    }
  },
  getMovieByDiscover: async (req, res, next) => {
    let data,
      sort = {};

    try {
      switch (req.params.name) {
        case 'popular':
          sort.views_count = -1;
          break;
        case 'top_rated':
          data = { ...data, vote_average: { $gt: 4.25 } };
          break;
        case 'upcoming':
          data = {
            ...data,
            release_date: { $gt: Date.now() },
          };
          break;
        case 'my_favorite':
          data = {
            ...data,
            likes: { $in: req.user._id },
          };
          break;
        case 'watch_later':
          data = {
            ...data,
            watch_later: { $in: req.user._id },
          };
          break;
        default:
          break;
      }
      return res.send(await getAll(req, data));
    } catch (error) {
      next(error);
    }
  },
  getMoviesBySearch: async (req, res, next) => {
    try {
      const data = { $text: { $search: req.query.q } };
      return res.send(await getAll(req, data));
    } catch (error) {
      next(error);
    }
  },
  getMovieRecommendations: async (req, res, next) => {
    try {
      const movie = await Movie.findById(req.params.id);
      if (!movie) return res.status(404).send({ message: 'movie not found.' });
      const data = {
        type: movie.type,
        genres: { $in: movie.genres },
        cast: { $in: movie.cast },
      };

      let movies = await getAll(req, data);
      movies.data = movies.data.filter(
        (el) => String(el._id) !== String(movie._id)
      );
      return res.send(movies);
    } catch (error) {
      next(error);
    }
  },
  getMovieById: async (req, res, next) => {
    try {
      const movie = await Movie.findById(req.params.id)
        .populate('genres', '-__v')
        .populate('cast', '_id imageurl')
        .populate('reviews.user', '_id fullname imageurl');
      if (!movie) return res.status(404).send({ message: 'movie not found.' });
      const { isMovieLiked, isWatchLater } = dataFilters(req.user._id, movie);
      return res.send({ data: { ...movie._doc, isMovieLiked, isWatchLater } });
    } catch (error) {
      next(error);
    }
  },

  // movie actions
  likeMovie: async (req, res, next) => {
    try {
      const movie = await Movie.findById(req.params.id);
      if (!movie) return res.status(404).send({ message: 'movie not found.' });

      if (movie.likes.includes(req.user._id)) {
        movie.likes = movie.likes.filter(
          (item) => String(item) !== String(req.user._id)
        );
      } else {
        movie.likes.unshift(req.user._id);
      }
      await movie.save();
      return res.send(movie);
    } catch (error) {
      next(error);
    }
  },
  clearFavoriteMovies: async (req, res, next) => {
    try {
      const movies = await Movie.find({ likes: { $in: req.user._id } });
      if (movies.length > 0) {
        await Promise.all(
          movies.map(async (el) => {
            el.likes = el.likes.filter(
              (id) => String(id) !== String(req.user._id)
            );
            return await el.save();
          })
        );
        return res.send({ message: 'favorite movies cleared.' });
      }
      return res.send({ message: "you don't have favorite movie." });
    } catch (error) {
      next(error);
    }
  },
  watchLater: async (req, res, next) => {
    try {
      const movie = await Movie.findById(req.params.id);
      if (!movie) return res.status(404).send({ message: 'movie not found.' });

      if (movie.watch_later.includes(req.user._id)) {
        movie.watch_later = movie.watch_later.filter(
          (item) => String(item) !== String(req.user._id)
        );
      } else {
        movie.watch_later.unshift(req.user._id);
      }
      await movie.save();
      return res.send(movie);
    } catch (error) {
      next(error);
    }
  },
  clearWatchLaterMovies: async (req, res, next) => {
    try {
      const movies = await Movie.find({ watch_later: { $in: req.user._id } });
      if (movies.length > 0) {
        await Promise.all(
          movies.map(async (el) => {
            el.watch_later = el.watch_later.filter(
              (id) => String(id) !== String(req.user._id)
            );
            return await el.save();
          })
        );
        return res.send({ message: 'watch later movies cleared.' });
      }
      return res.send({ message: "you don't have watch later movie." });
    } catch (error) {
      next(error);
    }
  },
  rateMovie: async (req, res, next) => {
    console.log(req.body);
    try {
      const movie = await Movie.findById(req.params.id);
      if (!movie) return res.status(404).send({ message: 'movie not found.' });
      const isUserRateThisMovie = movie.user_rate.find(
        (el) => String(el.user) === String(req.user._id)
      );
      if (isUserRateThisMovie) {
        const prevRate = movie.user_rate.filter(
          (el) => String(el.user) !== String(req.user._id)
        );
        const newRate = [
          ...prevRate,
          { user: req.user._id, value: req.body.value },
        ];
        movie.user_rate = newRate;
      } else {
        movie.user_rate.push({ user: req.user._id, value: req.body.value });
      }
      const total_rate_value = movie.user_rate
        .map((el) => el.value)
        .reduce((a, b) => a + b, 0);
      const total_rate_count = movie.user_rate.length;
      movie.vote_average = total_rate_value / total_rate_count;
      await movie.save();
      return res.send({
        vote_average: movie.vote_average,
        user_rate: movie.user_rate,
      });
    } catch (error) {
      next(error);
    }
  },
  addReview: async (req, res, next) => {
    try {
      const movie = await Movie.findById(req.params.id);
      if (!movie) return res.status(404).send({ message: 'movie not found.' });

      movie.reviews.push({
        user: req.user._id,
        review: req.body.review,
        createdAt: Date.now(),
      });
      await movie.save();

      const newReview = await Movie.findById(movie._id).populate(
        'reviews.user',
        '_id fullname imageurl'
      );
      return res.send(newReview.reviews);
    } catch (error) {
      next(error);
    }
  },
  deleteSpecificReview: async (req, res, next) => {
    try {
      const movie = await Movie.findById(req.params.movieId);
      if (!movie) return res.status(404).send({ message: 'movie not found.' });
      movie.reviews = movie.reviews.filter(
        (el) => String(el._id) !== String(req.params.reviewId)
      );
      await movie.save();
      return res.send(req.params.reviewId);
    } catch (error) {
      next(error);
    }
  },

  // playing movie or tv show
  playMovieContent: async (req, res, next) => {
    let contentPath;
    try {
      const movie = await Movie.findById(req.params.id);
      if (!movie) return res.status(404).send({ message: 'movie not found.' });

      if (req.query.watch === 'trailer') {
        if (movie.trailer) {
          contentPath = path.join(__dirname + '../../../../' + movie.trailer);
        } else {
          return res.status(404).send({ message: 'content not found.' });
        }
      } else {
        if (movie.video) {
          contentPath = path.join(__dirname + '../../../../' + movie.video);
        } else {
          return res.status(404).send({ message: 'content not found.' });
        }
      }
      const stat = fs.statSync(contentPath);
      const fileSize = stat.size;
      const range = req.headers.range;
      if (range) {
        const parts = range.replace(/bytes=/, '').split('-');
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
        const chunksize = end - start + 1;
        const file = fs.createReadStream(contentPath, { start, end });
        const head = {
          'Content-Range': `bytes ${start}-${end}/${fileSize}`,
          'Accept-Ranges': 'bytes',
          'Content-Length': chunksize,
        };
        res.writeHead(206, head);
        file.pipe(res);
      } else {
        const head = {
          'Content-Length': fileSize,
        };
        res.writeHead(200, head);
        fs.createReadStream(contentPath).pipe(res);
      }
    } catch (error) {
      next(error);
    }
  },
  playSeriesContent: async (req, res, next) => {
    try {
      const movie = await Movie.findById(req.params.id);
      if (!movie) return res.status(404).send({ message: 'movie not found.' });
      if (movie.seasons.length === 0)
        return res.status(404).send({ message: 'content not found.' });
      const contentPath = path.join(
        __dirname +
          '../../../../' +
          movie.seasons.find((el) => el.name === req.query.season).video[
            parseInt(req.query.episode) - 1
          ]
      );
      const stat = fs.statSync(contentPath);
      const fileSize = stat.size;
      const range = req.headers.range;
      if (range) {
        const parts = range.replace(/bytes=/, '').split('-');
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
        const chunksize = end - start + 1;
        const file = fs.createReadStream(contentPath, { start, end });
        const head = {
          'Content-Range': `bytes ${start}-${end}/${fileSize}`,
          'Accept-Ranges': 'bytes',
          'Content-Length': chunksize,
        };
        res.writeHead(206, head);
        file.pipe(res);
      } else {
        const head = {
          'Content-Length': fileSize,
        };
        res.writeHead(200, head);
        fs.createReadStream(contentPath).pipe(res);
      }
    } catch (error) {
      next(error);
    }
  },
};
