# GINHAWA Hotel & After Glow Restaurant - Design Guidelines

## Design Approach

**Hybrid Strategy**: Reference-based for customer-facing portal (inspired by Airbnb hospitality aesthetics + Booking.com functionality) and systematic approach for staff portal (Material Design principles for data management).

**Design Philosophy**:
- Customer Portal: Warm, welcoming, aspirational - prioritize emotional engagement and trust
- Staff Portal: Efficient, scannable, action-oriented - prioritize productivity and clarity
- Unified brand identity through consistent color and typography

---

## Core Design Elements

### A. Color Palette

**Primary Brand Colors**:
- GINHAWA Teal: `186 65% 45%` (hotel primary)
- After Glow Amber: `30 85% 55%` (restaurant accent)
- Charcoal: `220 15% 20%` (dark mode background)
- Slate: `220 10% 96%` (light mode background)

**Dark Mode**:
- Background: `220 15% 12%`
- Surface: `220 15% 18%`
- Surface Elevated: `220 15% 22%`
- Text Primary: `0 0% 98%`
- Text Secondary: `220 10% 70%`
- Border: `220 15% 28%`

**Light Mode**:
- Background: `0 0% 100%`
- Surface: `220 10% 98%`
- Surface Elevated: `0 0% 100%`
- Text Primary: `220 20% 15%`
- Text Secondary: `220 10% 45%`
- Border: `220 15% 88%`

**Semantic Colors**:
- Success: `142 76% 45%`
- Warning: `38 92% 50%`
- Error: `0 84% 60%`
- Info: `217 91% 60%`

**Status Color System**:
- Available/Confirmed: Success green
- Pending/Cleaning: Warning amber
- Occupied/In Progress: Info blue
- Cancelled/Unavailable: Error red

### B. Typography

**Font Stack**: 
- Primary: 'Inter', system-ui, -apple-system, sans-serif (via Google Fonts CDN)
- Monospace: 'JetBrains Mono', monospace (for IDs, room numbers)

**Type Scale**:
- Hero Heading: text-5xl md:text-6xl, font-bold, tracking-tight
- Page Title: text-3xl md:text-4xl, font-semibold
- Section Heading: text-2xl md:text-3xl, font-semibold
- Card Title: text-xl, font-semibold
- Body Large: text-lg, font-normal
- Body: text-base, font-normal
- Small: text-sm, font-normal
- Tiny: text-xs, font-medium (labels, badges)

### C. Layout System

**Spacing Primitives**: Tailwind units of 3, 4, 6, 8, 12, 16, 20, 24
- Micro spacing: p-3, gap-3 (tight elements)
- Standard spacing: p-4, p-6, gap-4 (cards, sections)
- Section spacing: py-12, py-16, py-20 (vertical rhythm)
- Large spacing: py-24 (hero sections)

**Grid System**:
- Mobile: Single column, full-width cards
- Tablet: 2-column grid for cards (md:grid-cols-2)
- Desktop: 3-column for features (lg:grid-cols-3), 2-column for major sections

**Container Widths**:
- Customer Portal: max-w-7xl (wider, more breathing room)
- Staff Portal: max-w-screen-2xl (data-dense tables)
- Forms: max-w-2xl (focused reading width)

### D. Component Library

**Navigation**:
- Customer: Floating header with glass-morphism effect, blur-md backdrop, shadow-lg
- Staff: Persistent sidebar (w-64) with collapsible sections, top header for user info
- Logo: Large text-based logo "GINHAWA | After Glow" with teal/amber split styling
- Active states: Solid background with primary color, inactive with opacity-70

**Cards**:
- Elevated cards: rounded-2xl, shadow-lg, border with opacity-10
- Hover states: scale-102, shadow-xl transition
- Room/Menu cards: Aspect ratio 16:9 placeholder, gradient overlay for text readability
- Booking cards: Timeline indicator on left, status badge top-right

