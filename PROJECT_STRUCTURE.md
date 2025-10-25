# Daddy Leads - Project Structure Documentation

## Overview
This document provides a comprehensive overview of the Daddy Leads project structure, including relative paths and descriptions of all files and folders.

---

## Root Directory Files

### Configuration Files
- `README.md` - Project documentation and setup instructions
- `eslint.config.js` - ESLint configuration for code quality
- `index.html` - Main HTML entry point for the application
- `vite.config.ts` - Vite build tool configuration
- `tailwind.config.ts` - Tailwind CSS configuration with custom design tokens
- `tsconfig.json` - TypeScript configuration (read-only)
- `tsconfig.app.json` - TypeScript app-specific configuration (read-only)
- `tsconfig.node.json` - TypeScript Node.js configuration (read-only)
- `postcss.config.js` - PostCSS configuration (read-only)
- `components.json` - Shadcn UI components configuration (read-only)
- `package.json` - Project dependencies and scripts (read-only)
- `package-lock.json` - Locked versions of dependencies (read-only)
- `.gitignore` - Git ignore rules (read-only)

---

## `/public` Directory
Static assets that are served directly

### Files
- `public/favicon.ico` - Website favicon
- `public/robots.txt` - Search engine crawling instructions
- `public/placeholder.svg` - Placeholder image for development (read-only)

---

## `/src` Directory
Main source code directory

### Root Source Files
- `src/main.tsx` - Application entry point, renders React app
- `src/App.tsx` - Main App component with routing configuration
- `src/App.css` - Global application styles
- `src/index.css` - Global CSS with design system tokens (HSL colors, animations)
- `src/vite-env.d.ts` - TypeScript declarations for Vite

---

## `/src/assets` Directory
Image and media assets used in the application

### Files
- `src/assets/chrome-extension-icon.png` - Chrome extension icon image
- `src/assets/chrome-icon.png` - Chrome browser icon
- `src/assets/footer-landscape.png` - Footer decorative landscape image

---

## `/src/components` Directory
Reusable React components

### Authentication & Dashboard
- `src/components/ProtectedRoute.tsx` - Higher-order component for route protection
- `src/components/DashboardLayout.tsx` - Main dashboard layout with sidebar navigation

### Main Components
- `src/components/Navbar.tsx` - Navigation bar component with logo and menu
- `src/components/Footer.tsx` - Footer component with social links and company info
- `src/components/FAQSection.tsx` - FAQ accordion section with transparent background

### Hero & Landing Components
- `src/components/HeroSection.tsx` - Main hero section for homepage
- `src/components/HeroTextSection.tsx` - Hero text content component
- `src/components/AnimatedTitle.tsx` - Animated title component with effects
- `src/components/AnimatedBackground.tsx` - Animated background effects
- `src/components/AnimatedLines.tsx` - Animated line decorations
- `src/components/AnimatedStars.tsx` - Animated star particles

### Product Showcase Components
- `src/components/ProductShowcase.tsx` - Main product display component
- `src/components/ProductCard.tsx` - Individual product card component
- `src/components/FeaturePills.tsx` - Feature highlight pills

### Demo Components
- `src/components/ContactDemo.tsx` - Contact enrichment demo
- `src/components/ContactRowDemo.tsx` - Contact row display demo
- `src/components/EmailVerifyDemo.tsx` - Email verification demo
- `src/components/CSVEnrichDemo.tsx` - CSV enrichment demo
- `src/components/LinkedinDomainDemo.tsx` - LinkedIn domain scraping demo

### Section Components
- `src/components/EmailVerifySection.tsx` - Email verification feature section
- `src/components/EnrichSection.tsx` - Data enrichment feature section
- `src/components/LinkedinDomainSection.tsx` - LinkedIn domain scraping section
- `src/components/CSVDownloadSection.tsx` - CSV download feature section
- `src/components/TrustedBySection.tsx` - "Trusted by" logos section
- `src/components/ReviewsSection.tsx` - Customer reviews section
- `src/components/ScraperMarqueeSection.tsx` - Scraper tools marquee section

