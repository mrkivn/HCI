# 🔥 Firebase + Vercel Deployment Guide

Complete guide to deploy the GINHAWA Hotel & Restaurant Management System to Vercel with Firebase Firestore.

## ⚠️ READ THIS FIRST - SECURITY WARNING

**CRITICAL:** This system currently stores passwords in **PLAINTEXT** and uses **OPEN FIRESTORE RULES** (allow all read/write). This is **ONLY ACCEPTABLE** for:
- Demo/HCI projects with test data
- Development environments
- School assignments

**DO NOT use for production** without implementing proper security (see [SECURITY_WARNING.md](SECURITY_WARNING.md)).

---

## Prerequisites

1. **Firebase Account** - https://console.firebase.google.com/
2. **Vercel Account** - https://vercel.com/
3. **Git Repository** - Push your code to GitHub, GitLab, or Bitbucket

---

## Step 1: Set Up Firebase Project

### 1.1 Create Firebase Project

1. Go to https://console.firebase.google.com/
2. Click "Add project"
3. Enter project name (e.g., "ginhawa-hotel-system")
4. Disable Google Analytics (optional for demo)
5. Click "Create project"

### 1.2 Enable Firestore Database

1. In Firebase Console, click "Firestore Database" in left menu
2. Click "Create database"
3. Select "Start in **test mode**" (for development - allows all read/write)
4. Choose a Cloud Firestore location (e.g., "us-central1")
5. Click "Enable"

### 1.3 Get Firebase Configuration

1. Go to Project Settings (gear icon) > "General" tab
2. Scroll to "Your apps" section
3. Click the web icon (</>)  to "Add app"
4. Register app with a nickname (e.g., "Hotel Management Web")
5. **Copy the Firebase configuration values** - you'll need these!

Example config you'll see:
```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890abcdef"
};
```

### 1.4 Update firebase-config.js

Open `firebase-config.js` and replace the placeholder values:

```javascript
const firebaseConfig = {
    apiKey: "YOUR_API_KEY_HERE",        // ← Replace these
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};
```

With your actual Firebase config:

```javascript
const firebaseConfig = {
    apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    authDomain: "ginhawa-hotel.firebaseapp.com",
    projectId: "ginhawa-hotel",
    storageBucket: "ginhawa-hotel.appspot.com",
    messagingSenderId: "123456789012",
    appId: "1:123456789012:web:abcdef1234567890abcdef"
};
```

---

## Step 2: Deploy Firestore Security Rules

### 2.1 Install Firebase CLI

```bash
npm install -g firebase-tools
```

### 2.2 Login to Firebase

```bash
firebase login
```

### 2.3 Initialize Firebase in Your Project

```bash
cd your-project-folder
firebase init firestore
```

- Select your Firebase project
- Accept default filenames (firestore.rules, firestore.indexes.json)

### 2.4 Deploy Security Rules

```bash
firebase deploy --only firestore:rules
```

---

## Step 3: Deploy to Vercel

### 3.1 Push Code to Git

```bash
git add .
git commit -m "Ready for Vercel deployment with Firebase"
git push origin main
```

### 3.2 Import to Vercel

1. Go to https://vercel.com/
2. Click "Add New" > "Project"
3. Import your Git repository
4. Configure project:
   - **Framework Preset:** Other (static site)
   - **Root Directory:** ./
   - **Build Command:** (leave empty)
   - **Output Directory:** ./
5. Click "Deploy"

### 3.3 Wait for Deployment

Vercel will build and deploy your site. You'll get a URL like:
```
https://your-project.vercel.app
```

---

## Step 4: Test Your Deployment

### 4.1 Open Your Site

Visit your Vercel URL: `https://your-project.vercel.app`

### 4.2 Check Browser Console

Open Developer Tools (F12) and check the Console tab. You should see:
```
✅ Firebase initialized successfully
✅ Firestore offline persistence enabled
📦 Firestore already initialized (or)
🔄 Initializing Firestore with demo data...
✅ Firestore initialization complete!
```

### 4.3 Test Login

1. Go to Login page
2. Use demo account:
   - Email: `customer@test.com`
   - Password: `password123`
3. Should see "Login successful!" and redirect to customer home

### 4.4 Check Firestore Console

1. Go to Firebase Console > Firestore Database
2. You should see collections:
   - `customers`
   - `staff`
   - `rooms`
   - `_system`

