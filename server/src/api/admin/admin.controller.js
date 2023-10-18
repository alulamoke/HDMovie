const Admin = require('../../models/admin.model');
const User = require('../../models/user.model');

module.exports = {
  signup: async (req, res, next) => {
    try {
      const user = await Admin.findOne({ email: req.body.email });
      if (user)
        return res.status(400).send({ message: 'email already taken.' });
      const newAdmin = new Admin(req.body);
      await newAdmin.save();
      res.status(201).send({ message: 'Register success, login now.' });
    } catch (error) {
      next(error);
    }
  },
  login: async (req, res, next) => {
    try {
      const currentUser = await Admin.findByCredentials(
        req.body.email,
        req.body.password
      );
      const token = await currentUser.generateAuthToken();
      return res.send({ currentUser, token });
    } catch (error) {
      next(error);
    }
  },
  getLoggedInAdminInfo: async (req, res, next) => {
    try {
      return res.send({ currentUser: req.user });
    } catch (error) {
      next(error);
    }
  },
  getUsers: async (_, res, next) => {
    try {
      const users = await User.find();
      return res.send({ data: users });
    } catch (error) {
      next(error);
    }
  },
  logout: async (req, res, next) => {
    try {
      req.user.tokens = req.user.tokens.filter(
        (token) => token.token !== req.token
      );
      await req.user.save();
      res.send({ message: 'signed out successfully.' });
    } catch (error) {
      next(error);
    }
  },
  logoutAll: async (req, res, next) => {
    try {
      req.user.tokens = [];
      await req.user.save();
      res.send({ message: 'signed out successfully in all devices.' });
    } catch (error) {
      next(error);
    }
  },
};
