// Room Facilities Dashboard JavaScript

// Check authentication
const user = checkAuth('staff');

let currentTab = 'all';
let allRooms = [];
let allBookings = [];

// Load dashboard
function loadDashboard() {
    allRooms = getLocalData('rooms');
    allBookings = getLocalData('hotelBookings');
    updateStats();
    loadRooms();
}

// Update stats
function updateStats() {
    const rooms = getLocalData('rooms');
    
    const total = rooms.length;
    const available = rooms.filter(r => r.status === 'Available').length;
    const occupied = rooms.filter(r => r.status === 'Occupied').length;
    const cleaning = rooms.filter(r => r.status === 'Cleaning').length;

    document.getElementById('totalRooms').textContent = total;
    document.getElementById('availableRooms').textContent = available;
    document.getElementById('occupiedRooms').textContent = occupied;
    document.getElementById('cleaningRooms').textContent = cleaning;
}

// Switch tab
function switchTab(evt, tab) {
    currentTab = tab;
    
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    evt.currentTarget.classList.add('active');
    
    applyFilters();
}

// Apply filters
function applyFilters() {
    const statusFilter = document.getElementById('statusFilter').value;
    const typeFilter = document.getElementById('typeFilter').value;
    const searchRoom = document.getElementById('searchRoom').value.toLowerCase();
    
    let filteredRooms = [...allRooms];
    
    if (currentTab !== 'all') {
        const tabStatusMap = {
            'available': 'Available',
            'occupied': 'Occupied',
            'cleaning': 'Cleaning'
        };
        filteredRooms = filteredRooms.filter(r => r.status === tabStatusMap[currentTab]);
    }
    
    if (statusFilter !== 'all') {
        filteredRooms = filteredRooms.filter(r => r.status === statusFilter);
    }
    
    if (typeFilter !== 'all') {
        filteredRooms = filteredRooms.filter(r => r.type === typeFilter);
    }
    
    if (searchRoom) {
        filteredRooms = filteredRooms.filter(r => 
            r.number.toString().includes(searchRoom)
        );
    }
    
    displayRooms(filteredRooms);
}

// Load and display rooms
function loadRooms() {
    applyFilters();
}

// Display rooms
function displayRooms(rooms) {
    const container = document.getElementById('roomsGrid');
    
    if (rooms.length === 0) {
        container.innerHTML = '<p class="text-muted text-center">No rooms found.</p>';
        return;
    }
    
    rooms.sort((a, b) => a.number - b.number);
    
    container.innerHTML = '';
    rooms.forEach(room => {
        const card = createRoomCard(room);
        container.appendChild(card);
    });
}

// Create room card
function createRoomCard(room) {
    const div = document.createElement('div');
    div.className = `room-card ${room.status.toLowerCase()}`;
    
    const guestInfo = getGuestInfoForRoom(room.number);
    
    div.innerHTML = `
        <div class="room-card-header">
            <div>
                <div class="room-number"><i class="fas fa-door-closed"></i> Room ${room.number}</div>
                <div class="room-type">${room.type}</div>
            </div>
            <span class="room-status ${room.status.toLowerCase()}">${room.status}</span>
        </div>
        <div class="room-info">
            <div class="room-info-item">
                <span class="info-label">Price per night</span>
                <span class="info-value">${formatPrice(room.price)}</span>
            </div>
            <div class="room-info-item">
                <span class="info-label">Type</span>
                <span class="info-value">${room.type}</span>
            </div>
        </div>
        ${guestInfo ? `
            <div class="guest-info">
                <h4><i class="fas fa-user"></i> Current Guest</h4>
                <div class="guest-detail">
                    <span class="label">Name:</span>
                    <span class="value">${guestInfo.customerName}</span>
                </div>
                <div class="guest-detail">
                    <span class="label">Email:</span>
                    <span class="value">${guestInfo.customerEmail}</span>
                </div>
                <div class="guest-detail">
                    <span class="label">Phone:</span>
                    <span class="value">${guestInfo.customerPhone}</span>
                </div>
                <div class="guest-detail">
                    <span class="label">Check-in:</span>
                    <span class="value">${formatDate(guestInfo.checkin)}</span>
                </div>
                <div class="guest-detail">
                    <span class="label">Check-out:</span>
                    <span class="value">${formatDate(guestInfo.checkout)}</span>
                </div>
                <div class="guest-detail">
                    <span class="label">Booking ID:</span>
                    <span class="value">${guestInfo.id}</span>
                </div>
            </div>
        ` : ''}
        <div class="room-actions">
            <button class="btn btn-primary btn-sm" onclick="viewRoomDetails(${room.number})">
                <i class="fas fa-eye"></i> View Details
            </button>
            <button class="btn btn-secondary btn-sm" onclick="changeRoomStatus(${room.number})">
                <i class="fas fa-sync"></i> Change Status
            </button>
        </div>
    `;
    
    return div;
}

// Get guest info for a room
function getGuestInfoForRoom(roomNumber) {
    const booking = allBookings.find(b => 
        b.roomNumber === roomNumber && b.status === 'Checked-in'
    );
    return booking || null;
}

