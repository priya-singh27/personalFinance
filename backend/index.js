const express = require('express');
const app = express();
require("dotenv").config();
const cors = require('cors');


const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors({
  origin: [
    "https://expenses.priyasinghdev.com",
    "http://localhost:5173",
    "https://www.priyasinghdev.com",
    "https://priyasinghdev.com",
    "https://personalexpense-chi.vercel.app"
  ],
  credentials: true
}));
app.use(
  express.urlencoded({
    extended: true,
  })
);

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Backend is running' });
});

// Database connection
require('./db_config').checkConnection();

// Routes
const user = require('./routes/user');
const expense = require('./routes/expense');

app.use('/user', user);
app.use('/expense', expense);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
