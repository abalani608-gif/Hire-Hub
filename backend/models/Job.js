const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String },
  salary: { type: String },
  jobType: { type: String },
  workMode: { type: String },
  experience: { type: String },
  description: { type: String },
  responsibilities: { type: [String] },
  requirements: { type: [String] },
  skills: { type: [String] },
  recruiter_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  posted_date: { type: Date, default: Date.now }
});

JobSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  }
});

module.exports = mongoose.model('Job', JobSchema);
