const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

const db = admin.firestore();

const getRandomProcessingTime = () =>
  Math.floor(Math.random() * (60000 - 30000 + 1) + 30000);

exports.processLogoGeneration = functions.firestore
  .document("logo_requests/{requestId}")
  .onCreate(async (snapshot, context) => {
    const requestId = context.params.requestId;
    const requestData = snapshot.data();

    if (requestData.status !== "processing") {
      return null;
    }

    try {
      console.log(`Processing logo request ${requestId}`);

      const processingTime = getRandomProcessingTime();
      await new Promise((resolve) => setTimeout(resolve, processingTime));

      const mockLogoUrl = "https://via.placeholder.com/300/ffffff?text=HC";

      await db.collection("logo_requests").doc(requestId).update({
        status: "done",
        imageUrl: mockLogoUrl,
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      });

      console.log(`Logo request ${requestId} completed successfully`);
      return null;
    } catch (error) {
      console.error(`Error processing logo request ${requestId}:`, error);

      await db.collection("logo_requests").doc(requestId).update({
        status: "error",
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      });

      return null;
    }
  });
