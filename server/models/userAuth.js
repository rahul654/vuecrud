const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  tokens: [{
    token: {
      type: String,
      required: true
    }
  }]
});

//Removing password and token from user data
userSchema.methods.toJSON = function () {
  const user = this
  const userObject = user.toObject()

  delete userObject.password;
  delete userObject.tokens;
  delete userObject.adminTokens;
  delete userObject.resetLink;

  return userObject
}

//Creating token for maintaining user session
userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, process.env.TOKEN);

  if (user.tokens.length > 5) {
    user.tokens.shift()
    await user.save()
  }

  user.tokens = user.tokens.concat({ token });
  await user.save();

  return token;
}

//Checking credentials of user before login
userSchema.statics.findByCredentials = async (username, password) => {
  let user;
  user = await User.findOne({ username: username });

  if (!user) {
    throw new Error('Unable to login');
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error('Unable to login');
  }

  return user
}

// Plain password is hashed before saving
userSchema.pre('save', async function (next) {
  const user = this;

  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next()

});

const User = mongoose.model('User', userSchema);

module.exports = User