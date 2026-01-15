# Task Manager Web App

A simple Task Management Web Application with user authentication, task creation, and management features.
---
## 💻 Tech Stack

**Frontend:**  
- React.js  
- Bootstrap / React-Bootstrap  
- Vite (or specify if used)  

**Backend:**  
- Node.js  
- Express.js  
- MongoDB / (or your database)  
- JWT for authentication  

---

## ⚙️ Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/Anurag061003/Task-Management-Web-Application.git
cd Task-Management-Web-Application

### 2. Backend setup
```bash
cd Back-end
npm install
# Create a .env file with your variables
# Example:
# PORT=4000
# JWT_SECRET=<your-jwt-secret>
npm start

### 3. Frontend setup
```bash
cd Front-end
npm install
# Create a .env file with your API URL
# Example:
# VITE_API_URL=http://localhost:4000
npm run dev

## 📌 API Documentation

### 1. User Routes

| Method | Endpoint       | Description                  |
|--------|-----------     |------------------------------|
| POST   | /auth/register | Register a new user          |
| POST   | /auth/login    | Login user and return JWT    |

### 2. Task Routes (Requires JWT)

| Method | Endpoint       | Description                        |
|--------|----------------|------------------------------------|
| GET    | /tasks         | Get all tasks for the logged-in user |
| POST   | /tasks         | Create a new task                  |
| PUT    | /tasks/:id     | Update a task (e.g., mark completed) |
| DELETE | /tasks/:id     | Delete a task                      |

> **Note:**  
> For routes that require authentication, include the JWT token in the `Authorization` header:  
> `Authorization: Bearer <your-token>`



