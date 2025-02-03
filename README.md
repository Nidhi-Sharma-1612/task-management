# Task Manager App

A simple **Task Management Application** built with **Next.js, MongoDB, and Material UI**. Users can **add, edit, delete, and mark tasks as complete/incomplete**.

## 🚀 Live Demo

🔗 **Deployed Link:** [Task Manager App](https://your-deployed-url.vercel.app/)

## 🛠️ Features

- ✅ **Create, Edit, Delete Tasks**
- ✅ **Mark tasks as Complete/Incomplete**
- ✅ **Task Due Date Management**
- ✅ **Persistent Storage using MongoDB**
- ✅ **Modern UI with Material UI & Tailwind CSS**
- ✅ **Optimized for Mobile & Desktop (Responsive)**

## 📌 Tech Stack

- **Frontend:** Next.js, React, Material UI, Tailwind CSS
- **Backend:** Next.js API Routes (Server Actions)
- **Database:** MongoDB (Mongoose ORM)
- **Deployment:** Vercel

## 📂 Project Structure

```
task-manager/
│── app/
│   ├── api/
│   │   ├── tasks/           # API Routes for CRUD Operations
│── components/
│   ├── Header.js            # App Header Component
│   ├── Footer.js            # App Footer Component
│   ├── TaskList.js          # Task Listing Component
│   ├── TaskItem.js          # Individual Task Component
│   ├── TaskModal.js         # Task Form Modal Component
│── public/                  # Static Assets
│── styles/                  # Styling Files
│── .env                     # Environment Variables (MongoDB URI)
│── package.json             # Project Dependencies
│── README.md                # Project Documentation
```

## 🚀 Getting Started

### 1️⃣ Clone the Repository

```sh
git clone https://github.com/your-github-username/task-manager.git
cd task-manager
```

### 2️⃣ Install Dependencies

```sh
npm install
```

### 3️⃣ Set Up Environment Variables

Create a `.env.local` file and add your MongoDB URI:

```
MONGODB_URI=mongodb+srv://your-username:your-password@cluster.mongodb.net/mydatabase
```

### 4️⃣ Run the Development Server

```sh
npm run dev
```

Your app will be running at **http://localhost:3000**

## 🔥 API Endpoints

| Method | Endpoint         | Description       |
| ------ | ---------------- | ----------------- |
| GET    | `/api/tasks`     | Get all tasks     |
| POST   | `/api/tasks`     | Create a new task |
| PATCH  | `/api/tasks/:id` | Update a task     |
| DELETE | `/api/tasks/:id` | Delete a task     |
