/* ============================================
   GINHAWA Hotel & After Glow Restaurant
   Shared JavaScript Functions
   ============================================ */

// Initialize localStorage with demo data
function initializeData() {
    if (!localStorage.getItem('initialized')) {
        // Demo Customer Account
        const customers = [
            {
                email: 'customer@test.com',
                password: 'password123',
                name: 'Demo Customer',
                phone: '+63 917 123 4567'
            }
        ];
        localStorage.setItem('customers', JSON.stringify(customers));

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
        localStorage.setItem('staff', JSON.stringify(staff));

        // Initialize Rooms (30 rooms total)
        const rooms = [];
        const roomTypes = [
            { type: 'Standard', price: 2500, count: 15 },
            { type: 'Deluxe', price: 4000, count: 10 },
            { type: 'Suite', price: 7000, count: 5 }
        ];

        let roomNumber = 101;
        roomTypes.forEach(roomType => {
            for (let i = 0; i < roomType.count; i++) {
                rooms.push({
                    number: roomNumber++,
                    type: roomType.type,
                    price: roomType.price,
                    status: 'Available', // Available, Occupied, Cleaning
                    currentGuest: null
                });
            }
        });
        localStorage.setItem('rooms', JSON.stringify(rooms));

        // Initialize empty arrays for dynamic data
        localStorage.setItem('hotelBookings', JSON.stringify([]));
        localStorage.setItem('restaurantReservations', JSON.stringify([]));
        localStorage.setItem('orders', JSON.stringify([]));
        localStorage.setItem('housekeepingRequests', JSON.stringify([]));
        localStorage.setItem('invoices', JSON.stringify([]));

        localStorage.setItem('initialized', 'true');
        console.log('Data initialized successfully');
    }
}

// Call initialization on page load
initializeData();

// Upgrade existing data (idempotent migrations)
function upgradeData() {
    // Ensure Room Facilities staff account exists
    const staff = getLocalData('staff');
    if (!staff.find(s => s.email === 'roomfacilities@hotel.com')) {
        staff.push({ 
            email: 'roomfacilities@hotel.com', 
            password: 'room123', 
            department: 'Room Facilities' 
        });
        setLocalData('staff', staff);
        console.log('Added Room Facilities staff account');
    }
    
    // Ensure 30 rooms exist (upgrade from 10 to 30 if needed)
    let rooms = getLocalData('rooms');
    if (rooms.length < 30) {
        const existingRoomNumbers = rooms.map(r => r.number);
        const roomTypes = [
            { type: 'Standard', price: 2500, count: 15 },
            { type: 'Deluxe', price: 4000, count: 10 },
            { type: 'Suite', price: 7000, count: 5 }
        ];
        
        let roomNumber = 101;
        const allRooms = [];
        roomTypes.forEach(roomType => {
            for (let i = 0; i < roomType.count; i++) {
                allRooms.push({
                    number: roomNumber++,
                    type: roomType.type,
                    price: roomType.price,
                    status: 'Available',
                    currentGuest: null
                });
            }
        });
        
        // Add only new rooms that don't already exist
        allRooms.forEach(newRoom => {
            if (!existingRoomNumbers.includes(newRoom.number)) {
                rooms.push(newRoom);
            }
        });
        
        setLocalData('rooms', rooms);
        console.log('Upgraded rooms to ' + rooms.length + ' total (preserved existing room data)');
    }
}

// Run upgrade on every page load
upgradeData();

// Generate unique IDs
function generateId(prefix) {
    return prefix + '-' + Date.now();
}

// Format price in Philippine Peso
function formatPrice(amount) {
    return '₱' + amount.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// Calculate number of nights between two dates
function calculateNights(checkin, checkout) {
    const start = new Date(checkin);
    const end = new Date(checkout);
    const diffTime = end - start;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
}

// Format date to readable string
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-PH', options);
}

// Format time to readable string
function formatTime(timeString) {
    if (!timeString) return '';
    return timeString;
}

// Time ago function
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

// Check if user is logged in
function checkAuth(userType = 'customer') {
    const user = JSON.parse(sessionStorage.getItem('user'));
    if (!user || user.type !== userType) {
        window.location.href = userType === 'customer' ? '/login.html' : '/staff-login.html';
        return null;
    }
    return user;
}

// Logout function
function logout() {
    sessionStorage.removeItem('user');
    window.location.href = '/login.html';
}

// Get current user info
function getCurrentUser() {
    return JSON.parse(sessionStorage.getItem('user'));
}

// Dark mode toggle
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

// Load theme preference
function loadTheme() {
    const theme = localStorage.getItem('theme') || 'light';
    // Remove any existing theme classes first
    document.body.classList.remove('light-mode', 'dark-mode');
    // Then add the saved theme
    document.body.classList.add(theme + '-mode');
}

// Initialize theme on page load
document.addEventListener('DOMContentLoaded', () => {
    loadTheme();
});

// Toggle mobile navigation
function initMobileNav() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const closeMenu = document.getElementById('closeMenu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });

        // Close button functionality
        if (closeMenu) {
            closeMenu.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        }

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
            }
        });
    }
}

// Account dropdown toggle
function initAccountDropdown() {
    const accountBtn = document.getElementById('accountBtn');
    const accountDropdown = document.getElementById('accountDropdown');
    
    if (accountBtn && accountDropdown) {
        accountBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            accountDropdown.classList.toggle('show');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!accountBtn.contains(e.target) && !accountDropdown.contains(e.target)) {
                accountDropdown.classList.remove('show');
            }
        });
    }
}

// Initialize common event listeners
document.addEventListener('DOMContentLoaded', () => {
    initMobileNav();
    initAccountDropdown();
});

// Get data from localStorage
function getLocalData(key) {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error(`Error reading ${key} from localStorage:`, error);
        return [];
    }
}

// Save data to localStorage
function setLocalData(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
        return true;
    } catch (error) {
        console.error(`Error writing ${key} to localStorage:`, error);
        return false;
    }
}

// Get today's date in YYYY-MM-DD format
function getTodayDate() {
    const today = new Date();
    return today.toISOString().split('T')[0];
}

// Check if date is today
function isToday(dateString) {
    return dateString === getTodayDate();
}

// Validate email format
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Validate phone number (Philippine format)
function isValidPhone(phone) {
    const phoneRegex = /^\+63\s?\d{3}\s?\d{3}\s?\d{4}$/;
    return phoneRegex.test(phone);
}

// Show notification/alert
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

// Add CSS animations for notifications
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

// Filter array by date
function filterByDate(array, dateField, targetDate) {
    return array.filter(item => item[dateField] === targetDate);
}

// Count items by status
function countByStatus(array, status) {
    return array.filter(item => item.status === status).length;
}

// Sort array by timestamp (newest first)
function sortByTimestamp(array, field = 'timestamp') {
    return array.sort((a, b) => b[field] - a[field]);
}

// Calculate total revenue
function calculateTotalRevenue(invoices, dateFilter = null) {
    return invoices
        .filter(inv => inv.paymentStatus === 'Paid')
        .filter(inv => !dateFilter || isToday(new Date(inv.timestamp).toISOString().split('T')[0]))
        .reduce((total, inv) => total + inv.total, 0);
}

console.log('Shared functions loaded successfully');
