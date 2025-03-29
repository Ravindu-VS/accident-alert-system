const admin = require('firebase-admin');
require('dotenv').config();

const initializeFirebase = () => {
  if (!admin.apps.length) {
    try {
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId: process.env.FIREBASE_PROJECT_ID,
          privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL
        }),
        databaseURL: process.env.DATABASE_URL
      });
      console.log('✅ Firebase initialized successfully');
    } catch (error) {
      console.error('❌ Firebase initialization error:', error);
      throw error;
    }
  }
  return admin;
};

module.exports = { initializeFirebase };