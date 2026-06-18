# Blog Posting App

A full-stack blog application built with React, Node.js, and Express.js. The application allows users to create, manage, and view blog posts through a modern React frontend while communicating with the backend using Axios.

---

## Features

- User Authentication (Login & Register)
- Create, edit, and delete blog posts
- View all blog posts
- User profile management
- Messaging system
- RESTful API architecture
- File upload support with Multer
- Responsive React UI
- Axios-based API communication

---

## Tech Stack

### Frontend
- React.js
- React Router
- Axios
- HTML5
- CSS3
- JavaScript (ES6+)

### Backend
- Node.js
- Express.js
- Multer
- REST API

---

## Project Structure

```text
Blog Posting App/
│
├── Backend/
│   ├── controllers/
│   ├── images/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── socket/
│   ├── utils/
│   ├── app.js
│   ├── package.json
│   └── .env
│
├── Frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
└── README.md
```

---

## Installation

### Clone the repository

```bash
git clone <repository-url>
cd blog-posting-app
```

### Install Backend

```bash
cd Backend
npm install
npm start
```

### Install Frontend

```bash
cd Frontend
npm install
npm run dev
```

---

## API Communication

The frontend communicates with the backend through REST APIs using **Axios**, enabling efficient data fetching and CRUD operations.

---

## License

This project is developed for learning and educational purposes.