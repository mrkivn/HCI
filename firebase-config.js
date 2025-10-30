/* ============================================
   Firebase Configuration
   ============================================
   
   SETUP INSTRUCTIONS FOR VERCEL DEPLOYMENT:
   
   1. Go to https://console.firebase.google.com/
   2. Create a new Firebase project or use existing one
   3. Enable Firestore Database in your Firebase console
   4. Go to Project Settings > General > Your apps
   5. Click "Add app" and select "Web" (</>) 
   6. Register your app and copy the config values
   7. In Vercel, go to Project Settings > Environment Variables
   8. Add these environment variables:
      - VITE_FIREBASE_API_KEY
      - VITE_FIREBASE_AUTH_DOMAIN
      - VITE_FIREBASE_PROJECT_ID
      - VITE_FIREBASE_STORAGE_BUCKET
      - VITE_FIREBASE_MESSAGING_SENDER_ID
      - VITE_FIREBASE_APP_ID
   
   ============================================ */

// Import Firebase modules from CDN (loaded via script tags in HTML)
// Scripts are loaded in index.html and other HTML files

let db = null;
let app = null;

// Initialize Firebase
async function initializeFirebase() {
    try {
        // Firebase configuration - uses environment variables in production
        const firebaseConfig = {
            apiKey: window.ENV?.VITE_FIREBASE_API_KEY || "YOUR_API_KEY_HERE",
            authDomain: window.ENV?.VITE_FIREBASE_AUTH_DOMAIN || "YOUR_PROJECT_ID.firebaseapp.com",
            projectId: window.ENV?.VITE_FIREBASE_PROJECT_ID || "YOUR_PROJECT_ID",
            storageBucket: window.ENV?.VITE_FIREBASE_STORAGE_BUCKET || "YOUR_PROJECT_ID.appspot.com",
            messagingSenderId: window.ENV?.VITE_FIREBASE_MESSAGING_SENDER_ID || "YOUR_SENDER_ID",
            appId: window.ENV?.VITE_FIREBASE_APP_ID || "YOUR_APP_ID"
        };

        // Check if Firebase is loaded
        if (typeof firebase === 'undefined') {
            console.error('Firebase SDK not loaded. Make sure script tags are in your HTML.');
            return false;
        }

        // Initialize Firebase App
        app = firebase.initializeApp(firebaseConfig);
        
        // Initialize Firestore
        db = firebase.firestore();
        
        // Enable offline persistence for better UX
        try {
            await db.enablePersistence({ synchronizeTabs: true });
            console.log('✅ Firestore offline persistence enabled');
        } catch (err) {
            if (err.code === 'failed-precondition') {
                console.warn('⚠️ Multiple tabs open, persistence only enabled in one tab');
            } else if (err.code === 'unimplemented') {
                console.warn('⚠️ Browser does not support persistence');
            }
        }
        
        console.log('✅ Firebase initialized successfully');
        return true;
    } catch (error) {
        console.error('❌ Error initializing Firebase:', error);
        return false;
    }
}

// Get Firestore instance
function getFirestore() {
    if (!db) {
        console.error('Firestore not initialized. Call initializeFirebase() first.');
    }
    return db;
}

// Export for use in other files
window.firebaseConfig = {
    initializeFirebase,
    getFirestore,
    get db() { return db; },
    get app() { return app; }
};
