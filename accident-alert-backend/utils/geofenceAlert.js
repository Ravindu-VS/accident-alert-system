const admin = require("firebase-admin");
const db = admin.firestore();
const geofenceRef = db.collection("geofences");
const alertRef = db.collection("alerts");

const checkGeofenceAlert = async (vehicleLocation) => {
  try {
    const snapshot = await geofenceRef.get();
    const geofences = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    geofences.forEach((geofence) => {
      const distance = calculateDistance(
        vehicleLocation.latitude,
        vehicleLocation.longitude,
        geofence.latitude,
        geofence.longitude
      );

      if (distance <= geofence.radius) {
        sendAlert(vehicleLocation, geofence);
      }const { initializeFirebase } = require('../firebaseConfig');

      const admin = initializeFirebase();
      const db = admin.firestore();
      const geofenceRef = db.collection("geofences");
      const alertRef = db.collection("alerts");
      
      const checkGeofenceAlert = async (vehicleLocation) => {
        try {
          const snapshot = await geofenceRef.get();
          const geofences = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          
          // Check if vehicle is in any geofence
          for (const geofence of geofences) {
            const distance = calculateDistance(
              vehicleLocation.latitude,
              vehicleLocation.longitude,
              geofence.latitude,
              geofence.longitude
            );
      
            if (distance <= geofence.radius) {
              await createAlert(vehicleLocation, geofence);
            }
          }
        } catch (error) {
          console.error('Error checking geofence:', error);
          throw error;
        }
      };
      
      // Helper function to calculate distance between two points
      const calculateDistance = (lat1, lon1, lat2, lon2) => {
        const R = 6371e3; // Earth's radius in meters
        const φ1 = lat1 * Math.PI / 180;
        const φ2 = lat2 * Math.PI / 180;
        const Δφ = (lat2 - lat1) * Math.PI / 180;
        const Δλ = (lon2 - lon1) * Math.PI / 180;
      
        const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
                Math.cos(φ1) * Math.cos(φ2) *
                Math.sin(Δλ/2) * Math.sin(Δλ/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
      
        return R * c; // Distance in meters
      };
      
      const createAlert = async (vehicleLocation, geofence) => {
        try {
          await alertRef.add({
            vehicleLocation,
            geofence,
            timestamp: admin.firestore.FieldValue.serverTimestamp(),
            message: "Vehicle entered high-risk zone"
          });
        } catch (error) {
          console.error('Error creating alert:', error);
          throw error;
        }
      };
      
      module.exports = { checkGeofenceAlert };
    });
  } catch (error) {
    console.error("Error checking geofence alert:", error);
  }
};

const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371e3; // metres
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = R * c; // in metres
  return distance;
};

const sendAlert = async (vehicleLocation, geofence) => {
  try {
    await alertRef.add({
      message: "This is a high-risk area, slow down and drive safely.",
      vehicleLocation,
      geofence,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    });

    console.log("Alert sent for vehicle at:", vehicleLocation);
  } catch (error) {
    console.error("Error sending alert:", error);
  }
};

module.exports = { checkGeofenceAlert };
