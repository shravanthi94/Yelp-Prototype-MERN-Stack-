const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  image: { type: String },
  phone: { type: String },
  about: {
    dob: {
      type: Date,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    country: {
      type: String,
    },
    nickname: {
      type: String,
    },
    thingsILove: {
      type: String,
    },
    findMeIn: {
      type: String,
    },
    myBlog: {
      type: String,
    },
    notYelping: {
      type: String,
    },
    whyMyReviews: {
      type: String,
    },
    discovery: {
      type: String,
    },
  },
  reviews: [
    {
      restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'restaurant',
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      text: {
        type: String,
        required: true,
      },
      date: {
        type: String,
        required: true,
      },
    },
  ],
  date: { type: Date, default: Date.now() },
});

const User = mongoose.model('user', UserSchema);
module.exports = User;
