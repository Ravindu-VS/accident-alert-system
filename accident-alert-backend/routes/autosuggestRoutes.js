const express = require('express');
const router = express.Router();
const { initializeFirebase } = require('../firebaseConfig');

const admin = initializeFirebase();
const db = admin.firestore();

// Get auto-suggestions based on search query
router.get('/search', async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) {
      return res.status(400).json({ error: 'Search query is required' });
    }

    // Example: Search in a 'locations' collection
    const snapshot = await db.collection('locations')
      .where('name', '>=', query)
      .where('name', '<=', query + '\uf8ff')
      .limit(5)
      .get();

    const suggestions = [];
    snapshot.forEach(doc => {
      suggestions.push({ id: doc.id, ...doc.data() });
    });

    res.json(suggestions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;