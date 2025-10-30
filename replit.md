# GINHAWA Hotel & After Glow Restaurant Management System

## Overview
A complete hotel and restaurant management system built for HCI (Human-Computer Interaction) projects. The application features a modern gold and black theme with responsive design and department-specific staff dashboards.

**NOW WITH FIREBASE FIRESTORE DATABASE!** The system has been migrated from localStorage to Firebase Firestore for permanent cloud storage, suitable for Vercel deployment.

## Recent Changes

- **October 30, 2025**: Firebase Firestore Migration 🔥
  - **Migrated from localStorage to Firebase Firestore** for permanent cloud database storage
  - **Added Firebase SDK** (v9.x compat) via CDN to all 17 HTML files
  - **Created firebase-config.js**: Firebase initialization with environment variables
  - **Created firebase-db.js**: Firestore operation wrappers (getCollection, addDocument, updateDocument, deleteDocument, etc.)
  - **Updated shared-functions.js**:
    - Converted getLocalData/setLocalData to async Firestore operations
    - Added loading helpers: showButtonLoading(), hideButtonLoading(), withLoading()
    - Added error handling helpers: withErrorHandling(), showNotification()
    - Maintained backward compatibility with aliases
  - **Updated login.html**: Converted authentication to async/await with loading states
  - **Created deployment files**:
    - firestore.rules: Security rules for development (allow all read/write)
    - vercel.json: Vercel configuration for static site deployment
    - .env.example: Firebase environment variables template
    - .gitignore: Updated with Firebase-related exclusions
  - **Created FIREBASE_MIGRATION_GUIDE.md**: Complete guide for migrating remaining modules
  - **Ready for Vercel deployment** with Firebase backend
  - **Note**: Module JS files (booking, reservation, kitchen, etc.) need async/await conversion following the migration guide