### Supporting Components
- `src/components/ReviewCard.tsx` - Individual review card
- `src/components/ScraperMarquee.tsx` - Marquee animation for scrapers
- `src/components/WaveDivider.tsx` - Wave-shaped divider element
- `src/components/WaveTransition.tsx` - Wave transition animation
- `src/components/FooterLandscapeDecoration.tsx` - Footer landscape decoration

---

## `/src/components/ui` Directory
Shadcn UI component library - Reusable, accessible UI primitives

### Layout & Structure
- `src/components/ui/card.tsx` - Card container component
- `src/components/ui/separator.tsx` - Visual separator line
- `src/components/ui/scroll-area.tsx` - Scrollable container
- `src/components/ui/aspect-ratio.tsx` - Aspect ratio container
- `src/components/ui/resizable.tsx` - Resizable panels

### Navigation
- `src/components/ui/navigation-menu.tsx` - Navigation menu component
- `src/components/ui/menubar.tsx` - Menu bar component
- `src/components/ui/breadcrumb.tsx` - Breadcrumb navigation
- `src/components/ui/pagination.tsx` - Pagination controls
- `src/components/ui/tabs.tsx` - Tab navigation component

### Form Elements
- `src/components/ui/button.tsx` - Button component with variants
- `src/components/ui/input.tsx` - Text input field
- `src/components/ui/textarea.tsx` - Multi-line text input
- `src/components/ui/label.tsx` - Form label component
- `src/components/ui/checkbox.tsx` - Checkbox input
- `src/components/ui/radio-group.tsx` - Radio button group
- `src/components/ui/switch.tsx` - Toggle switch
- `src/components/ui/slider.tsx` - Range slider
- `src/components/ui/select.tsx` - Dropdown select
- `src/components/ui/form.tsx` - Form wrapper with validation
- `src/components/ui/input-otp.tsx` - OTP input component
- `src/components/ui/calendar.tsx` - Date picker calendar

### Feedback & Overlays
- `src/components/ui/toast.tsx` - Toast notification component
- `src/components/ui/toaster.tsx` - Toast container/manager
- `src/components/ui/use-toast.ts` - Toast hook for notifications
- `src/components/ui/sonner.tsx` - Sonner toast library integration
- `src/components/ui/alert.tsx` - Alert message component
- `src/components/ui/alert-dialog.tsx` - Alert dialog modal
- `src/components/ui/dialog.tsx` - Modal dialog
- `src/components/ui/sheet.tsx` - Side sheet/drawer
- `src/components/ui/drawer.tsx` - Drawer component
- `src/components/ui/tooltip.tsx` - Tooltip component
- `src/components/ui/hover-card.tsx` - Hover card popup
- `src/components/ui/popover.tsx` - Popover component

### Display & Data
- `src/components/ui/table.tsx` - Table component
- `src/components/ui/avatar.tsx` - User avatar component
- `src/components/ui/badge.tsx` - Badge/tag component
- `src/components/ui/skeleton.tsx` - Loading skeleton
- `src/components/ui/progress.tsx` - Progress bar
- `src/components/ui/chart.tsx` - Chart component
- `src/components/ui/carousel.tsx` - Carousel/slider component

### Interactive
- `src/components/ui/accordion.tsx` - Accordion/collapsible sections
- `src/components/ui/collapsible.tsx` - Collapsible content
- `src/components/ui/command.tsx` - Command palette
- `src/components/ui/dropdown-menu.tsx` - Dropdown menu
- `src/components/ui/context-menu.tsx` - Right-click context menu
- `src/components/ui/toggle.tsx` - Toggle button
- `src/components/ui/toggle-group.tsx` - Toggle button group
- `src/components/ui/sidebar.tsx` - Sidebar component

---

## `/src/pages` Directory
Page-level components for routing

