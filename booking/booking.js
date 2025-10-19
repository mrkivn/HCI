/* Booking Module JavaScript */

// Check authentication
const user = checkAuth('customer');
if (user) {
    document.getElementById('userName').textContent = user.name.split(' ')[0];
}

// Booking data
let bookingData = {
    destination: '',
    checkin: '',
    checkout: '',
    nights: 0,
    guests: 0,
    roomType: '',
    roomPrice: 0,
    totalPrice: 0,
    paymentMethod: ''
};

// Room types
const roomTypes = [
    {
        type: 'Standard',
        price: 2500,
        features: ['Queen bed', 'WiFi', 'Air Conditioning', 'Cable TV', 'Private bathroom']
    },
    {
        type: 'Deluxe',
        price: 4000,
        features: ['King bed', 'WiFi', 'Premium amenities', 'Mini bar', 'City view', 'Work desk']
    },
    {
        type: 'Suite',
        price: 7000,
        features: ['Living room', 'King bed', 'Luxury amenities', 'Premium mini bar', 'Jacuzzi', 'Butler service']
    }
];

// Set minimum dates
function initializeDates() {
    const today = getTodayDate();
    const checkinInput = document.getElementById('checkin');
    const checkoutInput = document.getElementById('checkout');

    checkinInput.min = today;
    checkinInput.value = today;

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowStr = tomorrow.toISOString().split('T')[0];
    checkoutInput.min = tomorrowStr;
    checkoutInput.value = tomorrowStr;

    // Update checkout min when checkin changes
    checkinInput.addEventListener('change', () => {
        const selectedCheckin = new Date(checkinInput.value);
        selectedCheckin.setDate(selectedCheckin.getDate() + 1);
        checkoutInput.min = selectedCheckin.toISOString().split('T')[0];
        
        if (checkoutInput.value && new Date(checkoutInput.value) <= new Date(checkinInput.value)) {
            checkoutInput.value = selectedCheckin.toISOString().split('T')[0];
        }
    });
}

// Go to Step 2
function goToStep2() {
    const destination = document.getElementById('destination').value;
    const checkin = document.getElementById('checkin').value;
    const checkout = document.getElementById('checkout').value;
    const guests = parseInt(document.getElementById('guests').value);

    // Validation
    if (!destination) {
        showNotification('Please select a destination', 'error');
        return;
    }

    if (!checkin || !checkout) {
        showNotification('Please select check-in and check-out dates', 'error');
        return;
    }

    if (new Date(checkout) <= new Date(checkin)) {
        showNotification('Check-out date must be after check-in date', 'error');
        return;
    }

    if (guests < 1 || guests > 10) {
        showNotification('Number of guests must be between 1 and 10', 'error');
        return;
    }

    // Save data
    bookingData.destination = destination;
    bookingData.checkin = checkin;
    bookingData.checkout = checkout;
    bookingData.guests = guests;
    bookingData.nights = calculateNights(checkin, checkout);

    // Load rooms
    loadRooms();

    // Show step 2
    showStep(2);
}

// Load rooms
function loadRooms() {
    const roomCardsContainer = document.getElementById('roomCards');
    const nightsInfo = document.getElementById('nightsInfo');
    
    nightsInfo.textContent = `${bookingData.nights} night${bookingData.nights > 1 ? 's' : ''} • ${bookingData.guests} guest${bookingData.guests > 1 ? 's' : ''}`;

    roomCardsContainer.innerHTML = '';

    roomTypes.forEach(room => {
        const totalPrice = room.price * bookingData.nights;
        
        const card = document.createElement('div');
        card.className = 'room-card';
        card.onclick = () => selectRoom(room.type, room.price);
        
        card.innerHTML = `
            <h3>${room.type} Room</h3>
            <div class="room-price">
                ${formatPrice(room.price)} <small>per night</small>
            </div>
            <ul class="room-features">
                ${room.features.map(feature => `
                    <li><i class="fas fa-check"></i> ${feature}</li>
                `).join('')}
            </ul>
            <div class="total-price">
                Total: ${formatPrice(totalPrice)}
            </div>
        `;

        roomCardsContainer.appendChild(card);
    });
}

// Select room
function selectRoom(roomType, roomPrice) {
    // Remove previous selection
    document.querySelectorAll('.room-card').forEach(card => {
        card.classList.remove('selected');
    });

    // Add selection to clicked card
    event.currentTarget.classList.add('selected');

    // Save selection
    bookingData.roomType = roomType;
    bookingData.roomPrice = roomPrice;
    bookingData.totalPrice = roomPrice * bookingData.nights;

    // Enable continue button
    document.getElementById('continueToSummary').disabled = false;
}

// Go to Step 3
function goToStep3() {
    if (!bookingData.roomType) {
        showNotification('Please select a room type', 'error');
        return;
    }

    loadSummary();
    showStep(3);
}

