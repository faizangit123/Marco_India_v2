# Marco India v2 — Technology & Infrastructure Solutions

A modern, full-stack enterprise website for **Marco India**, a professional CCTV surveillance, network infrastructure, fiber optics, signal boosting, telecom, and AMC maintenance installation company based in India.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-20+-339933?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-4.x-000000?logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-7-47A248?logo=mongodb&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-8-880000?logo=mongoose&logoColor=white)

---

## 🏗️ Architecture

```
React 19 + Vite (Frontend SPA)
       ↓ Axios (JWT Interceptor)
Node.js + Express (Backend API)
       ↓ Mongoose
MongoDB (Database)
```

---

## 🚀 Features

- **Awwwards-Style UI/UX** — Modern warm light theme with near-black charcoal contrast and terracotta accent (`#C75B2B`)
- **Cinematic Hero Carousel** — Auto-rotating carousel with editorial typography and subtle motion effects
- **Interactive Service Detail Pages** — 6 dedicated service pages with embedded background imagery and dark gradient overlays
- **Sticky Callback Request Form** — Elevated light card callback request form with instant validation
- **User Authentication** — JWT (access + refresh tokens with rotation & blacklisting)
- **Google OAuth** — Seamless Google sign-in integration
- **Admin Dashboard** — Complete management panel for inquiries, contacts, gallery, testimonials, users, comments, and analytics
- **Viewport Counter Animation** — Animated statistics bar triggered on scroll
- **Floating Scroll-To-Top** — Accessible floating navigation back to page top
- **Project Gallery** — Portfolio grid of completed enterprise infrastructure installations
- **Reviews & Testimonials** — Ratings, feedback, and customer reviews system
- **SEO & Accessibility** — Optimized meta tags, structured data, high-contrast typography, and reduced motion support

---

## 📁 Project Structure

```
Marco_India_v2/
├── Frontend/                        # React 19 + Vite frontend
│   ├── src/
│   │   ├── api/client.js           # Axios HTTP client with JWT interceptors
│   │   ├── components/             # Reusable UI components
│   │   │   ├── HeroSection/        # Hero carousel with editorial slides
│   │   │   ├── Navbar/             # Dynamic high-contrast navigation
│   │   │   ├── StatsSection/       # Viewport-triggered animated counters
│   │   │   ├── ServicesSection/    # Key services overview grid
│   │   │   ├── AboutSection/       # Editorial about section
│   │   │   ├── GallerySection/     # Masonry portfolio showcase
│   │   │   ├── TestimonialsSection/# Customer reviews and ratings
│   │   │   ├── ServiceRequestForm/ # Elevated callback request form
│   │   │   ├── CTABanner/          # Global action banner
│   │   │   ├── ScrollToTop/        # Floating scroll-to-top button
│   │   │   └── Footer/             # Multi-column footer
│   │   ├── contexts/AuthContext.jsx # Auth state management
│   │   ├── pages/                  # Route pages (Home, About, Services, Contact, etc.)
│   │   │   └── services/           # Individual service pages (CCTV, Network, Fiber, etc.)
│   │   ├── App.jsx                 # Main application router
│   │   └── index.css               # Global CSS variables & typography
│   ├── package.json
│   └── vite.config.js
│
├── backend/                         # Node.js + Express backend
│   ├── src/
│   │   ├── config/                 # Environment & DB configurations
│   │   ├── controllers/            # Express route controllers
│   │   ├── middleware/             # JWT auth, rate limiters, validation
│   │   ├── models/                 # Mongoose schemas (User, Inquiry, Comment, etc.)
│   │   ├── routes/                 # Express API router definitions
│   │   └── app.js                  # Express application setup
│   ├── server.js                   # Entry point with zero-config startup
│   ├── package.json
│   └── .env.example
└── README.md
```

---

## 🛠️ Tech Stack

| Category          | Technology                                      |
|-------------------|-------------------------------------------------|
| **Frontend**      | React 19, Vite 7, Framer Motion                 |
| **Styling**       | CSS Custom Properties + Design Tokens           |
| **Routing**       | React Router DOM v7                             |
| **HTTP Client**   | Axios (JWT interceptor + auto-refresh)          |
| **Charts**        | Recharts                                        |
| **Icons**         | Lucide React                                    |
| **Backend**       | Node.js, Express.js                             |
| **Database**      | MongoDB                                         |
| **ODM**           | Mongoose                                        |
| **Authentication**| JWT (Access + Refresh Token Rotation), Google OAuth |
| **Email**         | Nodemailer                                      |
| **File Uploads**  | Multer                                          |
| **Security**      | Helmet, CORS, bcryptjs, express-rate-limit      |

---

## ⚡ Getting Started

### Prerequisites

- **Node.js** 18+
- **MongoDB** (Local instance or MongoDB Atlas cluster)

### Backend Setup

```bash
cd backend
npm install

# Start development server (Zero-config: creates .env automatically if missing)
npm run dev
```

The backend server will run on `http://localhost:5000`.

### Frontend Setup

```bash
cd Frontend
npm install

# Start development server
npm run dev
```

The frontend application will be available at `http://localhost:5173`.

---

## 🔐 Authentication & API

JWT-based authentication flow with automatic token refresh:

1. **Login / Register** → Issues `accessToken` and `refreshToken`
2. **Authorization** → Axios automatically attaches `Bearer <token>` to requests
3. **Silent Refresh** → Intercepts 401 responses and securely rotates tokens
4. **Role Guards** → Protected routes enforcing user/admin roles

---

## 📞 Contact Information

**Marco India**  
📍 ROAD no-8 Jawahar Nagar Mango, Jamshedpur, Jharkhand-831012, India  
📞 **+91 9315501070**  
📧 [marcoindia@gmail.com](mailto:marcoindia@gmail.com)  
🌐 [marco-india-v2.vercel.app](https://marco-india-v2.vercel.app)
