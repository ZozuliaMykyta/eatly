# 🍔 Eatly

**Eatly** is a modern full-stack food delivery application built with **Next.js**, **TypeScript**, **Redux Toolkit**, and **Node.js/Express**. It features user authentication, menu browsing, and a shopping cart, all containerized with Docker for easy setup and deployment.

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

| Technology | Purpose |
|--------------------|-----------------------------------|
| Next.js + TypeScript | Frontend UI & SSR |
| Redux Toolkit | Global state management |
| Tailwind CSS | Utility-first styling |
| Express.js | Backend server |
| MongoDB + Mongoose | Database |
| Passport.js | Authentication (JWT, Google) |
| Docker | Containerization |

---

## 📥 How to Copy and Run This Project

### 1. Clone the repository
```bash
git clone https://github.com/ZozuliaMykyta/eatly.git
cd eatly
```

### 2. Environment Variables
Before running the project, you need to set up your environment variables.

#### Backend
In the `backend/` directory, create a new file named `.env` and add your configuration:

```env
DATABASE_URL=mongodb+srv://<username>:<password>@cluster.mongodb.net/<dbname>
SECRET_KEY=your_jwt_secret_key
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

#### Frontend
In the `frontend/` directory, create a new file named `.env.local` and specify the URL of your backend API:

```env
# For local development with Docker, this should point to your backend container
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000 
```

### 3. Run with Docker Compose (Recommended)
This is the simplest way to get the entire application running. Ensure you have Docker Desktop installed.

#### Build and run the containers
From the root directory of the project, run the following command:
```bash
docker-compose up --build
```

- The **frontend** will be available at `http://localhost:3000`.
- The **backend** API will be running at `http://localhost:5000`.