---

## Step 5: Module Migration Status

✅ **All modules have been successfully migrated!**

All JavaScript files now use async/await with Firebase Firestore:
- ✅ `booking/booking.js`
- ✅ `reservation/reservation.js`
- ✅ `kitchen/order-food.js`
- ✅ `bar/order-drinks.js`
- ✅ `housekeeping/housekeeping.js`
- ✅ `front-office/front-office.js`
- ✅ `room-facilities/room-facilities.js`
- ✅ `staff-login.html`
- ✅ `login.html`

See **[FIREBASE_MIGRATION_GUIDE.md](FIREBASE_MIGRATION_GUIDE.md)** for code patterns and examples.

---

## Troubleshooting

### Firebase Not Initializing

**Error:** `Firebase SDK not loaded`
- ✅ Check that CDN scripts are in your HTML files
- ✅ Verify internet connection
- ✅ Check browser console for errors

**Error:** `Firebase config not set!`
- ✅ Edit `firebase-config.js` with your actual Firebase config
- ✅ Make sure to replace ALL placeholder values
- ✅ Redeploy to Vercel after editing

### Firestore Permissions Denied

**Error:** `Missing or insufficient permissions`
- ✅ Check firestore.rules is set to test mode (allow all)
- ✅ Redeploy rules: `firebase deploy --only firestore:rules`
- ✅ Clear browser cache and reload

### Data Not Persisting

**Error:** Data disappears after page reload
- ✅ Check browser console for Firestore errors
- ✅ Verify Firebase config is correct
- ✅ Make sure async/await is used in all data operations
- ✅ Check Network tab for failed Firestore requests

### Login Not Working

**Error:** "Invalid email or password" (but credentials are correct)
- ✅ Check Firestore Console to see if `customers` collection exists
- ✅ Verify demo data was initialized (check `_system/initialized` document)
- ✅ Try manually adding a customer in Firestore Console
- ✅ Check browser console for async errors

---

## File Structure

```
your-project/
├── firebase-config.js          # Firebase initialization (EDIT THIS!)
├── firebase-db.js              # Firestore helper functions
├── firestore.rules             # Security rules
├── firestore.indexes.json      # Firestore indexes
├── vercel.json                 # Vercel configuration
├── .env.example                # Environment variables template
├── .gitignore                  # Git ignore file
├── FIREBASE_MIGRATION_GUIDE.md # Module migration guide
├── SECURITY_WARNING.md         # Important security information
├── index.html                  # Landing page
├── login.html                  # Customer login (✅ Firebase ready)
├── staff-login.html            # Staff login (✅ Firebase ready)
├── customer-home.html          # Customer dashboard
├── shared/
│   ├── shared-functions.js     # ✅ Firebase-enabled shared functions
│   └── shared-styles.css       # Global styles
├── booking/                    # ✅ Fully migrated to Firebase
├── reservation/                # ✅ Fully migrated to Firebase
├── kitchen/                    # ✅ Fully migrated to Firebase
├── bar/                        # ✅ Fully migrated to Firebase
├── housekeeping/               # ✅ Fully migrated to Firebase
├── front-office/               # ✅ Fully migrated to Firebase
└── room-facilities/            # ✅ Fully migrated to Firebase
```

---

## Next Steps

1. ✅ **Test your deployed site thoroughly**
2. ✅ **All module migrations complete** (migration fully done!)
3. ✅ **Add security warnings** to login pages (see SECURITY_WARNING.md)
4. ✅ **Monitor Firebase usage** in Firebase Console
5. ✅ **Set up billing alerts** to avoid unexpected charges

---

## Important Links

- 🔥 [Firebase Console](https://console.firebase.google.com/)
- 🚀 [Vercel Dashboard](https://vercel.com/dashboard)
- 📚 [Firebase Firestore Docs](https://firebase.google.com/docs/firestore)
- 📚 [Vercel Docs](https://vercel.com/docs)
- 🔒 [Security Warning](SECURITY_WARNING.md)
- 📖 [Migration Guide](FIREBASE_MIGRATION_GUIDE.md)

---

## Support

If you encounter issues:
1. Check browser console for errors
2. Review Firebase Console for data/rules issues
3. Check Vercel deployment logs
4. Refer to troubleshooting section above
5. Read FIREBASE_MIGRATION_GUIDE.md for async/await patterns

---

**Good luck with your deployment! 🚀**
