const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db'); 

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(cors(   ));
app.use(express.json());

// Import routes
const authRoutes = require('./routes/auth');
const jobRoutes = require('./routes/jobs');
const applicationRoutes = require('./routes/applications');

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/applications', applicationRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
