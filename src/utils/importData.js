const admin = require("firebase-admin");
const fs = require("fs");

// Khởi tạo Firebase Admin SDK bằng serviceAccountKey
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// Đọc file json
const inputs = JSON.parse(fs.readFileSync("tickets.json", "utf8"));

// Import từng input vào collection custom json
async function importData() {
  const batch = db.batch();
  inputs.forEach((input) => {
    const docRef = db.collection("tickets").doc(); // để Firestore tự tạo id
    batch.set(docRef, input);
  });

  await batch.commit();
  console.log("Import done");
}

importData().catch(console.error);
