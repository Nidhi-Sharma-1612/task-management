# Task Manager App

A simple **Task Management Application** built with **Next.js Server Actions, MongoDB, and Material UI**. Users can **add, edit, delete, and mark tasks as complete/incomplete**.

## 🚀 Live Demo

🔗 **Deployed Link:** [Task Manager App](https://task-management-tan-chi.vercel.app/)

## 🛠️ Features

- ✅ **Create, Edit, Delete Tasks**
- ✅ **Mark tasks as Complete/Incomplete**
- ✅ **Task Due Date Management**
- ✅ **Persistent Storage using MongoDB**
- ✅ **Modern UI with Material UI & Tailwind CSS**
- ✅ **Optimized for Mobile & Desktop (Responsive)**
- ✅ **Built using Next.js Server Actions for better performance**

## 📌 Tech Stack

- **Frontend:** Next.js, React, Material UI, Tailwind CSS
- **Backend:** Next.js Server Actions (No API routes)
- **Database:** MongoDB (Mongoose ORM)
- **Deployment:** Vercel

## 📂 Updated Project Structure (Using Server Actions)

```
task-manager/
│── app/
│   ├── actions/
│   │   ├── taskActions.js        # Server Actions for CRUD operations
│   ├── components/
│   │   ├── Header.js             # App Header Component
│   │   ├── Footer.js             # App Footer Component
│   │   ├── TaskList.js           # Task Listing Component
│   │   ├── TaskItem.js           # Individual Task Component
│   │   ├── TaskModal.js          # Task Form Modal Component
│   │   ├── Tasks.js              # Main Task Management Component
│── lib/
│   ├── dbConnect.js              # Database Connection
│── models/
│   ├── Task.js                   # Task Model Schema
│── public/                        # Static Assets
│── styles/                        # Styling Files
│── .env.local                     # Environment Variables (MongoDB URI)
│── package.json                   # Project Dependencies
│── README.md                      # Project Documentation
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

## 🔥 Server Actions for Tasks

| Function       | Description       | File Location                |
| -------------- | ----------------- | ---------------------------- |
| `getTasks()`   | Get all tasks     | `app/actions/taskActions.js` |
| `createTask()` | Create a new task | `app/actions/taskActions.js` |
| `updateTask()` | Update a task     | `app/actions/taskActions.js` |
| `deleteTask()` | Delete a task     | `app/actions/taskActions.js` |
