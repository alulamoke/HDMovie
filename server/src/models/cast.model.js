const mongoose = require('mongoose');

const castSchema = new mongoose.Schema({
  fullname: { type: String, required: true },
  imageurl: { type: String, default: '/uploads/cast/no-img.png' },
  birthday: { type: Date, required: true },
  deathday: { type: Date },
  biography: { type: String, required: true },
  homepage: [
    {
      name: String,
      account: String,
    },
  ],
});

castSchema.methods.toJSON = function () {
  const cast = this;
  const castObject = cast.toObject();
  delete castObject.__v;
  return castObject;
};

module.exports = Person = mongoose.model('Cast', castSchema);
