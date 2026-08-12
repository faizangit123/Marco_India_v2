# Marco India v2 Backend

Node.js Express backend for Marco India v2, replacing the Django backend.

## Requirements
- Node.js >= 18
- PostgreSQL

## Setup

1. Copy `.env.example` to `.env` and update the variables:
   ```bash
   cp .env.example .env
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Generate Prisma client and migrate database:
   ```bash
   npx prisma generate
   npx prisma migrate dev
   ```

4. Run the server:
   ```bash
   # Development
   npm run dev

   # Production
   npm start
   ```
