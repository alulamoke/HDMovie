import path from 'path';
import fs from 'fs';
import axios from 'axios';

const User = require('../../models/user.model');
const { upload } = require('../../middlewares/multer');

module.exports = {
  pay: async (req, res, next) => {
    const data = {
      currency: 'ETB',
      amount: req.body.amount,
      email: req.body.email,
      first_name: req.body.name,
      last_name: '',
      tx_ref: Date.now().toString(),
      callback_url: `${process.env.PAYMENT_CALLBACK_URL}/${TEXT_REF}`,
      return_url: req.body.RETURN_URL,
    };

    try {
      const response = await axios.post(
        `${process.env.CHAPPA_URL}/v1/transaction/initialize`,
        data,
        { headers: { Authorization: `Bearer ${process.env.CHAPPA_KEY}` } }
      );
      return res.send(response.data);
    } catch (error) {
      next(error);
    }
  },
  verifyPayment: async (req, res, next) => {
    try {
      const response = await axios.get(
        `${process.env.CHAPPA_URL}/v1/transaction/verify/${req.params.id}`,
        { headers: { Authorization: `Bearer ${process.env.CHAPPA_KEY}` } }
      );
      return res.send(response.data);
    } catch (error) {
      next(error);
    }
  },
  signup: async (req, res, next) => {
    try {
      const user = await User.findOne({ username: req.body.username });
      if (user)
        return res.status(400).send({ message: 'username already taken.' });
      const newUser = new User(req.body);
      await newUser.save();
      return res.status(201).send({ message: 'Register success, login now.' });
    } catch (error) {
      next(error);
    }
  },
  login: async (req, res, next) => {
    try {
      const currentUser = await User.findByCredentials(
        req.body.username,
        req.body.password
      );
      const token = await currentUser.generateAuthToken();
      return res.send({ currentUser, token });
    } catch (error) {
      next(error);
    }
  },
  getLoggedInUserInfo: async (req, res, next) => {
    try {
      return res.send({ currentUser: req.user });
    } catch (error) {
      next(error);
    }
  },
  uploadImage: async (req, res, next) => {
    try {
      if (!req.file) {
        return res.status(400).send({ message: 'please upload a file.' });
      } else {
        if (req.user.imageurl !== '/uploads/users/no-img.png') {
          fs.unlink(
            path.join(__dirname + '../../../../' + req.user.imageurl),
            (err) => {
              if (err) throw err;
            }
          );
        }
        req.user.imageurl = `${req.file.destination.replace('.', '')}${
          req.file.filename
        }`;
        await req.user.save();
        res.send({ imageurl: req.user.imageurl });
      }
    } catch (e) {
      next(e);
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
