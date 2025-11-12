const admin = require("firebase-admin");
const fs = require("fs");


const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const inputs = JSON.parse(fs.readFileSync("tickets.json", "utf8"));


async function importData() {
  const batch = db.batch();
  inputs.forEach((input) => {
    const docRef = db.collection("tickets").doc(); 
    batch.set(docRef, input);
  });

  await batch.commit();
  console.log("Import done");
}

importData().catch(console.error);
