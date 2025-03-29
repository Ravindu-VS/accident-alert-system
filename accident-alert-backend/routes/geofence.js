const express = require("express");
const router = express.Router();
const admin = require("firebase-admin");

const db = admin.firestore();
const geofenceRef = db.collection("geofences");

// Add a new geofence
router.post("/", async (req, res) => {
    try {
      const { name, latitude, longitude, radius } = req.body;

      // Validate input to ensure no undefined values
      if (!name || latitude === undefined || longitude === undefined || radius === undefined) {
        return res.status(400).json({ error: "All fields are required" });
      }

      const newGeofence = await geofenceRef.add({
        name,
        latitude,
        longitude,
        radius
      });

      res.status(201).json({ message: "Geofence added", id: newGeofence.id });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
});

// Get all geofences
router.get("/", async (req, res) => {
  try {
    const snapshot = await geofenceRef.get();
    const geofences = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(geofences);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Edit an existing geofence
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, latitude, longitude, radius } = req.body;

    // Validate input
    if (!name || latitude === undefined || longitude === undefined || radius === undefined) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const geofence = await geofenceRef.doc(id).get();
    if (!geofence.exists) {
      return res.status(404).json({ error: "Geofence not found" });
    }

    await geofenceRef.doc(id).update({
      name,
      latitude,
      longitude,
      radius,
    });

    res.status(200).json({ message: "Geofence updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a geofence
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const geofence = await geofenceRef.doc(id).get();
    if (!geofence.exists) {
      return res.status(404).json({ error: "Geofence not found" });
    }

    await geofenceRef.doc(id).delete();
    res.status(200).json({ message: "Geofence deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;