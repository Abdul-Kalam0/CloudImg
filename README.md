# 🚀 CloudImg – Cloud-Based Image Management Platform

CloudImg is a full-stack web application that allows users to securely upload, organize, and share images using a modern cloud-based architecture.

---

## 🌐 Live Demo

🔗 https://cloud-img-001.vercel.app/

---

## 📌 Features

- 🔐 Authentication (JWT + Google OAuth)
- 📂 Create and manage albums
- 🖼️ Upload and view images
- ⭐ Mark images as favorites
- 💬 Comment on images
- 🤝 Share albums with other users
- 📱 Fully responsive UI

---

## 🛠️ Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- React Router
- Axios

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)

### Authentication
- JWT (HTTP-only cookies)
- Google OAuth

### Deployment
- Frontend: Vercel  
- Backend: Vercel  

---

## 📁 Folder Structure

```
CloudImg/
│
├── frontend/
│   ├── src/
│   ├── components/
│   ├── pages/
│
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/Abdul-Kalam0/CloudImg
cd cloudimg
```

---

### 2️⃣ Setup Backend

```bash
cd backend
npm install
```

Create `.env` file:

```
PORT=3000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
GOOGLE_CLIENT_ID=your_google_client_id
```

Run backend:

```bash
npm run dev
```

---

### 3️⃣ Setup Frontend

```bash
cd frontend
npm install
```

Create `.env` file:

```
VITE_API_URL=http://localhost:3000
VITE_GOOGLE_CLIENT_ID=your_google_client_id
```

Run frontend:

```bash
npm run dev
```

---

## 🔐 Authentication Flow

### Email/Password Login
- User logs in → JWT token stored in HTTP-only cookies  
- Protected routes validated using `/auth/me`  

### Google OAuth
- User logs in via Google  
- Backend verifies credential  
- JWT cookie is issued  

---

## 📡 API Endpoints (Sample)

```
POST   /auth/register
POST   /auth/login
POST   /auth/google
GET    /auth/me
POST   /auth/logout

POST   /albums
GET    /albums
PUT    /albums/:id
DELETE /albums/:id

POST   /albums/:id/images
DELETE /albums/:id/images/:imageId

POST   /albums/:id/share
```

---

## 📊 Project Highlights

- ⚡ Built 10+ REST APIs  
- 🖼️ Supports 100+ image uploads  
- 🔐 Secure authentication with JWT + OAuth  
- 🚀 Deployed with cross-origin cookie handling  

---

## 🧠 Learnings

- Full-stack MERN architecture  
- Authentication & authorization  
- Handling cookies across domains  
- Building scalable REST APIs  
- UI/UX improvements with Tailwind  

---

## 🚧 Future Improvements

- Image compression & optimization  
- Drag & drop upload  
- Real-time collaboration  
- AI-based image tagging  
- Dark mode  

---

## ⭐ Show Your Support

If you found this useful:

👉 Star ⭐ this repo  
