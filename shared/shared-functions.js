function showButtonLoading(button, originalText = null) {
    if (!button) return;
    button.disabled = true;
    if (originalText) {
        button.setAttribute('data-original-text', originalText);
    }
    const text = button.getAttribute('data-original-text') || button.textContent;
    button.setAttribute('data-original-text', text);
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
}

function hideButtonLoading(button) {
    if (!button) return;
    button.disabled = false;
    const originalText = button.getAttribute('data-original-text');
    if (originalText) {
        button.textContent = originalText;
    }
}

function showLoading(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    const overlay = document.createElement('div');
    overlay.className = 'loading-overlay';
    overlay.innerHTML = '<div class="spinner"><i class="fas fa-spinner fa-spin fa-3x"></i><p>Loading...</p></div>';
    overlay.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
    `;
    container.style.position = 'relative';
    container.appendChild(overlay);
}

function hideLoading(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    const overlay = container.querySelector('.loading-overlay');
    if (overlay) {
        overlay.remove();
    }
}

async function withLoading(asyncFn, button = null) {
    if (button) showButtonLoading(button);
    
    try {
        const result = await asyncFn();
        return result;
    } finally {
        if (button) hideButtonLoading(button);
    }
}

async function withErrorHandling(asyncFn, errorMessage = 'An error occurred') {
    try {
        return await asyncFn();
    } catch (error) {
        console.error(errorMessage, error);
        showNotification(errorMessage, 'error');
        return null;
    }
}

async function initializeData() {
    try {
        await window.firestoreDB.initializeFirestoreData();
    } catch (error) {
        console.error('Failed to initialize Firestore:', error);
        showNotification('Failed to connect to database. Please refresh the page.', 'error');
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    await initializeData();
});

function generateId(prefix) {
    return prefix + '-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
}

function formatPrice(amount) {
    return '₱' + amount.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function calculateNights(checkin, checkout) {
    const start = new Date(checkin);
    const end = new Date(checkout);
    const diffTime = end - start;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-PH', options);
}

function formatTime(timeString) {
    if (!timeString) return '';
    return timeString;
}

function timeAgo(timestamp) {
    const now = Date.now();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return minutes + ' min ago';
    
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return hours + ' hour' + (hours > 1 ? 's' : '') + ' ago';
    
    const days = Math.floor(hours / 24);
    return days + ' day' + (days > 1 ? 's' : '') + ' ago';
}

function checkAuth(userType = 'customer') {
    const user = JSON.parse(sessionStorage.getItem('user'));
    if (!user || user.type !== userType) {
        window.location.href = userType === 'customer' ? '/login.html' : '/staff-login.html';
        return null;
    }
    return user;
}

function logout() {
    sessionStorage.removeItem('user');
    window.location.href = '/login.html';
}

function getCurrentUser() {
    return JSON.parse(sessionStorage.getItem('user'));
}

function toggleTheme() {
    const body = document.body;
    if (body.classList.contains('dark-mode')) {
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
        localStorage.setItem('theme', 'light');
    } else {
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
    }
}

function loadTheme() {
    const theme = localStorage.getItem('theme') || 'light';
    document.body.classList.remove('light-mode', 'dark-mode');
    document.body.classList.add(theme + '-mode');
}

document.addEventListener('DOMContentLoaded', () => {
    loadTheme();
});

function initMobileNav() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const closeMenu = document.getElementById('closeMenu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });

        if (closeMenu) {
            closeMenu.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        }

        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
            }
        });
    }
}

function initAccountDropdown() {
    const accountBtn = document.getElementById('accountBtn');
    const accountDropdown = document.getElementById('accountDropdown');
    
    if (accountBtn && accountDropdown) {
        accountBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            accountDropdown.classList.toggle('show');
        });

        document.addEventListener('click', (e) => {
            if (!accountBtn.contains(e.target) && !accountDropdown.contains(e.target)) {
                accountDropdown.classList.remove('show');
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initMobileNav();
    initAccountDropdown();
});

async function getFirestoreData(collectionName) {
    try {
        return await window.firestoreDB.getFirestoreData(collectionName);
    } catch (error) {
        console.error(`Error reading ${collectionName} from Firestore:`, error);
        return [];
    }
}

async function setFirestoreData(collectionName, data) {
    try {
        return await window.firestoreDB.setFirestoreData(collectionName, data);
    } catch (error) {
        console.error(`Error writing ${collectionName} to Firestore:`, error);
        return false;
    }
}

async function addFirestoreDocument(collectionName, data) {
    try {
        return await window.firestoreDB.addDocument(collectionName, data);
    } catch (error) {
        console.error(`Error adding document to ${collectionName}:`, error);
        return null;
    }
}

async function updateFirestoreDocument(collectionName, docId, data) {
    try {
        return await window.firestoreDB.updateDocument(collectionName, docId, data);
    } catch (error) {
        console.error(`Error updating document in ${collectionName}:`, error);
        return false;
    }
}

async function deleteFirestoreDocument(collectionName, docId) {
    try {
        return await window.firestoreDB.deleteDocument(collectionName, docId);
    } catch (error) {
        console.error(`Error deleting document from ${collectionName}:`, error);
        return false;
    }
}

const getLocalData = getFirestoreData;
const setLocalData = setFirestoreData;

function getTodayDate() {
    const today = new Date();
    return today.toISOString().split('T')[0];
}

function isToday(dateString) {
    return dateString === getTodayDate();
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^\+63\s?\d{3}\s?\d{3}\s?\d{4}$/;
    return phoneRegex.test(phone);
}

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        border-radius: 5px;
        background-color: ${type === 'success' ? '#28a745' : '#dc3545'};
        color: white;
        font-weight: 500;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        z-index: 3000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

function filterByDate(array, dateField, targetDate) {
    return array.filter(item => item[dateField] === targetDate);
}

function countByStatus(array, status) {
    return array.filter(item => item.status === status).length;
}

function sortByTimestamp(array, field = 'timestamp') {
    return array.sort((a, b) => b[field] - a[field]);
}

function calculateTotalRevenue(invoices, dateFilter = null) {
    return invoices
        .filter(inv => inv.paymentStatus === 'Paid')
        .filter(inv => !dateFilter || isToday(new Date(inv.timestamp).toISOString().split('T')[0]))
        .reduce((total, inv) => total + inv.total, 0);
}
