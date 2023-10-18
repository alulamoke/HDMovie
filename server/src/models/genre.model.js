const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },
});

genreSchema.methods.toJSON = function () {
  const genre = this;
  const genreObject = genre.toObject();
  delete genreObject.__v;
  return genreObject;
};

module.exports = Genre = mongoose.model('Genre', genreSchema);
