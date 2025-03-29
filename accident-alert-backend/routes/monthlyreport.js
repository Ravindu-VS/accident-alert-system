const express = require("express");
const router = express.Router();
const admin = require("firebase-admin");

const db = admin.firestore();
const accidentRef = db.collection("accidents");
const geofenceRef = db.collection("geofences");

// Generate Monthly Report and Suggest New Geofences
router.get("/monthly-report", async (req, res) => {
  try {
    // Fetch accidents for the past month
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    const snapshot = await accidentRef
      .where("timestamp", ">=", oneMonthAgo.toISOString())
      .get();

    // Analyze accident data to find clusters of accidents
    const accidents = snapshot.docs.map((doc) => doc.data());

    // Example: Find frequent accident locations based on severity and frequency
    const suggestedGeofences = analyzeAccidents(accidents);

    // Send suggested geofences as response
    res.status(200).json({ message: "Monthly report generated", suggestions: suggestedGeofences });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Function to analyze accidents and suggest new geofences
const analyzeAccidents = (accidents) => {
  // Placeholder logic: Group accidents by location and severity
  const geofences = [];

  const accidentCounts = accidents.reduce((acc, accident) => {
    const location = accident.location;
    const severity = accident.severity;

    if (!acc[location]) acc[location] = { count: 0, severity: 0 };
    acc[location].count += 1;
    acc[location].severity += severity === "High" ? 2 : severity === "Medium" ? 1 : 0;

    return acc;
  }, {});

  // Suggest new geofences for locations with frequent accidents
  Object.keys(accidentCounts).forEach((location) => {
    const { count, severity } = accidentCounts[location];
    if (count >= 5 && severity >= 3) {
      geofences.push({
        name: `High Risk Area: ${location}`,
        latitude: accidents[0].latitude,  // Using first accident's latitude
        longitude: accidents[0].longitude, // Using first accident's longitude
        radius: 500,  // Example radius, can be adjusted
      });
    }
  });

  return geofences;
};

module.exports = router;
