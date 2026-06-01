import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-storage.js";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyDz64Vo3LFzjPLEPaH_lZQUE1LYRhNqt5o",
  authDomain: "success-coaching-centre1.firebaseapp.com",
  projectId: "success-coaching-centre1",
  storageBucket: "success-coaching-centre1.firebasestorage.app",
  messagingSenderId: "1059246095002",
  appId: "1:1059246095002:web:b9c92f2df0d945afdd7d23"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

console.log("✅ SUCCESS COACHING CENTRE Firebase Connected");