- **October 24, 2025**: Major dashboard improvements
  - **Billing Dashboard**: Complete redesign focusing on payment confirmation workflow
    - Removed revenue metrics (not billing staff's responsibility)
    - Added payment verification system with Pending/Confirmed/Flagged statuses
    - Staff can confirm or flag payments with notes
    - Filter by payment method (Cash, Credit Card, GCash)
    - Tab system for Pending Verification, All Transactions, and Flagged payments
  - **Front Office Dashboard**: Redesigned for daily operations
    - Focus on today's arrivals and departures
    - Added room status overview (Available, Occupied, Cleaning, Maintenance)
    - Real-time occupancy rate display
    - 4 tabs: Today's Arrivals, Today's Departures, In-House Guests, Upcoming
    - Automatic room assignment on check-in
    - Room status updates automatically (Cleaning after checkout)
    - Better visual design with booking cards and color-coded room status
  - Applied blurred glass navigation effect across all pages
  - Prevented horizontal scrolling and zoom issues on mobile
  - Updated hero section background image

- **October 24, 2025**: UI updates to hide staff login
  - Removed "Staff Login" link from main navigation on all pages
  - Moved "Staff Member? Login here" link to below demo account section
  - Staff portal is now more discreetly accessible

- **October 24, 2025**: Added Room Facilities department
  - Created new Room Facilities staff department with dedicated dashboard
  - Added staff account: roomfacilities@hotel.com / room123
  - Features include:
    - View all 30 rooms with real-time status (Available, Occupied, Cleaning)
    - Filter rooms by status, type, and room number
    - View customer information for occupied rooms from hotel bookings
    - Interactive room cards showing guest details, check-in/out dates, and booking information
    - Room status management (change between Available and Cleaning)
    - Detailed room modal with complete guest and booking information
    - Statistics dashboard showing total, available, occupied, and cleaning rooms
  - Complete folder structure: room-facilities-dashboard.html, room-facilities.css, room-facilities.js

- **October 19, 2025**: Login pages redesign and branding updates
  - **Redesigned login pages (index.html & staff-login.html):**
    - Added navigation bar at the top matching customer-home layout
    - Added hero section with large GINHAWA branding
    - Made login cards responsive and wider (no longer skinny looking)
    - Moved demo account display outside of cards, positioned before footer
    - Added better footer matching customer-home design
    - Improved mobile responsiveness
  - **Branding updates:**
    - Applied Cinzel Decorative font to all "GINHAWA" text throughout the application
    - Removed "After Glow" from most pages (kept only in footer and food/drink sections)
    - Updated all staff dashboard logos with proper branding
    - Consistent brand-name class usage across all pages
  - **Code cleanup:**
    - Deleted test files (test_bookings.html, add_test_booking.html)
    - Fixed "My Bookings" button to properly redirect instead of showing alert

- **October 18, 2025**: Complete hotel & restaurant management system completed
  - Built My Bookings page with filtering and cancellation features
  - Created all 6 staff dashboards (Front Office, Kitchen, Bar, Housekeeping, Billing, Customer Guest)
  - Fixed critical tab switching bug in all staff dashboards
  - Removed all gradients to comply with solid color design requirement
  - Integrated localStorage for bookings, reservations, orders, and housekeeping requests
  - All customer and staff features fully functional
  - Fixed footer styling on login pages to match customer-home.html
  - Added Customer Guest staff role for viewing all customer information
  - Created Customer Guest dashboard showing registered customers with their bookings, orders, and reservations
  - Fixed kitchen dashboard data source to correctly display actual food orders from unified orders storage
  - All localStorage keys and field names aligned across the application

## User Preferences
- **Color Theme**: Gold (#D4AF37) and Black (#000000) - no gradients
- **Branding Font**: Cinzel Decorative for "GINHAWA" text only
- **Icons**: Font Awesome instead of emojis
- **Design**: Clean, professional, responsive
- **Navigation**: Right-aligned menu items, hamburger menu on mobile
- **Footer**: Fixed to bottom of viewport
- **Branding**: "After Glow" appears only in footer and food/drink related pages

## Project Architecture

### File Structure
```
├── index.html                              # Customer login page
├── customer-home.html                      # Customer dashboard
├── my-bookings.html                        # Customer booking history
├── staff-login.html                        # Staff login page
├── server.py                               # Python HTTP server (port 5000)
├── shared/
│   ├── shared-styles.css                   # Global styles, theme variables
│   └── shared-functions.js                 # Utility functions, auth, localStorage
├── booking/
│   ├── booking.html                        # Multi-step hotel booking flow
│   ├── booking.css                         # Booking page styles
│   └── booking.js                          # Booking logic
├── reservation/
│   ├── reservation.html                    # Restaurant reservation page
│   ├── reservation.css                     # Reservation page styles
│   └── reservation.js                      # Reservation logic
├── kitchen/
│   ├── order-food.html                     # Customer food ordering
│   ├── order-food.css                      # Food ordering styles
│   ├── order-food.js                       # Food ordering logic
│   └── kitchen-dashboard.html              # Staff kitchen dashboard
├── bar/
│   ├── order-drinks.html                   # Customer drinks ordering
│   ├── order-drinks.js                     # Drinks ordering logic
│   └── bar-dashboard.html                  # Staff bar dashboard
├── housekeeping/
│   ├── housekeeping-request.html           # Customer housekeeping requests
│   ├── housekeeping.css                    # Housekeeping styles
│   ├── housekeeping.js                     # Housekeeping logic
│   └── housekeeping-dashboard.html         # Staff housekeeping dashboard
├── front-office/
│   ├── front-office-dashboard.html         # Staff front office dashboard
│   ├── front-office.css                    # Front office styles
│   └── front-office.js                     # Check-in/out logic
├── billing/
│   └── billing-dashboard.html              # Staff billing dashboard
├── customer-guest/
│   └── customer-guest-dashboard.html       # Checked-in guest portal
└── room-facilities/
    ├── room-facilities-dashboard.html      # Staff room facilities dashboard
    ├── room-facilities.css                 # Room facilities styles
    └── room-facilities.js                  # Room management logic
```

### Technology Stack
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Icons**: Font Awesome 6.4.0 (CDN)
- **Storage**: localStorage for user sessions and theme preference
- **Server**: Python 3.11 HTTP server
- **Deployment**: Static hosting on port 5000

### Key Features

#### Customer Portal
- Login/Registration system with localStorage
- Hotel booking interface
- Restaurant reservation interface
- Food ordering system
- Housekeeping requests
- My Bookings management
- Dark/light theme toggle
- Responsive design with mobile navigation

#### Staff Portal
- Separate login page with visible demo accounts
- No department dropdown (accounts pre-assigned to departments)
- Department-specific dashboards:
  - **Manager**: Full access to all features, analytics, staff management
  - **Front Office**: Check-in/out, room status management
  - **Kitchen**: Food order queue, menu management
  - **Bar**: Drink order queue, inventory
  - **Housekeeping**: Service requests, cleaning schedule
  - **Billing**: Invoices, payment processing
  - **Customer Guest**: View all registered customers and their activity (bookings, orders, reservations)
  - **Room Facilities**: Room inventory management, view all rooms, customer information for occupied rooms, room status updates
- Functional notification badges showing pending items
- Responsive sidebar navigation
- Mobile-friendly with hamburger menu

### Demo Accounts

#### Customer Portal
- Email: customer@test.com
- Password: password123

#### Staff Portal
| Role | Email | Password |
|------|-------|----------|
| Manager | manager@hotel.com | admin123 |
| Front Office | frontdesk@hotel.com | front123 |
| Kitchen | kitchen@hotel.com | kitchen123 |
| Bar | bar@hotel.com | bar123 |
| Housekeeping | housekeeping@hotel.com | clean123 |
| Billing | billing@hotel.com | bill123 |
| Customer Guest | customerguest@hotel.com | guest123 |
| Room Facilities | roomfacilities@hotel.com | room123 |

## Running the Application

### Development
```bash
python3 server.py
```
The server runs on `http://0.0.0.0:5000/`

### Accessing the Application
- Customer Portal: `http://localhost:5000/` or `http://localhost:5000/index.html`
- Staff Portal: `http://localhost:5000/staff-login.html`

## Design Guidelines
- **No Gradients**: Use solid colors only (gold and black theme)
- **Icons**: Font Awesome for all icons, no emojis
- **Responsive**: Mobile-first approach with hamburger menu
- **Accessibility**: Clear labels, keyboard navigation support
- **Footer**: Always fixed to bottom of page
- **Theme Toggle**: Persists across sessions via localStorage

## Development Notes
- All data is stored in browser localStorage (demo purposes only)
- No backend database required
- Department-specific features prevent feature duplication
- Notification badges are clickable and navigate to relevant sections
- Mobile menu automatically collapses on larger screens
- Theme preference persists across page reloads

## Security Note
This is a **DEMO/PROTOTYPE** system for educational purposes:
- Passwords stored in plain text in localStorage
- No server-side validation
- No encryption
- Not suitable for production use
- Use only with demo data

## Browser Support
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Future Enhancements
- Backend API integration
- Real database storage
- Secure authentication
- Advanced booking features
- Payment gateway integration
- Email notifications
- Multi-language support
