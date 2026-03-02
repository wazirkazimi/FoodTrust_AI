const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// routes imports (to be implemented)
const authRoutes = require('./routes/auth');
const scanRoutes = require('./routes/scan');
const searchRoutes = require('./routes/search');
const reportRoutes = require('./routes/report');
const userRoutes = require('./routes/user');

app.use('/api/auth', authRoutes);
app.use('/api/scan', scanRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/report', reportRoutes);
app.use('/api/user', userRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error(err));
