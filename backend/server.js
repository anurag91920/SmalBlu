require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const businessRoutes = require('./routes/business');

const app = express();



// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL, // Vercel frontend URL from .env
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/business', businessRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/business-profile', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

app.get('/', (req, res) => {
  res.send('Server is running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
