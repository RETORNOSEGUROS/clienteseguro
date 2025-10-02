// public/js/firebase.js

// 🔧 Cole aqui o objeto de configuração que o Console mostrou
const firebaseConfig = {
  apiKey: "AIzaSyBWvdu46EcKyNZp8l7UBmReRF9wPXHyVCU",
  authDomain: "clienteseguro-223b0.firebaseapp.com",
  projectId: "clienteseguro-223b0",
  storageBucket: "clienteseguro-223b0.firebasestorage.app",
  messagingSenderId: "444237270221",
  appId: "1:444237270221:web:4149193928c329b5bcad84",
  measurementId: "G-5W23SCMK4K"
};

firebase.initializeApp(firebaseConfig);
window.db = firebase.firestore();
