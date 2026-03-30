# 📝 Examprep

Examprep is a full-stack web application built using the MERN stack that allows students to take exams online in a structured and user-friendly way.

I built this project to understand how real-world online examination systems work — from user authentication to test evaluation and result generation.

---

## 🚀 Features

- 🔐 User authentication (Signup / Login)
- 🧑‍🎓 Students can attempt exams
- 🛠️ Admin can create and manage tests
- ⏱️ Timer-based exams
- 📊 Automatic result calculation
- 📁 Organized question management

---

## 🛠️ Tech Stack

**Frontend**
- React.js
- HTML, CSS, JavaScript

**Backend**
- Node.js
- Express.js

**Database**
- MongoDB

---

## 📂 Project Structure

examprep/
│── client/        # React frontend  
│── server/        # Node + Express backend  
│── models/        # Database schemas  
│── routes/        # API routes  
│── controllers/   # Application logic  

---

## ⚙️ How to Run Locally

### 1. Clone the repository

git clone https://github.com/your-username/examprep.git  
cd examprep  

---

### 2. Install dependencies

**Backend**

cd server  
npm install  

**Frontend**

cd client  
npm install  

---

### 3. Setup environment variables

Create a `.env` file inside the server folder:

MONGO_URI=your_mongodb_connection  
PORT=5000  
JWT_SECRET=your_secret_key  

---

### 4. Run the application

**Start backend**

cd server  
npm start  

**Start frontend**

cd client  
npm start  

---

## 📈 Future Improvements

- Proctoring (tab switch / webcam detection)
- Performance analytics dashboard
- Better UI/UX
- Deployment

---

## 📌 Why I built this

I wanted to build something beyond basic CRUD apps, so I created an exam system that simulates real-world scenarios like timed tests and automatic evaluation.

---

## 📧 Contact

Chandresh Sahu  
📩 sahuchandresh46@email.com  

---

## ⭐ Support

If you found this project useful, consider giving it a star ⭐