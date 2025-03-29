const express = require("express");
const router = express.Router();
const admin = require("firebase-admin");

// Register a new user
router.post("/register", async (req, res) => {
  const { email, password, name } = req.body;
  try {
    const user = await admin.auth().createUser({
      email,
      password,
      displayName: name,
    });
    res.status(201).json({ message: "User registered successfully", userId: user.uid });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Login user
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const userRecord = await admin.auth().getUserByEmail(email);
    const customToken = await admin.auth().createCustomToken(userRecord.uid);
    res.status(200).json({ token: customToken, userId: userRecord.uid });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Password Reset Route
router.post("/reset-password", async (req, res) => {
  const { email } = req.body;

  try {
    // Send password reset email
    await admin.auth().sendPasswordResetEmail(email);
    res.status(200).json({ message: "Password reset link sent!" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
