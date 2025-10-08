import fs from "fs";
import admin from "firebase-admin";

let serviceAccount;

if (process.env.FIREBASE_KEY) {
  // En producción (Render)
  serviceAccount = JSON.parse(process.env.FIREBASE_KEY);
} else {
  // En local (usa el archivo JSON)
  const path = new URL("./serviceAccountKey.json", import.meta.url);
  serviceAccount = JSON.parse(fs.readFileSync(path, "utf8"));
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export default admin;
