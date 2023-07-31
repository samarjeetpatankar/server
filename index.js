const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const blogRoutes = require('./routes/blogRoutes');
const config = require('./config');
const cors = require('cors');

// Create Express app
const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB using Mongoose
mongoose.connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.error('Error connecting to MongoDB:', error));

// Start the server
const port = 8399;

app.use('/auth', authRoutes);
app.use('/blogs', blogRoutes);

app.listen(port, () => console.log(`Server running on port ${port}`));
 
