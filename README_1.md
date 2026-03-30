# 🐾 PawPath — Pet Adoption & Shelter Management System
**BCSE302L DA-II | Raunak Srivastav | 24BAI1412**

---

## Quick Start (3 Steps)

### 1. Setup Database
- Open **phpMyAdmin** or MySQL CLI
- Run `schema.sql` — this creates the database, all tables, and seed data

### 2. Install & Run Backend
```bash
# In the project folder:
npm install
node server.js
```
Server starts at → **http://localhost:3000**

> If your MySQL has a password, edit line 22 of `server.js`:
> `password: 'your_password_here'`

### 3. Open App
Visit **http://localhost:3000** in your browser.

---

## Default Login
| Username | Password | Role  |
|----------|----------|-------|
| admin    | password | Admin |
| raunak   | password | Staff |

---

## Project Structure
```
pawpath/
├── server.js          ← Node.js + Express backend (all API routes)
├── schema.sql         ← MySQL database schema + seed data
├── package.json       ← Dependencies
└── public/
    └── index.html     ← Complete frontend (login + dashboard)
```

---

## Features (DA-II Checklist ✅)
| Requirement | Implemented |
|---|---|
| Login system | ✅ bcrypt hashed passwords, session auth |
| View all records | ✅ All 5 tables |
| First / Last navigation | ✅ All tables |
| Search | ✅ Real-time search per table |
| Insert (from frontend) | ✅ Modal forms |
| Update (from frontend) | ✅ Pre-filled edit modals |
| Delete (from frontend) | ✅ With confirmation |
| Logical processing | ✅ Adoption Rate % per shelter (Report page) |
| Auto-adopt trigger | ✅ Pet status changes to "Adopted" on approval |

---

## Tech Stack
- **Frontend**: HTML5, CSS3, Vanilla JS
- **Backend**: Node.js + Express
- **Database**: MySQL
- **Auth**: express-session + bcryptjs
