const jwt = require('jsonwebtoken');

//User models
const Admin = require('../models/admin.model');
const User = require('../models/user.model');

const auth = (role = 'user') => {
  return async (req, res, next) => {
    let token;
    if (req.headers.authorization) {
      token = req.headers.authorization.split('Bearer ')[1];
    } else {
      return res.status(401).send({ message: 'Unauthorized' });
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      let user;
      if (role == 'admin') {
        user = await Admin.findById(decoded._id);
      } else {
        user = await User.findById(decoded._id);
      }
      if (!user) throw new Error();
      req.token = token;
      req.user = user;
      req.user.role = role;
      next();
    } catch (_) {
      return res.status(400).send({ message: 'Token is not valid' });
    }
  };
};

module.exports = auth;
