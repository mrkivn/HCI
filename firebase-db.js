/* ============================================
   Firebase Firestore Database Operations
   ============================================
   
   This file replaces all localStorage operations with
   Firestore operations for permanent cloud storage.
   
   Collections in Firestore:
   - customers
   - staff
   - rooms
   - hotelBookings
   - restaurantReservations
   - orders
   - housekeepingRequests
   - invoices
   
   ============================================ */

// Initialize flag
let firestoreInitialized = false;
let initializationPromise = null;

// Wait for Firestore to be ready
async function waitForFirestore() {
    if (initializationPromise) {
        return initializationPromise;
    }
    
    initializationPromise = new Promise(async (resolve) => {
        if (firestoreInitialized) {
            resolve(true);
            return;
        }
        
        const initialized = await window.firebaseConfig.initializeFirebase();
        if (initialized) {
            firestoreInitialized = true;
            resolve(true);
        } else {
            console.error('Failed to initialize Firestore');
            resolve(false);
        }
    });
    
    return initializationPromise;
}

// ============================================
// FIRESTORE HELPER FUNCTIONS
// ============================================

/**
 * Get all documents from a collection
 * @param {string} collectionName - Name of the collection
 * @returns {Promise<Array>} Array of documents with IDs
 */
async function getCollection(collectionName) {
    await waitForFirestore();
    const db = window.firebaseConfig.getFirestore();
    
    try {
        const snapshot = await db.collection(collectionName).get();
        const data = [];
        snapshot.forEach(doc => {
            data.push({ id: doc.id, ...doc.data() });
        });
        return data;
    } catch (error) {
        console.error(`Error getting ${collectionName}:`, error);
        return [];
    }
}

/**
 * Get a single document by ID
 * @param {string} collectionName - Name of the collection
 * @param {string} docId - Document ID
 * @returns {Promise<Object|null>} Document data or null
 */
async function getDocument(collectionName, docId) {
    await waitForFirestore();
    const db = window.firebaseConfig.getFirestore();
    
    try {
        const doc = await db.collection(collectionName).doc(docId).get();
        if (doc.exists) {
            return { id: doc.id, ...doc.data() };
        }
        return null;
    } catch (error) {
        console.error(`Error getting document ${docId} from ${collectionName}:`, error);
        return null;
    }
}

/**
 * Add a new document to a collection
 * @param {string} collectionName - Name of the collection
 * @param {Object} data - Document data
 * @returns {Promise<string|null>} Document ID or null
 */
