# GINHAWA Hotel & After Glow Restaurant Management System

## Overview
A complete hotel and restaurant management system demo built for HCI (Human-Computer Interaction) projects. The application features a modern gold and black theme with responsive design and department-specific staff dashboards.

## Recent Changes
- **October 18, 2025**: Complete redesign with gold/black theme
  - Removed React framework, converted to pure HTML/CSS/JavaScript
  - Implemented responsive navigation with hamburger menu
  - Added dark/light mode toggle with localStorage persistence
  - Created separate staff login portal with visible demo accounts
  - Built department-specific dashboards (Manager, Front Office, Kitchen, Bar, Housekeeping, Billing)
  - Added functional notification badges
  - Integrated Font Awesome icons throughout

## User Preferences
- **Color Theme**: Gold (#D4AF37) and Black (#000000) - no gradients
- **Icons**: Font Awesome instead of emojis
- **Design**: Clean, professional, responsive
- **Navigation**: Right-aligned menu items, hamburger menu on mobile
- **Footer**: Fixed to bottom of viewport

## Project Architecture

### File Structure
```
├── index.html                  # Customer portal (login/dashboard)
├── staff-login.html            # Staff login with demo accounts
├── staff-dashboard.html        # Department-specific staff dashboard
├── server.py                   # Python HTTP server (port 5000)
├── assets/
│   ├── css/
│   │   ├── base.css           # Theme colors, typography, base styles
│   │   ├── layout.css         # Navigation, footer, page layout
│   │   └── components.css     # Cards, buttons, forms, dashboard components
│   └── js/
│       ├── theme.js           # Dark/light mode toggle
│       └── nav.js             # Navigation and dropdown functionality
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
