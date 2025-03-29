const express = require('express');
const router = express.Router();
const { initializeFirebase } = require('../firebaseConfig');

// Get the existing Firebase instance
const admin = initializeFirebase();
const db = admin.firestore();
// Get all users
router.get('/users', async (req, res) => {
  try {
    const users = [];
    const userRecords = await admin.auth().listUsers();
    userRecords.users.forEach((userRecord) => {
      users.push({
        uid: userRecord.uid,
        email: userRecord.email,
        displayName: userRecord.displayName,
        role: userRecord.customClaims?.role || "user", // If role is set, display it
      });
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a user's details
router.put('/user/:uid', async (req, res) => {
  const { uid } = req.params;
  const { email, displayName, role } = req.body;

  try {
    const userRecord = await admin.auth().updateUser(uid, {
      email,
      displayName,
    });

    // Optionally, you can update custom claims (like role) as well.
    if (role) {
      await admin.auth().setCustomUserClaims(uid, { role });
    }

    res.status(200).json({ message: 'User updated successfully', user: userRecord });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a user
router.delete('/user/:uid', async (req, res) => {
  const { uid } = req.params;

  try {
    await admin.auth().deleteUser(uid);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;