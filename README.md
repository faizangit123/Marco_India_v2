# Marco India v2 — CCTV, Signal & Telecom Installation Services

A modern, full-stack business website for **Marco India**, a professional CCTV surveillance, signal boosting, and telecom infrastructure installation company based in India.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-20+-339933?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-4.x-000000?logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-4169E1?logo=postgresql&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-6-2D3748?logo=prisma&logoColor=white)

---

## 🏗️ Architecture

```
React + Vite (Frontend)
       ↓ Axios (JWT)
Node.js + Express (Backend)
       ↓ Prisma ORM
PostgreSQL (Database)
```

---

## 🚀 Features

- **Responsive Design** — Mobile-first layout with Framer Motion animations
- **Hero Carousel** — Auto-rotating carousel with 4 service-specific slides
- **Rotating Banner** — Subtle animated announcement strip
- **Service Showcase** — 6 dedicated service detail pages
- **User Authentication** — JWT (access + refresh tokens with rotation & blacklisting)
- **Google OAuth** — Google sign-in integration
- **Admin Dashboard** — Full admin panel with analytics, charts, user/content management
- **Service Request Form** — Customers can submit service inquiries
- **Project Gallery** — Showcase of completed installations with admin management
- **Testimonials & Reviews** — Customer feedback sections
- **Comment System** — Per-page user comments with admin moderation
- **Contact Forms** — Email notifications for inquiries and contacts
- **SEO Optimized** — Meta tags, Open Graph, Twitter Cards, JSON-LD structured data
- **Protected Routes** — Role-based access (user/admin)
- **Token Auto-Refresh** — Seamless JWT refresh with request queuing
- **Rate Limiting** — API protection against abuse
- **File Uploads** — Avatar, gallery, and testimonial image management

---

## 📁 Project Structure

```
Marco_India_v2/
├── Frontend/                        # React + Vite frontend
│   ├── src/
│   │   ├── api/client.js           # Axios HTTP client with JWT interceptors
│   │   ├── components/             # Reusable UI components
│   │   │   ├── HeroSection/        # Auto-rotating hero carousel
│   │   │   ├── RotatingBanner/     # Animated announcement banner
│   │   │   ├── Navbar/             # Responsive navigation
│   │   │   ├── AboutSection/       # Company about section
│   │   │   ├── ServicesSection/    # Service cards overview
│   │   │   ├── GallerySection/     # Image gallery grid
│   │   │   ├── TestimonialsSection/# Customer testimonials
│   │   │   ├── CTABanner/          # Call-to-action banner
│   │   │   ├── Footer/             # Site footer
│   │   │   └── ...
│   │   ├── contexts/AuthContext.jsx # Auth state management
│   │   ├── pages/                  # Route pages (Home, About, Services, Admin, etc.)
│   │   ├── App.jsx                 # Root component with routing
│   │   └── index.css               # Global styles
│   ├── package.json
│   └── vite.config.js
│
├── backend/                         # Node.js + Express backend
│   ├── prisma/schema.prisma        # Database schema
│   ├── src/
│   │   ├── config/index.js         # Environment configuration
│   │   ├── controllers/            # Route handlers
│   │   │   ├── auth.controller.js
│   │   │   ├── admin.controller.js
│   │   │   ├── inquiry.controller.js
│   │   │   ├── comment.controller.js
│   │   │   ├── gallery.controller.js
│   │   │   ├── testimonial.controller.js
│   │   │   └── contact.controller.js
│   │   ├── middleware/             # Express middleware
│   │   │   ├── auth.js             # JWT verification
│   │   │   ├── admin.js            # Admin-only guard
│   │   │   ├── errorHandler.js     # Centralized error handling
│   │   │   ├── rateLimiter.js      # Rate limiting
│   │   │   ├── upload.js           # Multer file uploads
│   │   │   └── validate.js         # Request validation
│   │   ├── routes/                 # Express route definitions
│   │   ├── services/               # Business logic services
│   │   │   ├── email.service.js    # Nodemailer email sending
│   │   │   └── google.service.js   # Google OAuth verification
│   │   ├── utils/validators.js     # Zod validation schemas
│   │   └── app.js                  # Express app setup
│   ├── server.js                   # Server entry point
│   ├── package.json
│   └── .env.example
│
├── railway.toml                     # Railway deployment config
└── README.md
```

---

## 🛠️ Tech Stack

