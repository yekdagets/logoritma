const { onDocumentCreated } = require("firebase-functions/v2/firestore");
const admin = require("firebase-admin");
admin.initializeApp();

const db = admin.firestore();

const getRandomProcessingTime = () =>
  Math.floor(Math.random() * (60000 - 30000 + 1) + 30000);

exports.processLogoGeneration = onDocumentCreated(
  "logo_requests/{requestId}",
  async (event) => {
    const snapshot = event.data;
    if (!snapshot) {
      console.log("No data associated with the event");
      return;
    }

    const requestId = event.params.requestId;
    const requestData = snapshot.data();

    if (requestData.status !== "processing") {
      console.log(`Request ${requestId} is not in processing state, skipping`);
      return null;
    }

    try {
      console.log(`Processing logo request ${requestId}`);

      const processingTime = getRandomProcessingTime();
      await new Promise((resolve) => setTimeout(resolve, processingTime));

      const mockLogoUrl = "https://fakeimg.pl/600x400";

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
  }
);