**Buttons**:
- Primary CTA: Solid teal/amber, text-white, px-8 py-3, rounded-xl, font-semibold
- Secondary: Outline with border-2, hover fills with bg-opacity-10
- Ghost: Hover bg-opacity-5 of primary color
- Icon buttons: Square aspect ratio, rounded-lg, p-3

**Forms**:
- Input fields: rounded-lg, border-2, px-4 py-3, focus:ring-4 with primary color at opacity-10
- Consistent dark mode: All inputs maintain dark background with lighter borders
- Labels: text-sm font-medium, mb-2, text-secondary
- Validation: Error states with red border-2, success with green tick icon

**Data Display**:
- Tables: Alternating row colors, sticky headers, hover highlight
- Status badges: Rounded-full, px-3 py-1, text-xs font-bold, uppercase
- Stats cards: Large number display (text-4xl font-bold), label below, icon top-right
- Timeline: Vertical line with circular status nodes

**Modals & Overlays**:
- Backdrop: bg-black/50 with backdrop-blur-sm
- Content: rounded-2xl, max-w-2xl, shadow-2xl
- Close button: Absolute top-4 right-4, icon button

---

## Customer Portal Specifics

**Hero Section** (Home after login):
- Full viewport height (min-h-screen), gradient background from teal to amber at 45deg angle
- Welcome message: text-5xl font-bold, centered
- Two large action cards (w-full md:w-96): Glass-morphism with backdrop-blur, rounded-3xl
- Icons: Large (w-20 h-20) with gradient backgrounds

**Booking Flow**:
- Step indicator: Horizontal progress bar with numbered circles, completed steps in primary color
- Room selection cards: Grid layout, large image placeholder with gradient overlay
- Price display: Prominent in top-right corner of cards, text-3xl font-bold
- Summary panel: Sticky sidebar on desktop showing running total

**My Bookings**:
- Filter tabs: Pill-shaped, horizontal scroll on mobile
- Booking cards: Timeline view with date on left, details on right
- Action buttons: Positioned at bottom-right of each card

**Menu/Ordering**:
- Two-panel layout: Menu items left (scrollable), cart right (sticky)
- Menu item cards: Horizontal layout with image, name, price, +/- controls
- Cart: Fixed bottom on mobile, sidebar on desktop, quantity badges

---

## Staff Portal Specifics

**Dashboard**:
- Stats grid: 4-column on desktop (lg:grid-cols-4), auto-responsive
- Chart placeholders: min-h-64, rounded-xl cards
- Recent activity feed: Scrollable list with avatar, action text, timestamp

**Management Tables**:
- Compact row height, zebra striping
- Action column: Icon buttons (view, edit, delete) with tooltips
- Search/filter bar: Sticky top-0, glass-morphism background
- Bulk actions: Checkbox column with select-all header

**Front Office**:
- Room grid: 2x5 layout showing all 10 rooms
- Room cards: Square aspect ratio, large room number, color-coded status
- Check-in/out forms: Side-by-side layout on desktop

**Kitchen/Bar Orders**:
- Kanban board layout: Pending | Preparing | Ready | Delivered columns
- Order cards: Draggable (visual indication), timer countdown display
- Notification badges: Absolute positioned, animated pulse for new orders

---

## Images

**Customer Portal**:
- Hero Section: NO large hero image (use gradient background instead)
- Room Cards: Placeholder images for Standard/Deluxe/Suite rooms (aspect-16/9, object-cover)
- Menu Items: Small square thumbnails (w-20 h-20, rounded-lg) for food and drinks

**Staff Portal**:
- Minimal imagery, focus on data density
- User avatars: Circular, 40px diameter in headers
- No decorative images

---

## Accessibility & Polish

- Maintain consistent dark mode across all inputs, forms, and surfaces
- Focus states: 4px ring with primary color at 50% opacity
- Loading states: Skeleton screens with shimmer effect
- Empty states: Centered illustration placeholder + helpful message + primary CTA
- Animations: Subtle scale and opacity transitions (duration-200), NO complex animations
- Responsive breakpoints: Mobile-first, tablet at 768px, desktop at 1024px