// Load summary
function loadSummary() {
    const summaryContainer = document.getElementById('bookingSummary');

    summaryContainer.innerHTML = `
        <div class="summary-item">
            <span class="summary-label"><i class="fas fa-map-marker-alt"></i> Destination:</span>
            <span class="summary-value">${bookingData.destination}</span>
        </div>
        <div class="summary-item">
            <span class="summary-label"><i class="fas fa-calendar-check"></i> Check-in:</span>
            <span class="summary-value">${formatDate(bookingData.checkin)}</span>
        </div>
        <div class="summary-item">
            <span class="summary-label"><i class="fas fa-calendar-times"></i> Check-out:</span>
            <span class="summary-value">${formatDate(bookingData.checkout)}</span>
        </div>
        <div class="summary-item">
            <span class="summary-label"><i class="fas fa-moon"></i> Number of Nights:</span>
            <span class="summary-value">${bookingData.nights}</span>
        </div>
        <div class="summary-item">
            <span class="summary-label"><i class="fas fa-users"></i> Number of Guests:</span>
            <span class="summary-value">${bookingData.guests}</span>
        </div>
        <div class="summary-item">
            <span class="summary-label"><i class="fas fa-bed"></i> Room Type:</span>
            <span class="summary-value">${bookingData.roomType}</span>
        </div>
        <div class="summary-item">
            <span class="summary-label"><i class="fas fa-tag"></i> Price per Night:</span>
            <span class="summary-value">${formatPrice(bookingData.roomPrice)}</span>
        </div>
        <div class="summary-item">
            <span class="summary-label"><i class="fas fa-user"></i> Guest Name:</span>
            <span class="summary-value">${user.name}</span>
        </div>
        <div class="summary-item">
            <span class="summary-label"><i class="fas fa-envelope"></i> Email:</span>
            <span class="summary-value">${user.email}</span>
        </div>
        <div class="summary-item">
            <span class="summary-label"><i class="fas fa-phone"></i> Phone:</span>
            <span class="summary-value">${user.phone}</span>
        </div>
        <div class="summary-total">
            <span>Total Amount:</span>
            <span>${formatPrice(bookingData.totalPrice)}</span>
        </div>
    `;
}

// Select payment method
function selectPayment(method) {
    // Remove previous selection
    document.querySelectorAll('.payment-card').forEach(card => {
        card.classList.remove('selected');
    });

    // Add selection to clicked card
    event.currentTarget.classList.add('selected');

    // Save selection
    bookingData.paymentMethod = method;

    // Enable confirm button
    document.getElementById('confirmBtn').disabled = false;
}

// Confirm booking
function confirmBooking() {
    if (!bookingData.paymentMethod) {
        showNotification('Please select a payment method', 'error');
        return;
    }

    // Create booking object
    const booking = {
        id: generateId('GIN'),
        type: 'hotel',
        destination: bookingData.destination,
        checkin: bookingData.checkin,
        checkout: bookingData.checkout,
        nights: bookingData.nights,
        guests: bookingData.guests,
        roomType: bookingData.roomType,
        roomPrice: bookingData.roomPrice,
        totalPrice: bookingData.totalPrice,
        customerEmail: user.email,
        customerName: user.name,
        customerPhone: user.phone,
        paymentMethod: bookingData.paymentMethod,
        status: 'Confirmed',
        bookingDate: Date.now(),
        roomNumber: null // Will be assigned by front office during check-in
    };

    // Save to localStorage
    const hotelBookings = getLocalData('hotelBookings');
    hotelBookings.push(booking);
    setLocalData('hotelBookings', hotelBookings);

    // Show confirmation
    loadConfirmation(booking);
    showStep(4);

    showNotification('Booking confirmed successfully!', 'success');
}

// Load confirmation
function loadConfirmation(booking) {
    document.getElementById('bookingId').textContent = booking.id;

    const confirmationContainer = document.getElementById('confirmationDetails');
    confirmationContainer.innerHTML = `
        <div class="summary-item">
            <span class="summary-label"><i class="fas fa-map-marker-alt"></i> Destination:</span>
            <span class="summary-value">${booking.destination}</span>
        </div>
        <div class="summary-item">
            <span class="summary-label"><i class="fas fa-calendar-check"></i> Check-in:</span>
            <span class="summary-value">${formatDate(booking.checkin)}</span>
        </div>
        <div class="summary-item">
            <span class="summary-label"><i class="fas fa-calendar-times"></i> Check-out:</span>
            <span class="summary-value">${formatDate(booking.checkout)}</span>
        </div>
        <div class="summary-item">
            <span class="summary-label"><i class="fas fa-bed"></i> Room Type:</span>
            <span class="summary-value">${booking.roomType}</span>
        </div>
        <div class="summary-item">
            <span class="summary-label"><i class="fas fa-moon"></i> Nights:</span>
            <span class="summary-value">${booking.nights}</span>
        </div>
        <div class="summary-item">
            <span class="summary-label"><i class="fas fa-users"></i> Guests:</span>
            <span class="summary-value">${booking.guests}</span>
        </div>
        <div class="summary-item">
            <span class="summary-label"><i class="fas fa-credit-card"></i> Payment Method:</span>
            <span class="summary-value">${booking.paymentMethod}</span>
        </div>
        <div class="summary-total">
            <span>Total Paid:</span>
            <span>${formatPrice(booking.totalPrice)}</span>
        </div>
    `;
}

// Navigation between steps
function showStep(stepNumber) {
    // Hide all steps
    document.querySelectorAll('.booking-step').forEach(step => {
        step.classList.remove('active');
    });

    // Show selected step
    document.getElementById(`step${stepNumber}`).classList.add('active');

    // Update progress indicator
    const steps = document.querySelectorAll('.progress-steps .step');
    steps.forEach((step, index) => {
        step.classList.remove('active', 'completed');
        if (index + 1 < stepNumber) {
            step.classList.add('completed');
        } else if (index + 1 === stepNumber) {
            step.classList.add('active');
        }
    });

    // Scroll to top
    window.scrollTo(0, 0);
}

function goToStep1() {
    showStep(1);
}

function viewMyBookings() {
    window.location.href = '/my-bookings.html';
}

// Initialize
initializeDates();
