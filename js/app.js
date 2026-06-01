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

console.log("app.js loaded");

/* -------------------------
   RECAPTCHA SETUP
--------------------------*/
window.recaptchaVerifier = new RecaptchaVerifier(
  auth,
  "recaptcha-container",
  {
    size: "invisible"
  }
);

/* -------------------------
   SEND OTP
--------------------------*/
window.sendOTP = async function () {
  const phone = document.getElementById("phone").value;

  if (!phone) {
    alert("Phone number enter karo");
    return;
  }

  try {
    window.confirmationResult = await signInWithPhoneNumber(
      auth,
      phone,
      window.recaptchaVerifier
    );

    alert("OTP sent successfully 🚀");

  } catch (err) {
    console.error("SEND OTP ERROR:", err);
    alert(err.message);
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

  if (!window.confirmationResult) {
    alert("Pehle OTP send karo");
    return;
  }

  try {
    const result = await window.confirmationResult.confirm(code);
    const user = result.user;

    console.log("Logged in:", user.uid);

    const ref = doc(db, "students", user.uid);
    const snap = await getDoc(ref);

    if (snap.exists()) {
      window.location.href = "dashboard.html";
    } else {
      window.location.href = "profile.html";
    }

  } catch (err) {
    console.error("OTP ERROR:", err);
    alert(err.message);
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
    name: document.getElementById("name")?.value || "",
    father: document.getElementById("father")?.value || "",
    studentMobile: document.getElementById("studentMobile")?.value || "",
    parentMobile: document.getElementById("parentMobile")?.value || "",
    className: document.getElementById("class")?.value || "",
    school: document.getElementById("school")?.value || "",
    address: document.getElementById("address")?.value || "",
    course: document.getElementById("course")?.value || "",
    role: "student",
    createdAt: new Date()
  };

  try {
    await setDoc(doc(db, "students", user.uid), data);

    alert("Profile saved 🚀");

    window.location.href = "dashboard.html";

  } catch (err) {
    console.error(err);
    alert("Error saving profile");
  }
};

/* -------------------------
   AUTH PROTECTION
--------------------------*/
onAuthStateChanged(auth, (user) => {
  const path = window.location.pathname;

  if (!user) {
    if (path.includes("dashboard") || path.includes("profile")) {
      window.location.href = "index.html";
    }
    return;
  }

  console.log("User active:", user.uid);
});
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
