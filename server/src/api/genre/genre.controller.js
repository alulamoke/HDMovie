const Genre = require('../../models/genre.model');

module.exports = {
  createGenre: async (req, res, next) => {
    try {
      const genre = await Genre.create(req.body);
      return res.status(201).send(genre);
    } catch (error) {
      next(error);
    }
  },
  getGenres: async (_, res, next) => {
    try {
      const genres = await Genre.find().sort([['name', 'asc']]);
      return res.send(genres);
    } catch (error) {
      next(error);
    }
  },
  deleteGenre: async (req, res, next) => {
    try {
      const genre = await Genre.findByIdAndDelete(req.params.id);
      return res.send(genre);
    } catch (error) {
      next(error);
    }
  },
};
