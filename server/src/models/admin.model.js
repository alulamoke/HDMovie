const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

var adminSchema = new mongoose.Schema(
  {
    fullname: { type: String, required: true },
    email: { type: String, lowercase: true, unique: true, required: true },
    imageurl: { type: String, default: '/uploads/no-img.png' },
    password: { type: String, required: true },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

adminSchema.methods.toJSON = function () {
  const admin = this;
  const adminObject = admin.toObject();
  delete adminObject.password;
  delete adminObject.tokens;
  delete adminObject.updatedAt;
  delete adminObject.__v;

  return adminObject;
};

adminSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

adminSchema.statics.findByCredentials = async function (email, password) {
  const user = await this.findOne({ email });
  if (!user) {
    throw new Error("email doesn't exist");
  }
  const isPasswordMatch = bcrypt.compareSync(password, user.password);
  if (!isPasswordMatch) {
    throw new Error("email and password doesn't match");
  }
  return user;
};

adminSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = bcrypt.hashSync(user.password, 8);
  }
  next();
});

module.exports = mongoose.model('Admin', adminSchema);
