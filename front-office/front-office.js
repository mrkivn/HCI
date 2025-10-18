// Front Office Dashboard JavaScript

// Check authentication
const user = checkAuth('staff');

let currentTab = 'pending';

// Load dashboard
function loadDashboard() {
    updateStats();
    loadBookings();
}

// Update stats
function updateStats() {
    const bookings = getLocalData('hotelBookings');
    
    const pendingCheckIns = bookings.filter(b => b.status === 'Confirmed').length;
    const currentGuests = bookings.filter(b => b.status === 'Checked-in').length;
    const today = getTodayDate();
    const pendingCheckOuts = bookings.filter(b => 
        b.status === 'Checked-in' && b.checkout === today
    ).length;

    document.getElementById('pendingCheckIns').textContent = pendingCheckIns;
    document.getElementById('currentGuests').textContent = currentGuests;
    document.getElementById('pendingCheckOuts').textContent = pendingCheckOuts;
}

// Switch tab
function switchTab(evt, tab) {
    currentTab = tab;
    
    // Update active tab
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    evt.currentTarget.classList.add('active');
    
    loadBookings();
}

// Load bookings
function loadBookings() {
    const container = document.getElementById('bookingsList');
    const bookings = getLocalData('hotelBookings');
    
    let filteredBookings = bookings;
    
    if (currentTab === 'pending') {
        filteredBookings = bookings.filter(b => b.status === 'Confirmed');
    } else if (currentTab === 'checkedin') {
        filteredBookings = bookings.filter(b => b.status === 'Checked-in');
    }
    
    // Sort by check-in date
    filteredBookings.sort((a, b) => new Date(a.checkin) - new Date(b.checkin));
    
    if (filteredBookings.length === 0) {
        container.innerHTML = '<p class="text-muted text-center">No bookings found.</p>';
        return;
    }
    
    container.innerHTML = '';
    filteredBookings.forEach(booking => {
        const item = createBookingItem(booking);
        container.appendChild(item);
    });
}

// Create booking item
function createBookingItem(booking) {
    const div = document.createElement('div');
    div.className = 'booking-item';
    
    div.innerHTML = `
        <div class="booking-item-header">
            <div class="booking-id">${booking.id}</div>
            <div>${getStatusBadge(booking.status)}</div>
        </div>
        <div class="booking-info">
            <div class="info-item">
                <span class="info-label">Guest Name</span>
                <span class="info-value">${booking.customerName}</span>
            </div>
            <div class="info-item">
                <span class="info-label">Email</span>
                <span class="info-value">${booking.customerEmail}</span>
            </div>
            <div class="info-item">
                <span class="info-label">Phone</span>
                <span class="info-value">${booking.customerPhone}</span>
            </div>
            <div class="info-item">
                <span class="info-label">Destination</span>
                <span class="info-value">${booking.destination}</span>
            </div>
            <div class="info-item">
                <span class="info-label">Check-in</span>
                <span class="info-value">${formatDate(booking.checkin)}</span>
            </div>
            <div class="info-item">
                <span class="info-label">Check-out</span>
                <span class="info-value">${formatDate(booking.checkout)}</span>
            </div>
            <div class="info-item">
                <span class="info-label">Room Type</span>
                <span class="info-value">${booking.roomType}</span>
            </div>
            <div class="info-item">
                <span class="info-label">Guests</span>
                <span class="info-value">${booking.guests}</span>
            </div>
            ${booking.roomNumber ? `
                <div class="info-item">
                    <span class="info-label">Room Number</span>
                    <span class="info-value">${booking.roomNumber}</span>
                </div>
            ` : ''}
        </div>
        <div class="action-buttons">
            ${booking.status === 'Confirmed' ? `
                <div class="room-number-input">
                    <input type="text" id="room-${booking.id}" placeholder="Room #" />
                    <button class="btn btn-primary btn-sm" onclick="checkIn('${booking.id}')">
                        <i class="fas fa-sign-in-alt"></i> Check In
                    </button>
                </div>
            ` : ''}
            ${booking.status === 'Checked-in' ? `
                <button class="btn btn-success btn-sm" onclick="checkOut('${booking.id}')">
                    <i class="fas fa-sign-out-alt"></i> Check Out
                </button>
            ` : ''}
        </div>
    `;
    
    return div;
}

// Check in
function checkIn(bookingId) {
    const roomNumber = document.getElementById(`room-${bookingId}`).value.trim();
    
    if (!roomNumber) {
        showNotification('Please enter a room number', 'error');
        return;
    }
    
    const bookings = getLocalData('hotelBookings');
    const booking = bookings.find(b => b.id === bookingId);
    
    if (booking) {
        booking.status = 'Checked-in';
        booking.roomNumber = roomNumber;
        setLocalData('hotelBookings', bookings);
        
        showNotification(`Guest checked in successfully to room ${roomNumber}`, 'success');
        loadDashboard();
    }
}

// Check out
function checkOut(bookingId) {
    if (!confirm('Are you sure you want to check out this guest?')) {
        return;
    }
    
    const bookings = getLocalData('hotelBookings');
    const booking = bookings.find(b => b.id === bookingId);
    
    if (booking) {
        booking.status = 'Completed';
        setLocalData('hotelBookings', bookings);
        
        showNotification('Guest checked out successfully', 'success');
        loadDashboard();
    }
}

function getStatusBadge(status) {
    const badges = {
        'Confirmed': '<span class="badge badge-warning">Pending Check-in</span>',
        'Checked-in': '<span class="badge badge-success">Checked-in</span>',
        'Completed': '<span class="badge badge-info">Completed</span>',
        'Cancelled': '<span class="badge badge-danger">Cancelled</span>'
    };
    return badges[status] || `<span class="badge">${status}</span>`;
}

// Initialize
loadDashboard();
