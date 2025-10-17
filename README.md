# GINHAWA Hotel & After Glow Restaurant Management System

A complete hotel and restaurant management system demo built for HCI (Human-Computer Interaction) projects. This is a fully client-side application that runs on GitHub Pages with localStorage for data persistence.

## 🌟 Features

### Customer Portal (`index.html`)
- **User Authentication**: Login and registration system with validation
- **Hotel Booking System**: Multi-step booking flow with destination selection, room types (Standard, Deluxe, Suite), and payment options
- **Restaurant Reservations**: Date/time selection with indoor/outdoor seating preferences
- **Food & Drinks Ordering**: Interactive menu with shopping cart functionality
- **Housekeeping Requests**: Room service and maintenance request system
- **My Bookings**: View and manage all bookings and reservations with cancellation options

### Staff Portal (`staff.html`)
- **Department-Based Access**: Role-based access control for different staff departments
- **Dashboard**: Real-time statistics for bookings, orders, and revenue
- **Hotel Bookings Management**: Search, filter, and manage all hotel bookings with status updates
- **Restaurant Reservations Management**: Complete reservation management system
- **Front Office**: Check-in/check-out functionality with room assignment and 10-room status grid
- **Room Facilities**: Manage room statuses and details
- **Kitchen & Bar Orders**: Separate order queues with status tracking
- **Guest List**: Comprehensive customer database with booking history
- **Billing**: Invoice generation (INV- prefix) and payment processing
- **Housekeeping**: Task assignment and status tracking for housekeeping requests

## 🎨 Branding

- **Hotel Name**: GINHAWA
- **Hotel Tagline**: Experience Comfort and Relaxation
- **Restaurant Name**: After Glow
- **Restaurant Tagline**: Where Every Moment Glows
- **Booking ID Prefix**: GIN- (e.g., GIN-1697823456789)
- **Reservation ID Prefix**: AG- (e.g., AG-1697823456790)
- **Invoice ID Prefix**: INV- (e.g., INV-1697823456791)

## 🚀 GitHub Pages Deployment

### Quick Setup

1. **Create a GitHub Repository**
   ```bash
   # Initialize git in your project folder
   git init
   
   # Add all files
   git add .
   
   # Commit
   git commit -m "Initial commit: GINHAWA Hotel Management System"
   
   # Add remote repository (replace with your repo URL)
   git remote add origin https://github.com/yourusername/hotel-management.git
   
   # Push to GitHub
   git push -u origin main
   ```

2. **Enable GitHub Pages**
   - Go to your repository on GitHub
   - Click on **Settings**
   - Navigate to **Pages** (in the left sidebar)
   - Under **Source**, select **main** branch
   - Click **Save**
   - Your site will be published at: `https://yourusername.github.io/hotel-management/`

3. **Access the System**
   - Customer Portal: `https://yourusername.github.io/hotel-management/index.html`
   - Staff Portal: `https://yourusername.github.io/hotel-management/staff.html`

### Files Structure

```
hotel-management/
├── index.html          # Customer Portal (all CSS/JS embedded)
├── staff.html          # Staff Portal (all CSS/JS embedded)
└── README.md           # This file
```

## 👥 Demo Accounts

### Customer Portal
| Email | Password | Name |
|-------|----------|------|
| customer@test.com | password123 | Demo Customer |

### Staff Portal
| Email | Password | Name | Department |
|-------|----------|------|------------|
| manager@hotel.com | admin123 | Admin Manager | Manager (Full Access) |
| frontdesk@hotel.com | front123 | John Doe | Front Office |
| kitchen@hotel.com | kitchen123 | Chef Maria | Kitchen |
| bar@hotel.com | bar123 | Bartender Mike | Bar |
| housekeeping@hotel.com | clean123 | Sarah Clean | Housekeeping |
| billing@hotel.com | bill123 | Finance Ana | Billing |

## 📖 User Guide

### For Customers

1. **Register/Login**
   - Visit `index.html`
   - Create a new account or use demo credentials
   - Click "Register" to create a new account with your details

2. **Book a Hotel Room**
   - Click "Book GINHAWA Hotel" from the home page
   - Select destination and dates
   - Choose room type (Standard ₱2,500, Deluxe ₱4,000, Suite ₱7,000)
   - Review summary and select payment method
   - Confirm booking and receive booking ID (GIN-XXXXXXXXXX)

3. **Make a Restaurant Reservation**
   - Click "Reserve After Glow Restaurant"
   - Select date, time, and seating preference
   - Enter number of guests and special requests
   - Confirm reservation and receive reservation ID (AG-XXXXXXXXXX)

4. **Order Food & Drinks**
   - Navigate to "Order Food" from the menu
   - Browse food and drinks tabs
   - Add items to cart using +/- buttons
   - Enter table/room number
   - Place order and receive order ID (ORD-XXXXXXXXXX)

