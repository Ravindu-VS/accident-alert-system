const express = require('express');
const router = express.Router();
const { initializeFirebase } = require('../firebaseConfig');

// Get the existing Firebase instance
const admin = initializeFirebase();
const db = admin.firestore();
const accidentsRef = db.collection("accidents");

// Rest of your code remains the same...

// Report a new accident
router.post('/report', async (req, res) => {
  try {
    const { latitude, longitude, description, timestamp } = req.body;

    // Validate input
    if (!latitude || !longitude || !description || !timestamp) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newAccident = await accidentsRef.add({
      latitude,
      longitude,
      description,
      timestamp,
    });

    res.status(201).json({ message: "Accident reported", id: newAccident.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all accidents
router.get('/', async (req, res) => {
  try {
    const snapshot = await accidentsRef.get();
    const accidents = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(accidents);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;