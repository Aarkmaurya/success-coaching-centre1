import { auth, db } from "./firebase-config.js";

import {
  signInWithPhoneNumber,
  RecaptchaVerifier,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";

import {
  doc,
  setDoc,
  getDoc
} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

alert("app.js loaded");

/* -------------------------
   GLOBAL STATE
--------------------------*/
let confirmationResult;

/* -------------------------
   RECAPTCHA SETUP
--------------------------*/
window.recaptchaVerifier = new RecaptchaVerifier(
  "recaptcha-container",
  { size: "invisible" },
  auth
);

/* -------------------------
   SEND OTP
--------------------------*/
window.sendOTP = async function () {

alert("Send OTP button clicked");

  const phone = document.getElementById("phone").value;

  if (!phone) {
    alert("Phone number enter karo");
    return;
  }

  try {
    confirmationResult = await signInWithPhoneNumber(
      auth,
      phone,
      window.recaptchaVerifier
    );

    window.confirmationResult = confirmationResult;

    alert("OTP sent successfully 🚀");

  }  catch (err) {
    console.error("SEND OTP ERROR:", err);
    alert("SEND OTP ERROR: " + err.message);
}
};

/* -------------------------
   VERIFY OTP
--------------------------*/
window.verifyOTP = async function () {

  const code = document.getElementById("otp").value;

  if (!code) {
    alert("OTP enter karo");
    return;
  }

  try {
    const result = await window.confirmationResult.confirm(code);

    const user = result.user;

    console.log("Logged in:", user.uid);

    // check if profile exists
    const ref = doc(db, "students", user.uid);
    const snap = await getDoc(ref);

    if (snap.exists()) {
      window.location.href = "dashboard.html";
    } else {
      window.location.href = "profile.html";
    }

  } catch (err) {
  console.error("OTP ERROR:", err);
  alert("OTP Error: " + err.message);
}
};

/* -------------------------
   SAVE PROFILE
--------------------------*/
window.saveProfile = async function () {

  const user = auth.currentUser;

  if (!user) {
    alert("Login required");
    return;
  }

  const data = {
    name: document.getElementById("name").value,
    father: document.getElementById("father").value,
    studentMobile: document.getElementById("studentMobile").value,
    parentMobile: document.getElementById("parentMobile").value,
    class: document.getElementById("class").value,
    school: document.getElementById("school").value,
    address: document.getElementById("address").value,
    course: document.getElementById("course").value,
    role: "student",
    createdAt: new Date()
  };

  try {
    await setDoc(doc(db, "students", user.uid), data);

    alert("Profile saved 🚀");

    window.location.href = "dashboard.html";

  } catch (err) {
    console.log(err);
    alert("Error saving profile");
  }
};

/* -------------------------
   AUTH PROTECTION (GLOBAL)
--------------------------*/
onAuthStateChanged(auth, async (user) => {

  const path = window.location.pathname;

  // if not logged in
  if (!user) {
    if (!path.includes("index.html") && path !== "/") {
      window.location.href = "index.html";
    }
    return;
  }

  console.log("User active:", user.uid);

});    studentMobile: document.getElementById("studentMobile").value,
    parentMobile: document.getElementById("parentMobile").value,
    class: document.getElementById("class").value,
    school: document.getElementById("school").value,
    address: document.getElementById("address").value,
    course: document.getElementById("course").value,
    role: "student",
    createdAt: new Date()
  };

  try {
    await setDoc(doc(db, "students", user.uid), data);

    alert("Profile saved 🚀");

    window.location.href = "dashboard.html";

  } catch (err) {
    console.log(err);
    alert("Error saving profile");
  }
};

/* -------------------------
   AUTH PROTECTION (GLOBAL)
--------------------------*/
onAuthStateChanged(auth, async (user) => {

  const path = window.location.pathname;

  // if not logged in
  if (!user) {
    if (!path.includes("index.html") && path !== "/") {
      window.location.href = "index.html";
    }
    return;
  }

  console.log("User active:", user.uid);

});
