# GINHAWA Hotel & After Glow Restaurant Management System

## Overview
A complete hotel and restaurant management system demo built for HCI (Human-Computer Interaction) projects. The application features a modern gold and black theme with responsive design and department-specific staff dashboards.

## Recent Changes
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
└── customer-guest/
    └── customer-guest-dashboard.html       # Checked-in guest portal
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
