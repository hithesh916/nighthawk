import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
const firebaseConfig = {
  apiKey: "AIzaSyBqnA9nVNJXFVSt9CmqcePFDQg6JivIAQw",
  authDomain: "nighthawk-ea06f.firebaseapp.com",
  projectId: "nighthawk-ea06f",
  storageBucket: "nighthawk-ea06f.firebasestorage.app",
  messagingSenderId: "663976377908",
  appId: "1:663976377908:web:b9058cd3075fadf6b59461",
  measurementId: "G-1VBN9W8P4D"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// AUTH OBSERVER
onAuthStateChanged(auth, (user) => {
  const profileBtns = document.querySelectorAll('button[title="Profile"]');
  if (user) {
    // User is signed in
    profileBtns.forEach(btn => {
      btn.innerHTML = `
        <div style="display:flex; align-items:center; gap:8px;">
          <span style="font-family:'Barlow Condensed'; font-size:12px; letter-spacing:1px; color:#c9a84c;">${user.displayName || 'SQUAD'}</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
        </div>
      `;
      btn.title = "Logout";
      btn.onclick = (e) => {
        e.preventDefault();
        signOut(auth).then(() => {
          window.location.reload();
        });
      };
    });
  } else {
    // User is signed out
    profileBtns.forEach(btn => {
      btn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`;
      btn.title = "Profile";
      btn.onclick = () => { window.location.href = 'login.html'; };
    });
  }
});