// View room details in modal
function viewRoomDetails(roomNumber) {
    const room = allRooms.find(r => r.number === roomNumber);
    if (!room) return;
    
    const guestInfo = getGuestInfoForRoom(roomNumber);
    const modal = document.getElementById('roomModal');
    const modalBody = document.getElementById('roomModalBody');
    
    modalBody.innerHTML = `
        <div class="detail-section">
            <h3><i class="fas fa-door-open"></i> Room Information</h3>
            <div class="detail-grid">
                <div class="detail-item">
                    <div class="label">Room Number</div>
                    <div class="value">${room.number}</div>
                </div>
                <div class="detail-item">
                    <div class="label">Room Type</div>
                    <div class="value">${room.type}</div>
                </div>
                <div class="detail-item">
                    <div class="label">Price per Night</div>
                    <div class="value">${formatPrice(room.price)}</div>
                </div>
                <div class="detail-item">
                    <div class="label">Status</div>
                    <div class="value">
                        <span class="room-status ${room.status.toLowerCase()}">${room.status}</span>
                    </div>
                </div>
            </div>
        </div>
        
        ${guestInfo ? `
            <div class="detail-section">
                <h3><i class="fas fa-user-circle"></i> Guest Information</h3>
                <div class="detail-grid">
                    <div class="detail-item">
                        <div class="label">Guest Name</div>
                        <div class="value">${guestInfo.customerName}</div>
                    </div>
                    <div class="detail-item">
                        <div class="label">Email</div>
                        <div class="value">${guestInfo.customerEmail}</div>
                    </div>
                    <div class="detail-item">
                        <div class="label">Phone</div>
                        <div class="value">${guestInfo.customerPhone}</div>
                    </div>
                    <div class="detail-item">
                        <div class="label">Booking ID</div>
                        <div class="value">${guestInfo.id}</div>
                    </div>
                </div>
            </div>
            
            <div class="detail-section">
                <h3><i class="fas fa-calendar-alt"></i> Booking Details</h3>
                <div class="detail-grid">
                    <div class="detail-item">
                        <div class="label">Check-in Date</div>
                        <div class="value">${formatDate(guestInfo.checkin)}</div>
                    </div>
                    <div class="detail-item">
                        <div class="label">Check-out Date</div>
                        <div class="value">${formatDate(guestInfo.checkout)}</div>
                    </div>
                    <div class="detail-item">
                        <div class="label">Number of Nights</div>
                        <div class="value">${guestInfo.nights}</div>
                    </div>
                    <div class="detail-item">
                        <div class="label">Number of Guests</div>
                        <div class="value">${guestInfo.guests}</div>
                    </div>
                    <div class="detail-item">
                        <div class="label">Destination</div>
                        <div class="value">${guestInfo.destination}</div>
                    </div>
                    <div class="detail-item">
                        <div class="label">Total Price</div>
                        <div class="value">${formatPrice(guestInfo.totalPrice)}</div>
                    </div>
                    <div class="detail-item">
                        <div class="label">Payment Method</div>
                        <div class="value">${guestInfo.paymentMethod}</div>
                    </div>
                    <div class="detail-item">
                        <div class="label">Booking Status</div>
                        <div class="value">${guestInfo.status}</div>
                    </div>
                </div>
            </div>
        ` : '<p class="text-muted">No guest currently occupying this room.</p>'}
        
        <div class="status-actions">
            ${room.status === 'Available' ? `
                <button class="btn btn-warning" onclick="updateRoomStatus(${room.number}, 'Cleaning'); closeRoomModal();">
                    <i class="fas fa-broom"></i> Mark as Cleaning
                </button>
            ` : ''}
            ${room.status === 'Cleaning' ? `
                <button class="btn btn-success" onclick="updateRoomStatus(${room.number}, 'Available'); closeRoomModal();">
                    <i class="fas fa-check"></i> Mark as Available
                </button>
            ` : ''}
            ${room.status === 'Occupied' ? `
                <button class="btn btn-info" disabled>
                    <i class="fas fa-info-circle"></i> Room Currently Occupied
                </button>
            ` : ''}
            <button class="btn btn-secondary" onclick="closeRoomModal()">
                <i class="fas fa-times"></i> Close
            </button>
        </div>
    `;
    
    modal.classList.add('show');
}

// Close room modal
function closeRoomModal() {
    const modal = document.getElementById('roomModal');
    modal.classList.remove('show');
}

// Change room status dialog
function changeRoomStatus(roomNumber) {
    const room = allRooms.find(r => r.number === roomNumber);
    if (!room) return;
    
    if (room.status === 'Occupied') {
        showNotification('Cannot change status of occupied room. Guest must check out first.', 'error');
        return;
    }
    
    const newStatus = room.status === 'Available' ? 'Cleaning' : 'Available';
    updateRoomStatus(roomNumber, newStatus);
}

// Update room status
function updateRoomStatus(roomNumber, newStatus) {
    const rooms = getLocalData('rooms');
    const roomIndex = rooms.findIndex(r => r.number === roomNumber);
    
    if (roomIndex === -1) return;
    
    rooms[roomIndex].status = newStatus;
    setLocalData('rooms', rooms);
    
    showNotification(`Room ${roomNumber} status updated to ${newStatus}`, 'success');
    
    allRooms = rooms;
    updateStats();
    loadRooms();
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('roomModal');
    if (event.target === modal) {
        closeRoomModal();
    }
}

// Initialize dashboard
document.addEventListener('DOMContentLoaded', () => {
    loadDashboard();
});
