var admin = require("firebase-admin");

// var serviceAccount = require("./firebase-keys.json");
var serviceAccount = JSON.parse(process.env.FIREBASE_ADMIN_CONFIG);

try {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });
} catch (err) {}

export const firestore = admin.firestore();
