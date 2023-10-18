const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema(
  {
    fullname: { type: String, required: true },
    username: { type: String, unique: true, required: true },
    email: { type: String, lowercase: true, unique: true, required: true },
    imageurl: { type: String, default: '/uploads/no-img.png' },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    plan: {
      type: String,
      enum: ['Free Trail', 'Starter', 'Premium'],
      default: 'Free Trail',
      required: true,
    },
    paymentStatus: {
      amount: { type: String, default: '0.0', required: true },
      status: {
        type: String,
        enum: ['PAID', 'NOT-PAID'],
        default: 'NOT-PAID',
        required: true,
      },
      duration: {
        type: Date,
        default: new Date().setDate(new Date().getDate() + 30),
        required: true,
      },
    },
    status: {
      type: String,
      enum: ['Active', 'Inactive'],
      default: 'Active',
      required: true,
    },
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

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();
  delete userObject.password;
  delete userObject.tokens;
  delete userObject.updatedAt;
  delete userObject.__v;
  return userObject;
};

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

userSchema.statics.findByToken = function (token, cb) {
  const user = this;

  jwt.verify(token, process.env.JWT_SECRET, function (_, decode) {
    user.findOne({ _id: decode._id, token: token }, function (err, user) {
      if (err) return cb(err);
      cb(null, user);
    });
  });
};

userSchema.statics.findByCredentials = async function (username, password) {
  const user = await this.findOne({ username });
  if (!user) {
    throw new Error("username doesn't exist.");
  }
  if (user.status === 'Active') {
    const isPasswordMatch = bcrypt.compareSync(password, user.password);
    if (!isPasswordMatch) {
      throw new Error("username and password doesn't match.");
    }
    return user;
  } else {
    throw new Error('you are suspended, contact the service number.');
  }
};

userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = bcrypt.hashSync(user.password, 8);
  }
  next();
});

module.exports = User = mongoose.model('User', userSchema);
