import { getApps, initializeApp } from "firebase/app";
import { doc, getDoc, getFirestore, writeBatch } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const firebaseEnabled = Boolean(firebaseConfig.apiKey && firebaseConfig.projectId);
const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
export const db = getFirestore(app);

export async function loadPortfolioData() {
  if (!firebaseEnabled) return null;

  try {
    const snapshot = await getDoc(doc(db, "portfolio", "content"));
    return snapshot.exists() ? snapshot.data() : null;
  } catch (error) {
    console.error("Unable to load portfolio data from Firebase", error);
    throw new Error(error?.message || "Unable to load Firebase data");
  }
}

export async function savePortfolioData(data) {
  if (!firebaseEnabled) {
    throw new Error("Firebase environment variables are missing");
  }

  try {
    const batch = writeBatch(db);
    batch.set(doc(db, "portfolio", "content"), data, { merge: true });
    batch.set(doc(db, "portfolio", "skills"), { items: data.skills || [] }, { merge: true });
    batch.set(doc(db, "portfolio", "projects"), { items: data.projects || [] }, { merge: true });
    batch.set(doc(db, "portfolio", "cv"), data.cv || {}, { merge: true });
    batch.set(doc(db, "portfolio", "header"), data.header || {}, { merge: true });
    batch.set(doc(db, "portfolio", "about"), data.siteContent || {}, { merge: true });
    await batch.commit();
    return true;
  } catch (error) {
    console.error("Unable to save portfolio data to Firebase", error);
    throw new Error(error?.message || "Firestore rejected the write");
  }
}

export { firebaseConfig, firebaseEnabled };