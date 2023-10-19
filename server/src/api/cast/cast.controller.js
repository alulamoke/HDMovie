const Cast = require('../../models/cast.model');

module.exports = {
  createCast: async (req, res, next) => {
    try {
      if (!req.file)
        return res.status(400).send({ message: 'please upload a imageurl.' });
      const newCast = new Cast({
        fullname: req.body.fullname,
        imageurl: `${req.file.destination.replace('.', '')}${
          req.file.filename
        }`,
        birthday: req.body.birthday,
        deathday: req.body.deathday,
        biography: req.body.biography,
      });
      await newCast.save(newCast);
      return res.status(201).send(newCast);
    } catch (error) {
      next(error);
    }
  },
  getCasts: async (_, res, next) => {
    try {
      const casts = await Cast.find();
      return res.send(casts);
    } catch (error) {
      next(error);
    }
  },
  getCastInfo: async (req, res, next) => {
    try {
      const cast = await Cast.findById(req.params.id);
      return res.send(cast);
    } catch (error) {
      next(error);
    }
  },
  updateCast: async (req, res, next) => {
    try {
      const cast = await Cast.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { strict: true }
      );
      return res.send(cast);
    } catch (error) {
      next(error);
    }
  },
  deleteCast: async (req, res, next) => {
    try {
      const cast = await Cast.findByIdAndDelete(req.params.id);
      return res.send(cast);
    } catch (error) {
      next(error);
    }
  },
};
