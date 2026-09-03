const express = require('express');
const router = express.Router();
const Job = require('../models/Job');
const User = require('../models/User');
const auth = require('../middleware/auth');

// @route   GET api/jobs
// @desc    Get all jobs
// @access  Public
router.get('/', async (req, res) => {
  try {
    // Populate the recruiter to get company name if we didn't store it on Job
    // Wait, we stored company on Job schema, but it's good to sort by date
    const jobs = await Job.find().sort({ posted_date: -1 });
    res.json(jobs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/jobs
// @desc    Create a job
// @access  Private (Recruiter only)
router.post('/', auth, async (req, res) => {
  if (req.user.role !== 'recruiter') {
    return res.status(403).json({ message: 'Only recruiters can post jobs' });
  }

  const { title, location, salary, jobType, workMode, experience, description, responsibilities, requirements, skills } = req.body;

  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(500).json({ message: 'Error finding user' });

    const newJob = new Job({
      title,
      company: user.company,
      location,
      salary,
      jobType,
      workMode,
      experience,
      description,
      responsibilities: responsibilities || [],
      requirements: requirements || [],
      skills: skills || [],
      recruiter_id: req.user.id
    });

    const job = await newJob.save();
    res.json({ id: job.id, message: 'Job posted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/jobs/:id
// @desc    Delete a job
// @access  Private (Recruiter only)
router.delete('/:id', auth, async (req, res) => {
  if (req.user.role !== 'recruiter') {
    return res.status(403).json({ message: 'Not authorized' });
  }

  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: 'Job not found' });
    
    if (job.recruiter_id.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized to delete this job' });
    }

    await Job.findByIdAndDelete(req.params.id);
    res.json({ message: 'Job removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
