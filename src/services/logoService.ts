import {
  collection,
  addDoc,
  doc,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "./firebase";
import { COLLECTION_NAMES } from "../constants";
import { LogoRequest, LogoStyle } from "../types";

export const createLogoRequest = async (
  prompt: string,
  style: LogoStyle
): Promise<string> => {
  try {
    const docRef = await addDoc(
      collection(db, COLLECTION_NAMES.LOGO_REQUESTS),
      {
        prompt,
        style,
        status: "processing",
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      }
    );

    return docRef.id;
  } catch (error) {
    console.error("Error creating logo request:", error);
    throw error;
  }
};

export const getLogoRequest = async (
  requestId: string
): Promise<LogoRequest | null> => {
  try {
    const requestRef = doc(db, COLLECTION_NAMES.LOGO_REQUESTS, requestId);
    const docSnap = await getDoc(requestRef);

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as LogoRequest;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching logo request:", error);
    throw error;
  }
};
