const express = require('express');
const jwt = require('jsonwebtoken');

const User = require('../models/userAuth');
const auth = require('../middlewares/auth');

const { body, validationResult } = require('express-validator'); // It is middleware use to validate the data eg (email,mobile no. etc)
const router = new express.Router();

router.post('/signup', [
  body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 chars long'),
  body('username').custom(value => {
    return User.findOne({ username: value }).then(user => {
      if (user) {
        return Promise.reject(`Username '${value}' is not available.`)
      }
    })
  })
], async (req, res) => {
  console.log("signup hits")
  const errors = validationResult(req);
  try {
    if (!errors.isEmpty()) {
      throw new Error();
    }
    const { username, password } = req.body;

    const user = await User({ username, password });
    await user.save();
    token = await user.generateAuthToken();

    res.status(201).send({ user, token });

  } catch (e) {
    console.log("errors", e)
    res.status(400).send(errors);
  }
});

router.post('/login', async (req, res) => {
  console.log("login hits")
  try {
    const user = await User.findByCredentials(req.body.username.toString(), req.body.password.toString());
    const token = await user.generateAuthToken()

    res.status(200).send({ user, token })
  } catch (e) {
    console.log("errors", e)
    res.status(401).send({ Error: "Unable to Login" });
  }
});

router.get('/logout', auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    })
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send()
  }
})

router.get('/user', auth, async (req, res) => {
  try {
    const user = req.user;
    res.status(200).send({ user })
  } catch (e) {
    console.log("errors", e)
    res.status(400).send({ Error: "Unable to get info" });
  }
})

module.exports = router