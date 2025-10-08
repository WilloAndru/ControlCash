import fs from "fs";
import admin from "firebase-admin";

let serviceAccount;

if (process.env.FIREBASE_KEY_BASE64) {
  // En producción (Render u otro servidor)
  const decoded = Buffer.from(
    process.env.FIREBASE_KEY_BASE64,
    "base64"
  ).toString("utf-8");
  serviceAccount = JSON.parse(decoded);
} else {
  // En local (usa el archivo JSON)
  const path = new URL("./serviceAccountKey.json", import.meta.url);
  serviceAccount = JSON.parse(fs.readFileSync(path, "utf8"));
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export default admin;
