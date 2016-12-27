
const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  google: {
    id: String,
    token: String,
  }
});

// UserSchema.methods.generateHash = function(password) {
//   return bcrypt.hashSync(password, bcrypt.genSaltSyn(10), null);
// };
//
// UserSchema.methods.validPassword = function(password) {
//   return bcrypt.compareSync(password, this.local.password);
// };
//



const User = mongoose.model('User', userSchema);
module.exports = {User};