async function addDocument(collectionName, data) {
    await waitForFirestore();
    const db = window.firebaseConfig.getFirestore();
    
    try {
        const docRef = await db.collection(collectionName).add({
            ...data,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        console.log(`✅ Added document to ${collectionName} with ID: ${docRef.id}`);
        return docRef.id;
    } catch (error) {
        console.error(`Error adding document to ${collectionName}:`, error);
        return null;
    }
}

/**
 * Update an existing document
 * @param {string} collectionName - Name of the collection
 * @param {string} docId - Document ID
 * @param {Object} data - Updated data
 * @returns {Promise<boolean>} Success status
 */
async function updateDocument(collectionName, docId, data) {
    await waitForFirestore();
    const db = window.firebaseConfig.getFirestore();
    
    try {
        await db.collection(collectionName).doc(docId).update({
            ...data,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        console.log(`✅ Updated document ${docId} in ${collectionName}`);
        return true;
    } catch (error) {
        console.error(`Error updating document ${docId} in ${collectionName}:`, error);
        return false;
    }
}

/**
 * Set a document (create or overwrite)
 * @param {string} collectionName - Name of the collection
 * @param {string} docId - Document ID
 * @param {Object} data - Document data
 * @returns {Promise<boolean>} Success status
 */
async function setDocument(collectionName, docId, data) {
    await waitForFirestore();
    const db = window.firebaseConfig.getFirestore();
    
    try {
        await db.collection(collectionName).doc(docId).set({
            ...data,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        console.log(`✅ Set document ${docId} in ${collectionName}`);
        return true;
    } catch (error) {
        console.error(`Error setting document ${docId} in ${collectionName}:`, error);
        return false;
    }
}

/**
 * Delete a document
 * @param {string} collectionName - Name of the collection
 * @param {string} docId - Document ID
 * @returns {Promise<boolean>} Success status
 */
async function deleteDocument(collectionName, docId) {
    await waitForFirestore();
    const db = window.firebaseConfig.getFirestore();
    
    try {
        await db.collection(collectionName).doc(docId).delete();
        console.log(`✅ Deleted document ${docId} from ${collectionName}`);
        return true;
    } catch (error) {
        console.error(`Error deleting document ${docId} from ${collectionName}:`, error);
        return false;
    }
}

/**
 * Query collection with filters
 * @param {string} collectionName - Name of the collection
 * @param {Array} filters - Array of [field, operator, value]
 * @returns {Promise<Array>} Array of matching documents
 */
async function queryCollection(collectionName, filters = []) {
    await waitForFirestore();
    const db = window.firebaseConfig.getFirestore();
    
    try {
        let query = db.collection(collectionName);
        
        // Apply filters
        filters.forEach(([field, operator, value]) => {
            query = query.where(field, operator, value);
        });
        
        const snapshot = await query.get();
        const data = [];
        snapshot.forEach(doc => {
            data.push({ id: doc.id, ...doc.data() });
        });
        return data;
    } catch (error) {
        console.error(`Error querying ${collectionName}:`, error);
        return [];
    }
}

/**
 * Listen to real-time updates on a collection
 * @param {string} collectionName - Name of the collection
 * @param {Function} callback - Callback function(data)
 * @returns {Function} Unsubscribe function
 */
async function listenToCollection(collectionName, callback) {
    await waitForFirestore();
    const db = window.firebaseConfig.getFirestore();
    
    try {
        return db.collection(collectionName).onSnapshot(snapshot => {
            const data = [];
            snapshot.forEach(doc => {
                data.push({ id: doc.id, ...doc.data() });
            });
            callback(data);
        });
    } catch (error) {
        console.error(`Error listening to ${collectionName}:`, error);
        return () => {};
    }
}

// ============================================
// APPLICATION-SPECIFIC FUNCTIONS
// (Replace localStorage with Firestore)
// ============================================

/**
 * Initialize Firestore with demo data (runs once)
 */
async function initializeFirestoreData() {
    await waitForFirestore();
    const db = window.firebaseConfig.getFirestore();
    
    try {
        // Check if already initialized
        const initDoc = await db.collection('_system').doc('initialized').get();
        if (initDoc.exists) {
            console.log('📦 Firestore already initialized');
            return;
        }
        
        console.log('🔄 Initializing Firestore with demo data...');
        
        // Demo Customer Account
        const customers = [
            {
                email: 'customer@test.com',
                password: 'password123',
                name: 'Demo Customer',
                phone: '+63 917 123 4567'
            }
        ];
        for (const customer of customers) {
            await db.collection('customers').add(customer);
        }
        
        // Demo Staff Accounts
        const staff = [
            { email: 'manager@hotel.com', password: 'admin123', department: 'Manager' },
            { email: 'frontdesk@hotel.com', password: 'front123', department: 'Front Office' },
            { email: 'kitchen@hotel.com', password: 'kitchen123', department: 'Kitchen' },
            { email: 'bar@hotel.com', password: 'bar123', department: 'Bar' },
            { email: 'housekeeping@hotel.com', password: 'clean123', department: 'Housekeeping' },
            { email: 'billing@hotel.com', password: 'bill123', department: 'Billing' },
            { email: 'customerguest@hotel.com', password: 'guest123', department: 'Customer Guest' },
            { email: 'roomfacilities@hotel.com', password: 'room123', department: 'Room Facilities' }
        ];
        for (const staffMember of staff) {
            await db.collection('staff').add(staffMember);
        }
        
        // Initialize Rooms (30 rooms total)
        const roomTypes = [
            { type: 'Standard', price: 2500, count: 15 },
            { type: 'Deluxe', price: 4000, count: 10 },
            { type: 'Suite', price: 7000, count: 5 }
        ];
        
        let roomNumber = 101;
        for (const roomType of roomTypes) {
            for (let i = 0; i < roomType.count; i++) {
                await db.collection('rooms').add({
                    number: roomNumber++,
                    type: roomType.type,
                    price: roomType.price,
                    status: 'Available',
                    currentGuest: null
                });
            }
        }
        
        // Mark as initialized
        await db.collection('_system').doc('initialized').set({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            version: '1.0.0'
        });
        
        console.log('✅ Firestore initialization complete!');
    } catch (error) {
        console.error('❌ Error initializing Firestore:', error);
    }
}

/**
 * Get data from Firestore (replaces getLocalData)
 * @param {string} collectionName - Collection name
 * @returns {Promise<Array>} Array of documents
 */
async function getFirestoreData(collectionName) {
    return await getCollection(collectionName);
}

/**
 * Set data in Firestore (replaces setLocalData)
 * @param {string} collectionName - Collection name
 * @param {Array} data - Array of documents to set
 * @returns {Promise<boolean>} Success status
 */
async function setFirestoreData(collectionName, data) {
    await waitForFirestore();
    const db = window.firebaseConfig.getFirestore();
    
    try {
        // This is a batch operation - delete all and re-add
        // Get all existing docs
        const snapshot = await db.collection(collectionName).get();
        const batch = db.batch();
        
        // Delete existing
        snapshot.forEach(doc => {
            batch.delete(doc.ref);
        });
        
        // Add new data
        data.forEach(item => {
            const docRef = db.collection(collectionName).doc();
            batch.set(docRef, item);
        });
        
        await batch.commit();
        console.log(`✅ Batch updated ${collectionName}`);
        return true;
    } catch (error) {
        console.error(`Error batch updating ${collectionName}:`, error);
        return false;
    }
}

// Export all functions
window.firestoreDB = {
    // Core functions
    getCollection,
    getDocument,
    addDocument,
    updateDocument,
    setDocument,
    deleteDocument,
    queryCollection,
    listenToCollection,
    
    // Application-specific functions
    initializeFirestoreData,
    getFirestoreData,
    setFirestoreData,
    
    // Utility
    waitForFirestore
};

console.log('🔥 Firebase DB operations loaded');
