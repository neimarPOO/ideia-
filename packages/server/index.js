require('dotenv').config();
require('./config/firebase');
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const ideasRoutes = require('./routes/ideas');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());
app.use('/auth', authRoutes);
app.use('/ideas', ideasRoutes);

app.get('/', (req, res) => {
  res.send('Backend is running!');
});

app.listen(port, () => {
  console.log(`Backend server listening at http://localhost:${port}`);
});