const express = require('express');
const router = express.Router();
const admin = require('../config/firebase');

router.post('/register', async (req, res) => {
  const { email, password } = req.body;

  try {
    const userRecord = await admin.auth().createUser({
      email: email,
      password: password,
    });
    res.status(201).send({ message: 'User created successfully', uid: userRecord.uid });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body; // Password is received but not directly used for verification here

  try {
    const userRecord = await admin.auth().getUserByEmail(email);
    // In a real application, you would verify the password here.
    // For Firebase Admin SDK, you'd typically generate a custom token
    // and send it to the client for client-side sign-in.
    // Or, if the client is signing in directly with Firebase client SDK,
    // they would send an ID token to the backend for verification.

    res.status(200).send({ message: 'Login successful', uid: userRecord.uid });
  } catch (error) {
    // Handle specific errors, e.g., user not found
    if (error.code === 'auth/user-not-found') {
      res.status(404).send({ error: 'User not found' });
    } else {
      res.status(400).send({ error: error.message });
    }
  }
});

module.exports = router;