5. **Request Housekeeping**
   - Navigate to "Housekeeping"
   - Enter room number
   - Select service types (Room Cleaning, Fresh Towels, etc.)
   - Submit request and receive request ID (HK-XXXXXXXXXX)

6. **View Bookings**
   - Navigate to "My Bookings"
   - Filter by All/Hotels/Restaurants
   - Cancel bookings if status is Pending or Confirmed

### For Staff

1. **Login**
   - Visit `staff.html`
   - Enter email, password, and select department
   - Use demo credentials from the table above

2. **Dashboard**
   - View real-time statistics
   - Quick actions for walk-in bookings and reservations

3. **Manage Hotel Bookings** (Manager, Front Office, Billing, Reservation)
   - Search by booking ID or customer name
   - Filter by status
   - Update booking status: Pending → Confirmed → Checked-in → Checked-out
   - Create walk-in bookings
   - Delete bookings

4. **Manage Restaurant Reservations** (Manager, Front Office, Billing, Reservation)
   - Search and filter reservations
   - Update status: Pending → Confirmed → Seated → Completed
   - Add walk-in reservations
   - Delete reservations

5. **Front Office** (Manager, Front Office)
   - **Check-in**: Search booking, assign room, check-in guest
   - **Check-out**: Process check-out, room status changes to "Cleaning"
   - **Room Grid**: View all 10 rooms with color-coded status
     - Green: Available
     - Red: Occupied
     - Yellow: Cleaning

6. **Room Facilities** (Manager)
   - View all rooms (101-110)
   - Update room status
   - Monitor guest assignments

7. **Kitchen Orders** (Manager, Kitchen)
   - View food orders
   - Update status: Pending → Preparing → Ready → Delivered
   - Notification badge shows pending orders

8. **Bar Orders** (Manager, Bar)
   - View drinks orders
   - Update status: Pending → Preparing → Ready → Delivered
   - Notification badge shows pending orders

9. **Guest List** (Manager, Front Office)
   - View all customers
   - Search by name or email
   - See booking history for each guest

10. **Billing** (Manager, Billing)
    - Generate invoices with INV- prefix
    - Enter customer details, description, amount, payment method
    - View all invoices and transactions

11. **Housekeeping** (Manager, Housekeeping)
    - View all housekeeping requests
    - Update status: Pending → In Progress → Completed
    - Notification badge shows pending requests

## 🔧 Technical Details

### Technology Stack
- **Frontend**: Vanilla HTML5, CSS3, JavaScript (ES6+)
- **Fonts**: Inter (primary), JetBrains Mono (monospace for IDs)
- **Storage**: localStorage API
- **Deployment**: GitHub Pages (static hosting)

### Data Persistence
All data is stored in the browser's localStorage:
- `customers` - Customer accounts
- `staff` - Staff accounts
- `hotelBookings` - All hotel bookings
- `restaurantReservations` - All restaurant reservations
- `orders` - Food and drinks orders
- `housekeepingRequests` - Housekeeping service requests
- `rooms` - Room status and assignments (10 rooms: 101-110)
- `invoices` - Billing invoices

### Browser Compatibility
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

**Note**: localStorage is domain-specific, so data on your local machine won't transfer to GitHub Pages deployment.

## 🎯 Use Cases

### Academic Projects
- Human-Computer Interaction (HCI) demonstrations
- User Interface (UI) design projects
- User Experience (UX) case studies
- Software Engineering prototypes
- Database Management System (DBMS) concepts

### Demonstrations
- Hotel management workflows
- Restaurant booking systems
- Multi-role access control
- CRUD operations
- Responsive web design

## 🔒 Security Note

This is a **DEMO/PROTOTYPE** system for educational purposes:
- Passwords are stored in plain text in localStorage
- No server-side validation
- No encryption
- Not suitable for production use
- Do not use real personal data

## 🐛 Troubleshooting

### Data Not Persisting
- Check if localStorage is enabled in your browser
- Ensure you're not in Private/Incognito mode
- Check browser console for errors

### Can't Login
- Verify email and password match demo accounts
- Clear localStorage and refresh to reset: `localStorage.clear()`
- Check department matches staff account

### Booking Not Showing
- Ensure you're logged in with the same account
- Check "My Bookings" filter tabs
- Refresh the page

### Page Not Loading on GitHub Pages
- Wait 2-3 minutes after enabling GitHub Pages
- Check repository settings
- Ensure files are in the root directory
- Verify file names are exactly `index.html` and `staff.html`

## 🤝 Support

For questions or issues:
1. Check this README thoroughly
2. Verify demo credentials
3. Clear localStorage and try again
4. Check browser console for errors

## 📄 License

This project is created for educational purposes. Feel free to use and modify for your academic projects.

---

**© 2025 GINHAWA Hotel & After Glow Restaurant. All rights reserved.**

*Built with ❤️ for HCI Projects*