### Marketing Pages (Public)
- `src/pages/HomePage.tsx` - Landing page (route: `/`)
- `src/pages/ProductPage.tsx` - Products listing page (route: `/product`)
- `src/pages/PricingPage.tsx` - Pricing calculator page (route: `/pricing`)
- `src/pages/ConnectPage.tsx` - Demo request & contact page (route: `/connect`)

### Authentication Pages
- `src/pages/AccessPage.tsx` - Unified authentication page (routes: `/access?p=login` and `/access?p=signup`)
  - Handles both login and signup flows based on URL parameter
  - MongoDB-ready authentication structure
  - Google OAuth support

### Dashboard Pages (Protected)
- `src/pages/DashboardPage.tsx` - Main dashboard page showing Sales Navigator exports (route: `/dashboard`)
  - Uses DashboardLayout component
  - Protected by ProtectedRoute wrapper
  - Displays data table with export management

### Utility Pages
- `src/pages/ComingSoonPage.tsx` - Coming soon placeholder for unfinished dashboard pages
- `src/pages/NotFound.tsx` - 404 error page

---

## `/src/hooks` Directory
Custom React hooks

### Files
- `src/hooks/use-mobile.tsx` - Hook to detect mobile viewport
- `src/hooks/use-toast.ts` - Toast notification hook (moved from ui)

---

## `/src/lib` Directory
Utility functions and helpers

### Files
- `src/lib/utils.ts` - Utility functions (className merging, etc.)

---

## `/src/data` Directory
Mock data and constants

### Files
- `src/data/mockContacts.ts` - Mock contact data for demos

---

## Design System

### Color System (`src/index.css`)
- Uses HSL color format for all colors
- Primary brand color: `#411c78` (purple)
- Background color: `#faf8f0` (cream)
- All colors defined as CSS custom properties with HSL values

### Typography
- Font families defined in design system
- Responsive font sizes using Tailwind classes
- Custom heading and body text styles

### Animation System (`tailwind.config.ts`)
Available animations:
- `accordion-down` / `accordion-up` - For accordion transitions
- `fade-in` / `fade-out` - Fade animations
- `scale-in` / `scale-out` - Scale animations
- `slide-in-right` / `slide-out-right` - Slide animations
- Interactive hover effects with `.hover-scale` class

---

## Routing Structure

### Public Marketing Routes (daddy-leads.com)
- `/` - Homepage (HomePage)
- `/product` - ProductPage (20+ scraper tools listing)
- `/pricing` - PricingPage (B2B Leads Finder & B2B Data Scraper pricing)
- `/connect` - ConnectPage (Demo request form with social links)

### Authentication Routes
- `/access?p=login` - AccessPage (Login mode) - Can be accessed from either domain
- `/access?p=signup` - AccessPage (Signup mode) - Can be accessed from either domain

### Protected Dashboard Routes (app.daddy-leads.com)
All dashboard routes require authentication. Users are redirected to `/access?p=login` if not authenticated.

- `/dashboard` - Main dashboard (Sales Navigator Export)
- `/dashboard/sales-navigator` - Sales Navigator Export
- `/dashboard/url-enrichment` - URL Enrichment (Coming Soon)
- `/dashboard/email-finder` - Email Finder (Coming Soon)
- `/dashboard/email-verifier` - Email Verifier (Coming Soon)
- `/dashboard/credits` - Credits Management (Coming Soon)
- `/dashboard/team` - Team Management (Coming Soon)
- `/dashboard/api` - API Settings (Coming Soon)
- `/dashboard/account` - Account Settings (Coming Soon)

### Error Pages
- `*` - NotFound (404 page)

### URL Structure
- **Marketing pages**: Use main domain (e.g., daddy-leads.com)
- **Authentication pages**: Can work on both domains but typically on app subdomain (e.g., app.daddy-leads.com/access?p=login)
- **Dashboard pages**: Use app subdomain (e.g., app.daddy-leads.com/dashboard)
- All authentication routes are handled by a single AccessPage component that switches between login and signup modes based on the `p` query parameter

---

## Key Features

### Pages Overview

