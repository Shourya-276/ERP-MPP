# Property ERP - Real Estate Management Platform

A comprehensive, state-of-the-art Real Estate ERP platform designed to track and convert leads, monitor sales growth, measure team performance, and manage site bookings and registrations dynamically.

---

## 🚀 Key Features

* **Lead Management**: Complete receptionist workflow to add and follow up on customer enquiries with multilingual support (English and Marathi), signature capture, and CP (Channel Partner) tracking.
* **Sales Dashboard**: Comprehensive performance analytics, booking flows, cost sheet generators, and revisit trackers.
* **Role-Based Access**: Specialized interfaces for Receptionists, Receptionist 2 (iPad view), Sales Executives, and Admins.
* **Connected Database**: Powered by PostgreSQL (Neon) and Prisma ORM for seamless, resilient data modeling.

---

## 🛠️ Technology Stack

* **Frontend**: React, TypeScript, Vite, Tailwind CSS, shadcn/ui, Radix UI.
* **Backend**: Node.js, Express, ts-node, nodemon.
* **Database & ORM**: PostgreSQL, Prisma Client.

---

## 💻 Local Setup & Development

### 1. Prerequisites
Ensure you have Node.js and npm installed on your system.

### 2. Installation
Clone the repository and install all dependencies:
```bash
# Install root dependencies
npm install

# Install server dependencies (runs automatically postinstall, or manually)
npm install --prefix server
```

### 3. Environment Configuration
Create a `.env` file in the `server` directory and configure the database URL:
```env
DATABASE_URL="postgresql://user:password@host/db?sslmode=require"
PORT=5001
NODE_ENV=development
```

### 4. Database Setup & Seeding
Push the database schema and seed the initial users and projects:
```bash
cd server
npx prisma db push
npx prisma generate
npm run seed
```

### 5. Running the Application Locally
Run the development servers for both frontend and backend:

* **Start the Frontend Development Server** (from root):
  ```bash
  npm run dev
  ```
* **Start the Backend Server** (from `server` directory):
  ```bash
  npm run dev
  ```

---

## 📦 Deployment on Vercel

Both the React frontend and the Express backend are unified under a single monorepo config.
To deploy:
1. Push your changes to your Git repository.
2. Import the repository in **Vercel**.
3. Set your environment variables (like `DATABASE_URL`).
4. Vercel will automatically build the static frontend assets and serve the backend endpoints under `/api`.