| Category          | Technology                                     |
|-------------------|-------------------------------------------------|
| **Frontend**      | React 19, Vite 7, Framer Motion                |
| **Styling**       | CSS + Custom Design System                      |
| **Routing**       | React Router DOM v7                             |
| **HTTP Client**   | Axios (JWT interceptor + auto-refresh)          |
| **Charts**        | Recharts                                        |
| **Icons**         | Lucide React                                    |
| **Forms**         | React Hook Form + Zod                           |
| **Backend**       | Node.js, Express.js                             |
| **Database**      | PostgreSQL                                      |
| **ORM**           | Prisma                                          |
| **Authentication**| JWT (access + refresh tokens), Google OAuth     |
| **Email**         | Nodemailer                                      |
| **File Uploads**  | Multer                                          |
| **Security**      | Helmet, CORS, bcryptjs, express-rate-limit      |

---

## ⚡ Getting Started

### Prerequisites

- **Node.js** 18+
- **PostgreSQL** 14+

### Backend Setup

```bash
cd backend
npm install

# Copy and configure environment variables
cp .env.example .env
# Edit .env with your database URL, JWT secrets, etc.

# Run database migrations
npx prisma migrate dev

# Start the backend server
npm run dev
```

The backend API will be available at `http://localhost:5000`.

### Frontend Setup

```bash
cd Frontend
npm install

# Start the development server
npm run dev
```

The frontend will be available at `http://localhost:5173`.

---

### Environment Variables

#### Backend (.env)

| Variable                | Description                        |
|-------------------------|------------------------------------|
| `PORT`                  | Server port (default: 5000)        |
| `DATABASE_URL`          | PostgreSQL connection string       |
| `JWT_SECRET`            | Secret for access tokens           |
| `JWT_REFRESH_SECRET`    | Secret for refresh tokens          |
| `GOOGLE_OAUTH_CLIENT_ID`| Google OAuth client ID            |
| `FRONTEND_URL`          | Frontend URL for CORS/emails       |
| `CORS_ALLOWED_ORIGINS`  | Comma-separated allowed origins    |
| `EMAIL_HOST`            | SMTP host                          |
| `EMAIL_PORT`            | SMTP port                          |
| `EMAIL_USER`            | SMTP username                      |
| `EMAIL_PASSWORD`        | SMTP password                      |
| `EMAIL_FROM`            | Default sender email               |
| `ADMIN_EMAILS`          | Admin notification emails          |

#### Frontend

| Variable             | Default                 | Description          |
|----------------------|-------------------------|----------------------|
| `VITE_API_BASE_URL`  | `http://localhost:5000`  | Backend API base URL |

---

## 🔐 Authentication

JWT-based authentication with automatic token refresh:

1. **Login/Signup** → Receives `access` + `refresh` tokens
2. **Auto-Attach** → Axios interceptor adds `Bearer` token to all requests
3. **Auto-Refresh** → 401 responses trigger token refresh with request queuing
4. **Token Rotation** → Each refresh issues new access + refresh tokens, blacklists old
5. **Google OAuth** → Google sign-in verifies ID token server-side

---

## 🛡️ API Endpoints

| Endpoint | Method | Auth | Description |
|----------|--------|------|-------------|
| `/api/auth/register/` | POST | Public | User registration |
| `/api/auth/login/` | POST | Public | User login |
| `/api/auth/logout/` | POST | Auth | Blacklist refresh token |
| `/api/auth/google/` | POST | Public | Google OAuth login |
| `/api/auth/me/` | GET/PUT | Auth | Get/update profile |
| `/api/auth/change-password/` | POST | Auth | Change password |
| `/api/auth/password-reset/` | POST | Public | Request reset email |
| `/api/auth/token/refresh/` | POST | Public | Refresh JWT tokens |
| `/api/inquiries/` | GET/POST | Mixed | Service inquiries |
| `/api/comments/` | GET/POST | Mixed | Page comments |
| `/api/gallery/` | GET | Public | Gallery items |
| `/api/testimonials/` | GET | Public | Testimonials |
| `/api/contact/` | POST | Public | Contact form |
| `/api/admin/stats/` | GET | Admin | Dashboard statistics |
| `/api/admin/users/` | GET | Admin | User management |

---

## 📞 Contact

**Marco India**  
📍 ROAD no-8 Jawahar Nagar Mango Jamshedpur, Jharkhand-831012, India  
📧 info@marcoindia.in  
🌐 [marcoindia.in](https://marcoindia.in)
