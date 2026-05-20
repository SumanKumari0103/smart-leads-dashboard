# Smart Leads Dashboard

A full-stack Lead Management System built using the MERN stack with TypeScript.  
The application helps manage, track, and organize leads with authentication, filtering, pagination, and role-based access.

---

## Project Overview

Smart Leads Dashboard is designed to simulate a real-world CRM-like system where users can manage leads efficiently.  
It focuses on clean architecture, scalable backend design, and a responsive frontend UI.

---

## Tech Stack

Frontend:
- React.js
- TypeScript
- Tailwind CSS
- Axios

Backend:
- Node.js
- Express.js
- TypeScript
- MongoDB
- Mongoose
- JWT Authentication
- bcrypt.js

---

## Features

### Authentication
- User registration and login
- JWT-based authentication
- Protected routes
- Password hashing using bcrypt
- Auth middleware

### Leads Management
- Create leads
- Update leads
- Delete leads
- View all leads
- View single lead details

### Filtering & Search
- Filter by status (New, Contacted, Qualified, Lost)
- Filter by source (Website, Instagram, Referral)
- Search by name or email
- Sort by latest and oldest
- Combined filters support

### Pagination
- Backend pagination (10 records per page)
- Skip and limit implementation
- Pagination metadata in response

### Additional Features
- Debounced search
- CSV export functionality
- Role-based access (Admin / Sales User)
- Loading, error, and empty states
- Responsive UI

---

## Project Structure

client → Frontend (React + TypeScript)  
server → Backend (Node + Express + TypeScript)

---

## Setup Instructions

### Clone Repository
git clone https://github.com/your-username/smart-leads-dashboard.git

### Frontend Setup
cd client  
npm install  
npm run dev  

### Backend Setup
cd server  
npm install  
npm run dev  

---

## Environment Variables

Create a `.env` file inside server folder:

PORT=5000  
MONGO_URI=your_mongodb_connection_string  
JWT_SECRET=your_secret_key  

---

## Key Learnings

- Full-stack TypeScript development
- JWT authentication flow
- REST API design
- MongoDB schema design
- Scalable backend structure
- Real-world dashboard implementation
