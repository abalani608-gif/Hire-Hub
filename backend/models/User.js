const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
  company: { type: String },
  headline: { type: String },
  about: { type: String },
  skills: { type: String },
  createdAt: { type: Date, default: Date.now }
});

// To return 'id' instead of '_id' for frontend compatibility
UserSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  }
});

module.exports = mongoose.model('User', UserSchema);
