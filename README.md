# Askly

Askly is a full-stack AI-powered chat application. Users can register, verify their email, log in, and have conversations with an AI assistant powered by Google Gemini and Mistral AI. Chat sessions are automatically titled using the Mistral model based on conversation content.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Environment Variables](#environment-variables)
- [API Reference](#api-reference)
- [Scripts](#scripts)

---

## Features

- User registration with email verification
- JWT-based authentication (access token + refresh token)
- AI chat using Google Gemini (gemini-2.5-flash-lite)
- Auto-generated chat titles using Mistral AI
- Protected routes on both frontend and backend
- Email sending via Nodemailer

---

## Tech Stack

### Backend
| Technology | Purpose |
|---|---|
| Node.js + Express 5 | REST API server |
| MongoDB + Mongoose | Database |
| LangChain + Google Gemini | AI response generation |
| LangChain + Mistral AI | Chat title generation |
| JSON Web Tokens (JWT) | Authentication |
| Nodemailer | Email verification |
| bcryptjs | Password hashing |
| Zod + express-validator | Input validation |

### Frontend
| Technology | Purpose |
|---|---|
| React 19 + Vite | UI framework & bundler |
| React Router v7 | Client-side routing |
| Redux Toolkit + React-Redux | State management |
| Tailwind CSS v4 | Styling |

---

## Project Structure

```
Askly/
├── backend/
│   ├── server.js              # Entry point
│   └── src/
│       ├── app.js             # Express app setup
│       ├── config/            # Database connection
│       ├── controllers/       # Route handlers
│       ├── middleware/        # Auth & error middleware
│       ├── models/            # Mongoose schemas (User, Chat, Message)
│       ├── routes/            # API routes
│       ├── services/          # AI & mail services
│       ├── templates/         # Email HTML templates
│       ├── utils/             # Utility helpers
│       └── validation/        # Request validation rules
└── frontend/
    ├── index.html
    └── src/
        ├── main.jsx
        ├── app/               # Router, store, global styles
        └── features/
            ├── auth/          # Login, Register pages & Redux slice
            └── chats/         # Dashboard page
```

---

## Getting Started

### Prerequisites

- Node.js >= 18
- MongoDB instance (local or [MongoDB Atlas](https://www.mongodb.com/atlas))
- Google Gemini API key
- Mistral AI API key
- SMTP credentials for Nodemailer

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend/` directory (see [Environment Variables](#environment-variables)).

```bash
npm run dev
```

The server starts on `http://localhost:8000` by default.

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend starts on `http://localhost:5174` by default.

---

## Environment Variables

Create a `backend/.env` file with the following variables:

```env
# Server
_PORT=8000

# MongoDB
MONGO_URI=your_mongodb_connection_string

# JWT
ACCESS_TOKEN=your_access_token_secret
ACCESS_TOKEN_EXPIRE=15m
REFRESH_TOKEN=your_refresh_token_secret
REFRESH_TOKEN_EXPIRE=7d
EMAIL_TOKEN=your_email_token_secret
EMAIL_TOKEN_EXPIRE=1d

# AI
GEMINI_API_KEY=your_google_gemini_api_key
MISTRAL_API=your_mistral_ai_api_key

# Email (Nodemailer)
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your_email@example.com
SMTP_PASS=your_email_password
```

---

## API Reference

### Auth — `/api/auth`

| Method | Endpoint | Description | Access |
|---|---|---|---|
| `POST` | `/register` | Register a new user | Public |
| `GET` | `/verify-email` | Verify user email via token | Public |
| `POST` | `/login` | Login and receive tokens | Public |
| `GET` | `/get-me` | Get current user info | Private |
| `GET` | `/logout` | Logout and clear tokens | Private |
| `POST` | `/resend-email` | Resend email verification link | Public |

### Chats — `/api/chats`

| Method | Endpoint | Description | Access |
|---|---|---|---|
| `POST` | `/message` | Send a message and receive an AI response | Private |

---

## Scripts

### Backend

| Command | Description |
|---|---|
| `npm run dev` | Start backend with nodemon (hot reload) |

### Frontend

| Command | Description |
|---|---|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
