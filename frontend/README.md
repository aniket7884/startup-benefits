# 🚀 Startup Benefits Platform

A full-stack web application that helps startup founders discover and claim exclusive deals, cloud credits, and productivity tools.

This project was developed as part of a placement assignment to demonstrate full-stack development skills.

---

## 📌 Features

- User Signup & Login (JWT Authentication)
- Secure Password Hashing (bcrypt)
- Protected Routes
- Deals Listing Page
- User Dashboard
- Login/signp Feature
- Responsive UI with Animations

---

## 🛠️ Tech Stack

### Frontend
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion

### Backend
- Node.js
- Express.js
- MongoDB (Atlas)
- Mongoose
- JWT Authentication
- bcryptjs

---

## 📂 Project Structure
startup-benefits/
├── frontend/ → Next.js frontend
└── backend/ → Express backend

---

#setup instrunctions

```bash
git clone <repository-link>
cd startup-benefits
## backend-setup
cd backend
npm install

Create a .env file inside backend folder:
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
Run backend server:

npm run dev

3️⃣ Frontend Setup

Open a new terminal:

cd frontend
npm install
npm run dev
http://localhost:3000


🔐 Authentication Flow

User signs up using email and password

Password is encrypted using bcrypt

User logs in

JWT token is generated

Token is stored in browser localStorage

Protected routes verify JWT token

Challenges Faced

Connecting frontend with backend APIs

Implementing JWT authentication

Debugging login issues

Handling request body parsing

Fixing CORS and middleware errors

All issues were resolved through debugging and testing.

🚀 Future Improvements

Admin dashboard

Deal approval system

User profile management

Email verification

Better UI/UX

📬 Author

Name: Aniket Gupta

Role: Full Stack Developer (Beginner)
Purpose: Placement Assignment


