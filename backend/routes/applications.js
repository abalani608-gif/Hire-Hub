const express = require('express');
const router = express.Router();
const Application = require('../models/Application');
const Job = require('../models/Job');
const auth = require('../middleware/auth');

// @route   POST api/applications/:jobId
// @desc    Apply for a job
// @access  Private (Seeker only)
router.post('/:jobId', auth, async (req, res) => {
  if (req.user.role !== 'seeker') {
    return res.status(403).json({ message: 'Only job seekers can apply' });
  }

  try {
    const existingApplication = await Application.findOne({
      job_id: req.params.jobId,
      seeker_id: req.user.id
    });

    if (existingApplication) {
      return res.status(400).json({ message: 'You have already applied for this job' });
    }

    const newApplication = new Application({
      job_id: req.params.jobId,
      seeker_id: req.user.id
    });

    await newApplication.save();
    res.json({ id: newApplication.id, message: 'Application submitted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/applications/me
// @desc    Get seeker's applications
// @access  Private (Seeker only)
router.get('/me', auth, async (req, res) => {
  if (req.user.role !== 'seeker') {
    return res.status(403).json({ message: 'Not authorized' });
  }

  try {
    const applications = await Application.find({ seeker_id: req.user.id })
      .populate('job_id', 'title company')
      .sort({ applied_date: -1 });

    const formattedApps = applications.map(app => ({
      id: app.id,
      jobId: app.job_id._id,
      jobTitle: app.job_id.title,
      company: app.job_id.company,
      appliedDate: app.applied_date,
      status: app.status
    }));

    res.json(formattedApps);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/applications/recruiter
// @desc    Get applications for recruiter's jobs
// @access  Private (Recruiter only)
router.get('/recruiter', auth, async (req, res) => {
  if (req.user.role !== 'recruiter') {
    return res.status(403).json({ message: 'Not authorized' });
  }

  try {
    // 1. Find all jobs posted by this recruiter
    const recruiterJobs = await Job.find({ recruiter_id: req.user.id }).select('_id title');
    const jobIds = recruiterJobs.map(job => job._id);

    // 2. Find applications for these jobs
    const applications = await Application.find({ job_id: { $in: jobIds } })
      .populate('job_id', 'title')
      .populate('seeker_id', 'email name')
      .sort({ applied_date: -1 });

    const formattedApps = applications.map(app => ({
      id: app.id,
      jobId: app.job_id._id,
      jobTitle: app.job_id.title,
      candidateEmail: app.seeker_id ? app.seeker_id.email : 'Unknown',
      candidateName: app.seeker_id ? app.seeker_id.name : 'Unknown',
      appliedDate: app.applied_date,
      status: app.status,
      candidateId: app.seeker_id ? app.seeker_id._id : null
    }));

    res.json(formattedApps);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/applications/:id
// @desc    Update application status
// @access  Private (Recruiter only)
router.put('/:id', auth, async (req, res) => {
  if (req.user.role !== 'recruiter') {
    return res.status(403).json({ message: 'Not authorized' });
  }

  try {
    await Application.findByIdAndUpdate(req.params.id, { status: req.body.status });
    res.json({ message: 'Status updated' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
