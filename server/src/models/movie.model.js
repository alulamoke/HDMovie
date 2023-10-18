const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema(
  {
    type: { type: String, enum: ['Single', 'Series'], required: true },
    title: { type: String, required: true },
    tagline: { type: String },
    poster_path: { type: String, required: true },
    overview: { type: String, required: true },
    trailer: { type: String },
    video: { type: String },
    seasons: [
      {
        name: { type: String, required: true },
        video: [{ type: String }],
      },
    ],
    genres: [
      { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Genre' },
    ],
    cast: [
      { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Cast' },
    ],
    spoken_languages: [{ type: String, required: true }],
    director: { type: String, required: true },
    runtime: { type: Number },
    release_date: { type: Date, required: true },
    views_count: { type: Number, default: 0 },
    trailer_views_count: { type: Number, default: 0 },
    vote_average: { type: Number, default: 0, min: 0, max: 5 },
    user_rate: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'User',
        },
        value: { type: Number, required: true },
      },
    ],
    reviews: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'User',
        },
        review: { type: String, required: true },
        createdAt: { type: Date, required: true },
      },
    ],
    likes: [
      { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    ],
    watch_later: [
      { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    ],
  },
  { timestamps: true }
);

movieSchema.index({ title: 'text', tagline: 'text' });

movieSchema.methods.toJSON = function () {
  const movie = this;
  const movieObject = movie.toObject();
  delete movieObject.updatedAt;
  delete movieObject.__v;
  return movieObject;
};

module.exports = Movie = mongoose.model('Movie', movieSchema);
