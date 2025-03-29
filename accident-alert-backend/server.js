require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { initializeFirebase } = require('./firebaseConfig');

try {
  // Initialize Firebase and get admin instance
  const admin = initializeFirebase();
  const db = admin.firestore();
  const geofenceRef = db.collection("geofences");
  const alertRef = db.collection("alerts");

  const app = express();
  app.use(cors());
  app.use(bodyParser.json());

  // Import routes
  const authRoutes = require("./routes/auth");
  const geofenceRoutes = require("./routes/geofence");
  const accidentRoutes = require("./routes/accident");
  const userRoutes = require("./routes/userRoutes");
  const autoSuggestRoutes = require("./routes/autoSuggestRoutes");
  const reportRoutes = require("./routes/reportRoutes");

  // Apply routes
  app.use("/api/auth", authRoutes);
  app.use("/api/geofence", geofenceRoutes);
  app.use("/api/accident", accidentRoutes);
  app.use("/api", userRoutes);
  app.use("/api/auto-suggest", autoSuggestRoutes);
  app.use("/api/reports", reportRoutes);

  // Vehicle location endpoint
  app.post("/api/vehicle-location", async (req, res) => {
    const { latitude, longitude } = req.body;

    if (!latitude || !longitude) {
      return res.status(400).json({ error: "Latitude and longitude are required" });
    }

    try {
      const { checkGeofenceAlert } = require("./utils/geofenceAlert");
      await checkGeofenceAlert({ latitude, longitude });
      res.status(200).json({ message: "Location received and processed" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Health Check Route
  app.get("/", (req, res) => {
    res.send("🚀 Accident Alert API is Running!");
  });

  // Start Server
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });

} catch (error) {
  console.error('❌ Server initialization error:', error);
  process.exit(1);
}