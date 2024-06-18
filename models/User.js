const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  displayName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  photoURL: { type: String, required: true  },
  phoneNumber: { type: String, required: true  },
  country: { type: String, required: true },
  address: { type: String, required: true },
  state: { type: String, required: true  },
  city: { type: String, required: true  },
  zipCode: { type: String, required: true  },
  about: { type: String, required: true  },
  role: { type: String, default: 'user' },
  isPublic: { type: Boolean, default: true }
});

module.exports = mongoose.model('User', userSchema);

// const mongoose = require('mongoose');

// const UserSchema = new mongoose.Schema({
//   username: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   password: {
//     type: String,
//     required: true,
//   },
// });

// module.exports = mongoose.model('User', UserSchema);
