# Marco India — CCTV, Signal & Telecom Installation Services

A modern, responsive business website for **Marco India**, a professional CCTV surveillance, signal boosting, and telecom infrastructure installation company based in India. Built with React, Vite, and CSS.

![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?logo=tailwindcss&logoColor=white)
![License](https://img.shields.io/badge/License-Private-red)

---

## 🌐 Live Demo

| Service | URL |
|---------|-----|
| **Frontend** | [https://skill-sync-sage-nu.vercel.app/](https://marco-india.vercel.app/) |

---

**SCREENSHOT**

<img width="1909" height="1077" alt="image" src="https://github.com/user-attachments/assets/3a179c4b-d0f8-43cc-9503-32cb6708bda3" />

<img width="1919" height="1075" alt="image" src="https://github.com/user-attachments/assets/c35cb71b-8d2f-4fec-828d-5c55b763041c" />

<img width="1904" height="1054" alt="image" src="https://github.com/user-attachments/assets/2aecf83c-5a66-4c58-985f-036844e1246e" />



## 🚀 Features

- **Responsive Design** — Fully mobile-first layout with smooth animations
- **Service Showcase** — 6 dedicated service detail pages
- **User Authentication** — Login, Signup, Forgot/Reset Password with JWT tokens
- **Google OAuth** — Google sign-in button (requires backend configuration)
- **Admin Dashboard** — Full admin panel with analytics, charts, user/content management
- **Service Request Form** — Customers can submit service inquiries directly
- **Project Gallery** — Showcase of completed installations
- **Testimonials & Reviews** — Customer feedback sections
- **Comment System** — User-generated comments
- **SEO Optimized** — Meta tags, Open Graph, Twitter Cards, JSON-LD structured data
- **Protected Routes** — Role-based access for users and admins
- **Token Auto-Refresh** — Seamless JWT refresh with request queuing

---

## 📁 Project Structure

```
├── public/                         # Static assets (favicon, robots.txt)
├── src/
│   ├── api/
│   │   └── client.js               # Axios HTTP client with JWT interceptors & token refresh
│   ├── assets/
│   │   └── gallery/                # Gallery images (CCTV, network, telecom, signal)
│   ├── components/
│   │   ├── AboutSection/           # Company about/intro section
│   │   ├── CTABanner/              # Call-to-action banner
│   │   ├── CommentSection/         # User comment system
│   │   ├── Footer/                 # Site footer with links, contact info, socials
│   │   ├── GallerySection/         # Image gallery grid
│   │   ├── HeroSection/            # Landing hero with service request form
│   │   ├── Navbar/                 # Responsive navbar with services dropdown
│   │   ├── ReviewSection/          # Customer reviews display
│   │   ├── ScrollToTop/            # Floating scroll-to-top button
│   │   ├── ServiceRequestForm/     # Service inquiry form (submits to backend API)
│   │   ├── ServicesSection/        # Service cards overview
│   │   ├── TestimonialsSection/    # Customer testimonials carousel
│   │   ├── AdminRoute.jsx          # Route guard — admin-only pages
│   │   └── ProtectedRoute.jsx      # Route guard — authenticated users
│   ├── contexts/
│   │   └── AuthContext.jsx         # Auth state management (login, signup, JWT, profile)
│   ├── hooks/                      # Custom React hooks (extensible)
│   ├── pages/
│   │   ├── admin/                  # Admin panel
│   │   │   ├── AdminLayout.jsx     # Sidebar layout with navigation
│   │   │   ├── Dashboard.jsx       # Stats overview with Recharts
│   │   │   ├── Analytics.jsx       # Detailed analytics
│   │   │   ├── ManageRequests.jsx  # Service request management
│   │   │   ├── ManageGallery.jsx   # Gallery CRUD
│   │   │   ├── ManageTestimonials.jsx # Testimonial CRUD
│   │   │   ├── ManageUsers.jsx     # User management
│   │   │   ├── ManageComments.jsx  # Comment moderation
│   │   │   ├── Notifications.jsx   # Admin notifications
│   │   │   └── Settings.jsx        # Admin settings
│   │   ├── services/               # Individual service pages
│   │   │   ├── ServicePageLayout.jsx # Shared layout for all service pages
│   │   │   ├── CCTVInstallation.jsx
│   │   │   ├── SignalBoosting.jsx
│   │   │   ├── TelecomInfrastructure.jsx
│   │   │   ├── FiberOpticCabling.jsx
│   │   │   ├── NetworkSetup.jsx
│   │   │   └── AMCMaintenance.jsx
│   │   ├── Home.jsx                # Landing page (Hero, Services, About, Gallery, Testimonials)
│   │   ├── About.jsx               # About us
│   │   ├── Services.jsx            # All services overview
│   │   ├── Gallery.jsx             # Full project gallery
│   │   ├── Careers.jsx             # Job listings
│   │   ├── Contact.jsx             # Contact form & info
│   │   ├── Login.jsx               # Login page with Google OAuth
│   │   ├── Signup.jsx              # Registration with Google OAuth
│   │   ├── ForgotPassword.jsx      # Password reset request
│   │   ├── ResetPassword.jsx       # Set new password
│   │   ├── Profile.jsx             # User profile (protected)
│   │   ├── PrivacyPolicy.jsx       # Privacy policy
│   │   ├── Terms.jsx               # Terms of service
│   │   ├── Sitemap.jsx             # HTML sitemap
│   │   └── NotFound.jsx            # 404 page
│   ├── App.jsx                     # Root component with all routes
│   ├── main.jsx                    # App entry point
│   └── index.css                   # Global styles & CSS design tokens
├── index.html                      # HTML template with SEO meta tags & JSON-LD
├── tailwind.config.ts              # Tailwind CSS configuration
├── vite.config.ts                  # Vite build configuration
└── package.json
```

---

## 🛠️ Tech Stack

| Category          | Technology                                     |
|-------------------|------------------------------------------------|
| **Framework**     | React 18 (JSX)                                 |
| **Build Tool**    | Vite 5                                         |
| **Styling**       | Tailwind CSS 3 + Custom CSS (BEM methodology) |
| **Routing**       | React Router DOM v6                            |
| **HTTP Client**   | Axios (JWT interceptor + auto-refresh)         |
| **Charts**        | Recharts                                       |
| **Icons**         | Lucide React                                   |
| **UI Primitives** | Radix UI                                       |
| **Forms**         | React Hook Form + Zod                          |
| **Testing**       | Vitest + React Testing Library                 |
| **Linting**       | ESLint 9                                       |

---

## ⚡ Getting Started

### Prerequisites

- **Node.js** 18+ or **Bun**
- A running backend API (Django REST Framework expected at `http://localhost:8000`)

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd marco-india

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`.

### Environment Variables

| Variable             | Default                 | Description          |
|----------------------|-------------------------|----------------------|
| `VITE_API_BASE_URL`  | `http://localhost:8000` | Backend API base URL |

---

## 🔐 Authentication

JWT-based authentication with automatic token refresh:

1. **Login/Signup** → Receives `access` + `refresh` tokens
2. **Auto-Attach** → Axios interceptor adds `Bearer` token to all requests
3. **Auto-Refresh** → 401 responses trigger token refresh with request queuing
4. **Google OAuth** → UI ready, requires backend endpoint setup

### Backend API Endpoints Expected

| Endpoint                     | Method | Description           |
|------------------------------|--------|-----------------------|
| `/api/auth/login/`           | POST   | User login            |
| `/api/auth/register/`        | POST   | User registration     |
| `/api/auth/me/`              | GET    | Get current user      |
| `/api/auth/me/`              | PUT    | Update profile/avatar |
| `/api/auth/change-password/` | POST   | Change password       |
| `/api/auth/token/refresh/`   | POST   | Refresh JWT token     |

---

## 🛡️ Route Protection

| Route         | Guard          | Access              |
|---------------|----------------|----------------------|
| `/profile`    | ProtectedRoute | Authenticated users  |
| `/admin/*`    | AdminRoute     | Admins only          |
| All others    | —              | Public               |

---

## 📋 Available Scripts

| Script               | Description              |
|----------------------|--------------------------|
| `npm run dev`        | Start development server |
| `npm run build`      | Production build         |
| `npm run build:dev`  | Development build        |
| `npm run preview`    | Preview production build |
| `npm run lint`       | Run ESLint               |
| `npm test`           | Run tests (Vitest)       |
| `npm run test:watch` | Tests in watch mode      |

---

## 🌐 SEO

- Meta tags, Open Graph, Twitter Cards
- JSON-LD LocalBusiness structured data
- Semantic HTML with proper ARIA labels
- HTML sitemap at `/sitemap`
- `robots.txt` for crawler guidance

---

## 📞 Contact

**Marco India**  
📍 ROAD no-8 Jawahar Nagar Mango Jamshedpur, Jharkhand-831012, India  
📧 info@marcoindia.in  
🌐 [marcoindia.in](https://marcoindia.in)

---
