const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Job = require('./models/Job');
const connectDB = require('./config/db');

const mockJobs = [
  {
    title: "Senior React Developer",
    company: "TechNova Solutions",
    location: "Bangalore, India",
    salary: "₹18,00,000 - ₹24,00,000/yr",
    jobType: "Full-time",
    workMode: "Remote",
    experience: "3-5 years",
    skills: ["React.js", "Redux", "TypeScript", "Tailwind CSS"],
    description: "We are looking for an experienced React developer to lead our frontend team in building scalable enterprise applications.",
    responsibilities: [
      "Lead the development of new user-facing features",
      "Build reusable code and libraries for future use",
      "Optimize application for maximum speed and scalability"
    ],
    requirements: [
      "Strong proficiency in JavaScript, including DOM manipulation",
      "Thorough understanding of React.js and its core principles",
      "Experience with popular React.js workflows (such as Flux or Redux)"
    ]
  },
  {
    title: "Frontend Engineering Intern",
    company: "CreativeApp",
    location: "Mumbai, India",
    salary: "₹20,000/month",
    jobType: "Internship",
    workMode: "Hybrid",
    experience: "Fresher",
    skills: ["HTML", "CSS", "JavaScript", "React"],
    description: "Kickstart your career with CreativeApp! We are looking for an enthusiastic intern to join our design-driven engineering team.",
    responsibilities: [
      "Assist in developing UI components",
      "Participate in code reviews",
      "Write clean, maintainable code"
    ],
    requirements: [
      "Basic understanding of web markup, including HTML5, CSS3",
      "Currently pursuing a degree in Computer Science or related field",
      "Familiarity with code versioning tools like Git"
    ]
  },
  {
    title: "Full Stack Web Developer",
    company: "GlobalNet",
    location: "Pune, India",
    salary: "₹12,00,000 - ₹16,00,000/yr",
    jobType: "Full-time",
    workMode: "On-site",
    experience: "2-4 years",
    skills: ["Node.js", "Express", "React", "MongoDB"],
    description: "GlobalNet is seeking a Full Stack Developer who is comfortable with both front and back end programming.",
    responsibilities: [
      "Developing front end website architecture",
      "Designing user interactions on web pages",
      "Developing back-end website applications"
    ],
    requirements: [
      "Degree in Computer Science",
      "Strong organizational and project management skills",
      "Proficiency with fundamental front-end languages"
    ]
  }
];

const seedDB = async () => {
  await connectDB();
  
  try {
    // Clear existing
    await User.deleteMany();
    await Job.deleteMany();

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash('password123', salt);

    // Create Seeker
    await User.create({
      name: 'Aditya Balani',
      email: 'aditya@example.com',
      password: hash,
      role: 'seeker',
      headline: 'Frontend Developer | React Enthusiast'
    });
    console.log("Created demo seeker account: aditya@example.com / password123");

    // Create Recruiter
    const recruiter = await User.create({
      name: 'Admin Recruiter',
      email: 'admin@recruiter.com',
      password: hash,
      role: 'recruiter',
      company: 'Vercado Inc'
    });
    console.log("Created demo recruiter account: admin@recruiter.com / password123");

    // Create Jobs
    const jobsToInsert = mockJobs.map(job => ({
      ...job,
      recruiter_id: recruiter._id
    }));

    await Job.insertMany(jobsToInsert);
    console.log('Database successfully seeded with MongoDB!');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedDB();