#### HomePage (`/`)
- Hero section with animated background
- Feature pills showcase
- Product showcase with cards
- Email verification demo
- LinkedIn domain scraping demo
- CSV enrichment demo
- Scraper marquee
- Trusted by section
- Reviews section
- Footer with social links

#### ProductPage (`/products`)
- 20+ scraper tools with detailed features
- Interactive product selector
- Email Enricher, Domain Enricher, LinkedIn scrapers
- Apollo, ZoomInfo, Crunchbase scrapers
- Google Maps, Yelp, directory scrapers
- FAQ section (transparent background)
- Social media contact icons with tooltips

#### PricingPage (`/pricing`)
- B2B Leads Finder: $0.001 per valid email
- B2B Data Scraper: $0.0005 per successful scrape
- Interactive pricing calculators
- Feature lists for each plan
- Get Connected section with social icons
- FAQ section (transparent background)

#### ConnectPage (`/connect`)
- Demo request form (name, email, company, message)
- Social media links with gradient icons (WhatsApp, Telegram, Discord)
- Tooltips on hover showing platform names
- Contact information

### Component Patterns
- All social icons wrapped in tooltips
- Consistent color scheme (#411c78 purple, #faf8f0 cream)
- Responsive design throughout
- Framer Motion animations
- Hover effects on interactive elements

---

## Technology Stack

### Core
- **React 18.3.1** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **React Router DOM 6.30.1** - Routing

### Styling
- **Tailwind CSS** - Utility-first CSS
- **Framer Motion 11.18.2** - Animations
- **Shadcn UI** - Component library
- **Radix UI** - Accessible primitives

### Forms & Validation
- **React Hook Form 7.61.1** - Form management
- **Zod 3.25.76** - Schema validation

### Additional Libraries
- **Lucide React 0.462.0** - Icons
- **React Helmet Async 1.3.0** - SEO meta tags
- **Recharts 2.15.4** - Charts
- **Sonner 1.7.4** - Toast notifications

---

## Development Guidelines

### Design System Rules
1. **Never use direct colors** - Always use semantic tokens from `index.css`
2. **All colors must be HSL format** - For consistency and theming
3. **Use design system variants** - Customize Shadcn components with proper variants
4. **Responsive by default** - All components must work on mobile
5. **Semantic HTML** - Use proper HTML5 semantic elements for SEO

### Component Structure
- Keep components focused and single-purpose
- Extract reusable logic into custom hooks
- Use TypeScript for type safety
- Follow React best practices (keys, refs, etc.)

### File Organization
- Components in `/src/components`
- Pages in `/src/pages`
- Hooks in `/src/hooks`
- Utils in `/src/lib`
- UI primitives in `/src/components/ui`

---

## SEO Implementation

All pages include:
- Unique title tags with keywords
- Meta descriptions (max 160 characters)
- Semantic HTML structure
- Descriptive alt text on images
- Proper heading hierarchy (H1 > H2 > H3)
- Canonical URLs
- Mobile-responsive design

---

## Build & Deployment

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
```

### Preview Build
```bash
npm run preview
```

---

## Contact & Social Links

The application includes social media integration on multiple pages:
- WhatsApp contact
- Telegram channel
- Discord community
- Facebook page
- Twitter/X profile
- LinkedIn company page
- Instagram account

All social icons feature:
- Gradient backgrounds
- Hover tooltips with platform names
- Scale animations on hover
- Consistent styling across pages

---

## Notes

### Read-Only Files
The following files cannot be modified through the AI editor:
- All config files in root (tsconfig.*, package.json, etc.)
- .gitignore
- public/favicon.ico
- public/placeholder.svg

### Dependencies
Managed through `lov-add-dependency` and `lov-remove-dependency` tools only.

### Color System
- Primary: #411c78 (deep purple)
- Background: #faf8f0 (cream/beige)
- All colors converted to HSL in CSS custom properties
- Semantic tokens used throughout

---

**Last Updated:** 2025-10-25
**Project:** Daddy Leads - B2B Lead Scraping Platform
**Framework:** React + TypeScript + Vite + Tailwind CSS
