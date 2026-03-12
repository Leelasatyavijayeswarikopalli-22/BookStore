# 📚 BookStore Backend

## 🚀 Project Overview

This project is the **backend of a MERN Stack BookStore application**.
It provides APIs for managing books, users, authentication, favorites, and orders.

The backend is built using **Node.js, Express.js, and MongoDB**, and it handles all server-side logic and database operations.

Frontend for this project is currently under development and will be integrated soon.

---

## 🛠️ Tech Stack

* **Node.js**
* **Express.js**
* **MongoDB**
* **Mongoose**
* **JWT Authentication**
* **Nodemon**

---

## 📂 Project Structure

```
BookStore/
│
├── Backend/
│   ├── conn/              # Database connection
│   ├── models/            # Mongoose schemas
│   │   ├── book.js
│   │   ├── user.js
│   │   └── order.js
│   │
│   ├── routers/           # API routes
│   │   ├── book.js
│   │   ├── favourite.js
│   │   ├── user.js
│   │   └── userAuth.js
│   │
│   ├── app.js             # Main server file
│   ├── package.json
│   └── package-lock.json
```

---

## ⚙️ Features

* User Signup & Login
* JWT Authentication
* Add / Remove Favorite Books
* Book Management APIs
* Order Management APIs
* MongoDB Database Integration
* Secure Backend API Structure

---

## 🔗 API Modules

The backend contains several API routes:

* **User APIs** – Signup, Login, Update Address
* **Book APIs** – Add, Delete, Fetch Books
* **Favourite APIs** – Add or remove books from favourites
* **Order APIs** – Manage user orders

All routes are implemented using **Express Router**.

---

## 🗄️ Database

MongoDB is used as the database and connected using **Mongoose**.

The following schemas are implemented:

* User Schema
* Book Schema
* Order Schema

---

## ▶️ Running the Project

### 1️⃣ Clone the repository

```bash
git clone https://github.com/yourusername/BookStore.git
```

### 2️⃣ Navigate to backend folder

```bash
cd BookStore/Backend
```

### 3️⃣ Install dependencies

```bash
npm install
```

### 4️⃣ Run the server

```bash
nodemon app.js
```

Server will start on:

```
http://localhost:1000
```

---

## 📌 Future Improvements

* React Frontend Integration
* Payment Gateway Integration
* Admin Dashboard
* Book Search & Filtering
* Deployment on Cloud

---

## 👨‍💻 Author

**Leela Satya Vijayeswari**

CSE Student | MERN Stack Learner
