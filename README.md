# 🍔 Eatly

**Eatly** is a modern full-stack food delivery application built with **Next.js**, **TypeScript**, **Redux Toolkit**, and **Node.js/Express**. It features user authentication, menu browsing, and a shopping cart, all containerized with Docker for easy setup and deployment.

> ⚠️ **Note on Live Demo:** The backend is hosted on Render's free tier. **It may take 30–60 seconds to wake up** upon your first visit. Thank you for your patience!

🌐 **Live Demo:** [eatly-frontend-5lw5.onrender.com](https://eatly-frontend-5lw5.onrender.com)

📺 **Video Walkthrough:** [Link to YouTube/Loom/GIF here]

---

## 🚀 Features

### Frontend
- 🔥 **Next.js** for Server-Side Rendering and a fast user experience.
- ⚛️ **React + TypeScript** for a robust and type-safe component architecture.
- 🧠 **Redux Toolkit** for predictable global state management.
- ✅ **React Hook Form** for efficient and scalable form handling.
- 🎠 **Swiper** for creating interactive and touch-friendly sliders.
- 📱 Fully responsive design using **Tailwind CSS**.

### Backend
- ⚙️ **Express.js** server built with **Node.js** and **TypeScript**.
- 🗃️ RESTful API for managing users, products, orders, and authentication.
- 🔐 Secure user authentication with **Passport.js** (JWT & Google OAuth).
- 🧮 **MongoDB** with **Mongoose** for flexible data modeling and storage.

---

## 🔧 Tech Stack

| Technology               | Purpose                          |
| :----------------------- | :------------------------------- |
| **Next.js + TypeScript** | Frontend UI & SSR                |
| **Redux Toolkit**        | Global state management          |
| **Tailwind CSS**         | Utility-first styling            |
| **Express.js / Node.js** | Backend server                   |
| **MongoDB + Mongoose**   | Database                         |
| **Passport.js**          | Authentication (JWT, Google)     |
| **Docker**               | Containerization & easy setup    |

---

## 📥 How to Run Locally

### 1. Clone the repository

```bash
git clone https://github.com/ZozuliaMykyta/eatly.git
cd eatly
```

### 2. Environment Variables

Before running the project, set up your environment variables.

#### Backend

In the `backend/` directory, create a `.env` file:

```env
DATABASE_URL=mongodb+srv://<username>:<password>@cluster.mongodb.net/<dbname>
SECRET_KEY=your_jwt_secret_key
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
PORT=5000
```

#### Frontend

In the `frontend/` directory, create a `.env.local` file:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000
```

> **Note:** This repository does not include production data. After connecting your own MongoDB instance, the application will start with an empty database. You can add products and users through the UI or import your own dataset.

---

### 3. Run with Docker Compose *(Recommended)*

The simplest way to get the entire application running. Make sure you have **Docker Desktop** installed.

```bash
docker-compose up --build
```

- 🌐 **Frontend:** `http://localhost:3000`
- ⚙️ **Backend API:** `http://localhost:5000`

---

### 4. Manual Setup *(Without Docker)*

Open two terminal windows — one for the frontend, one for the backend.

**Install dependencies:**

```bash
# Backend
cd backend
npm install

# Frontend
cd frontend
npm install
```

**Start the servers:**

```bash
# Backend (port 5000)
cd backend
npm run dev

# Frontend (port 3000)
cd frontend
npm run dev
```
