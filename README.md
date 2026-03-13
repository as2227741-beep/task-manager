# 🗂️ TaskFlow — Full Stack Task Manager

A complete MERN stack task manager with authentication, CRUD, filters, and stats.

## 🛠️ Tech Stack

| Layer     | Tech                                 |
|-----------|--------------------------------------|
| Frontend  | React, Vite, Tailwind CSS, Axios     |
| Backend   | Node.js, Express.js                  |
| Database  | MongoDB + Mongoose                   |
| Auth      | JWT + bcryptjs                       |

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- MongoDB running locally (or use MongoDB Atlas)

---

### 1. Setup Backend

```bash
cd backend
npm install
```

Edit `.env` and set your MongoDB URI:
```
MONGO_URI=mongodb://localhost:27017/taskmanager
JWT_SECRET=your_secret_key_here
PORT=5000
```

Start the backend:
```bash
npm run dev     # with nodemon (auto-reload)
# OR
npm start       # production
```

Backend runs on → http://localhost:5000

---

### 2. Setup Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on → http://localhost:5173

---

## 📡 API Endpoints

### Auth
| Method | Endpoint            | Description       |
|--------|---------------------|-------------------|
| POST   | /api/auth/register  | Register user     |
| POST   | /api/auth/login     | Login user        |
| GET    | /api/auth/me        | Get current user  |

### Tasks (Protected — requires Bearer token)
| Method | Endpoint         | Description              |
|--------|------------------|--------------------------|
| GET    | /api/tasks       | Get all tasks (filters)  |
| POST   | /api/tasks       | Create task              |
| PUT    | /api/tasks/:id   | Update task              |
| DELETE | /api/tasks/:id   | Delete task              |
| GET    | /api/tasks/stats | Get task statistics      |

### Query Filters
```
GET /api/tasks?status=todo&priority=high&sort=dueDate
```

---

## ✨ Features

- ✅ User Registration & Login with JWT
- ✅ Create, Edit, Delete tasks
- ✅ Task status: To Do / In Progress / Completed
- ✅ Priority levels: Low / Medium / High
- ✅ Due dates with overdue detection
- ✅ Category tagging
- ✅ Filter by status & priority
- ✅ Search tasks by title/description
- ✅ Stats dashboard (total, todo, in-progress, completed, high priority)
- ✅ Inline status change from task card
- ✅ Fully responsive UI

---

## 📁 Project Structure

```
taskmanager/
├── backend/
│   ├── controllers/
│   │   ├── authController.js
│   │   └── taskController.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── User.js
│   │   └── Task.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── taskRoutes.js
│   ├── .env
│   ├── server.js
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── TaskCard.jsx
    │   │   ├── TaskModal.jsx
    │   │   └── StatsBar.jsx
    │   ├── context/
    │   │   └── AuthContext.jsx
    │   ├── pages/
    │   │   ├── Login.jsx
    │   │   ├── Register.jsx
    │   │   └── Dashboard.jsx
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── vite.config.js
    ├── tailwind.config.js
    └── package.json
```
