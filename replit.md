# GINHAWA Hotel & After Glow Restaurant Management System

## Overview
The GINHAWA Hotel & After Glow Restaurant Management System is a comprehensive application designed for Human-Computer Interaction (HCI) projects. It offers a modern, responsive user interface with a distinctive gold and black theme. The system facilitates both customer and staff interactions, enabling hotel bookings, restaurant reservations, food/drink ordering, and housekeeping requests for customers. For staff, it provides department-specific dashboards to manage front office operations, kitchen and bar orders, housekeeping requests, billing, customer guest information, and room facilities. The system now utilizes Firebase Firestore for permanent cloud data storage, ensuring data persistence and readiness for Vercel deployment. Its core ambition is to provide a fully functional prototype demonstrating a complete hotel and restaurant management workflow.

## User Preferences
- **Color Theme**: Gold (#D4AF37) and Black (#000000) - no gradients
- **Branding Font**: Cinzel Decorative for "GINHAWA" text only
- **Icons**: Font Awesome instead of emojis
- **Design**: Clean, professional, responsive
- **Navigation**: Right-aligned menu items, hamburger menu on mobile
- **Footer**: Fixed to bottom of viewport
- **Branding**: "After Glow" appears only in footer and food/drink related pages

## System Architecture

### UI/UX Decisions
The system features a modern gold and black theme, eschewing gradients for solid colors. The branding consistently uses "Cinzel Decorative" for "GINHAWA" text and Font Awesome for all icons. Navigation is right-aligned on desktop with a hamburger menu for mobile responsiveness. A fixed footer is present across all pages. The overall design prioritizes cleanliness, professionalism, and responsiveness, employing a mobile-first approach.

### Technical Implementations
The application is built with HTML5, CSS3, and Vanilla JavaScript. It leverages Firebase Firestore for all data persistence, converting all synchronous `localStorage` operations to asynchronous `async/await` Firebase calls. Firebase SDK is integrated via CDN, with dedicated `firebase-config.js` and `firebase-db.js` modules for initialization and Firestore operation wrappers. Authentication and data handling are fully asynchronous, including real-time room assignment with availability checking and date overlap validation. Loading states are implemented for user feedback during asynchronous operations.

### Feature Specifications

#### Customer Portal
- User authentication and registration.
- Multi-step hotel booking with real room assignment (Standard, Deluxe, Suite rooms: 101-110, 201-220, 301-310), including availability and date overlap validation.
- Restaurant reservation system.
- Food and drink ordering.
- Housekeeping request submission.
- "My Bookings" page with booking history and cancellation functionality.
- Dark/light theme toggle.

#### Staff Portal
- Separate staff login with pre-assigned department roles.
- **Front Office Dashboard**: Manages check-ins/check-outs, real-time room status, occupancy rates, and daily arrivals/departures.
- **Kitchen Dashboard**: Manages food order queues.
- **Bar Dashboard**: Manages drink order queues.
- **Housekeeping Dashboard**: Manages service requests, accepting "Confirmed" or "Checked-in" booking statuses.
- **Billing Dashboard**: Manages payment verification (Pending/Confirmed/Flagged) and transaction filtering.
- **Customer Guest Dashboard**: Displays all registered customer information, bookings, orders, and reservations.
- **Room Facilities Dashboard**: Manages room inventory, views room status (Available, Occupied, Cleaning), assigns customers to occupied rooms, and updates room statuses.
- Functional notification badges and responsive sidebar navigation.

### System Design Choices
The project adopts a modular file structure, separating concerns by feature (e.g., `booking/`, `kitchen/`, `front-office/`). Shared styles and utility functions are centralized in the `shared/` directory. The application includes a Python HTTP server for local development. Data schemas are standardized, particularly for date fields (e.g., `checkin`/`checkout`).

## External Dependencies
- **Firebase Firestore**: Cloud-based NoSQL database for permanent data storage and real-time synchronization.
- **Firebase SDK (v9.x compat)**: Integrated via CDN for client-side interaction with Firebase services.
- **Font Awesome 6.4.0**: Used for all icons throughout the application (via CDN).