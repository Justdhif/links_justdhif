import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage'; // Tambahkan ini

// Ganti dengan konfigurasi Firebase kamu
const firebaseConfig = {
  apiKey: 'AIzaSyDUEso-29DRZdnP9_8FcgbaXuTgE7Jm8gY',
  authDomain: 'linktree-clone-d17c6.firebaseapp.com',
  projectId: 'linktree-clone-d17c6',
  storageBucket: 'linktree-clone-d17c6.appspot.com', // Perbaiki URL storage
  messagingSenderId: '163442510891',
  appId: '1:163442510891:web:e2179b8651435eb9f6ee6e',
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);

// Mendapatkan instance Firestore
const db = getFirestore(app);

// Mendapatkan instance Storage
const storage = getStorage(app); // Tambahkan ini

export { db, storage };
