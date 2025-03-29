const express = require('express');
const admin = require('firebase-admin');
const router = express.Router();

const db = admin.firestore();
const accidentsRef = db.collection("accidents");

// Generate a monthly report
router.get('/monthly-report', async (req, res) => {
  try {
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    const snapshot = await accidentsRef.where('timestamp', '>=', oneMonthAgo).get();
    const accidents = snapshot.docs.map(doc => doc.data());

    const report = generateReport(accidents);

    res.status(200).json(report);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Function to generate report from accident data
const generateReport = (accidents) => {
  const report = {
    totalAccidents: accidents.length,
    highRiskAreas: [], // Add logic to determine high-risk areas
    accidentDetails: accidents,
  };

  // Example: Determine high-risk areas (this is a placeholder)
  const areaCounts = {};
  accidents.forEach(accident => {
    const key = `${accident.latitude.toFixed(2)},${accident.longitude.toFixed(2)}`;
    if (!areaCounts[key]) {
      areaCounts[key] = 0;
    }
    areaCounts[key]++;
  });

  report.highRiskAreas = Object.entries(areaCounts)
    .filter(([_, count]) => count > 5)
    .map(([location, count]) => ({
      location,
      count,
    }));

  return report;
};

module.exports = router;