'use strict';

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

// MongoDB URL
const mongoURL = "mongodb://127.0.0.1:27017/nscodeDB";

// Connect to MongoDB
mongoose.connect(mongoURL)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((error) => console.error("❌ MongoDB connection error:", error));

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Import Routes
const userRoutes = require('./routes/userRoutes');
app.use('/api', userRoutes);

// Health Check
app.get('/', (req, res) => {
  res.json({ status: 200, message: "Server is running" });
});

app.get('/health', (req, res) => {
  res.json({ status: 200, message: "APIs are healthy and running" });
});

// Start server
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
