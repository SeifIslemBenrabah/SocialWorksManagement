# ESI-SBA Committee Management System

A full-stack MERN-style web application for managing employee financial requests, committee meetings, and programme approvals at ESI SBA.

**Stack:** Node.js · Express · Sequelize ORM · MySQL · React 19 · React Router v7 · Tailwind CSS

---

## Project Structure

```
esi-sbaComitte/
├── backend/          # Express API server
│   ├── config/       # Database connection (Sequelize)
│   ├── controllers/  # Business logic
│   ├── middleware/   # JWT authentication
│   ├── models/       # Sequelize models
│   ├── Routes/       # Express routers
│   ├── uploads/      # Uploaded files (git-ignored)
│   ├── .env          # Environment variables (git-ignored)
│   ├── .env.example  # Template — copy this to .env
│   └── index.js      # Server entry point
└── frontend/         # React application
    └── src/
        ├── Auth/         # AuthContext & AuthWrapper
        ├── Assets/       # Images, logos
        └── Componenets/  # All React components
```

---

## Prerequisites

- **Node.js** v18 or later
- **MySQL** 8.x running locally
- A MySQL database named `project1cs` (or the name set in your `.env`)

---

## Setup

### 1. Clone the repository

```bash
git clone <repository-url>
cd esi-sbaComitte
```

### 2. Configure the backend environment

```bash
cd backend
cp .env.example .env
```

Open `backend/.env` and fill in your values:

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=project1cs
ACCESS_TOKEN_SECRET=<generate with: node -e "console.log(require('crypto').randomBytes(64).toString('hex'))">
REFRESH_TOKEN_SECRET=<generate with: node -e "console.log(require('crypto').randomBytes(64).toString('hex'))">
FRONTEND_URL=http://localhost:3000
```

### 3. Create the MySQL database

```sql
CREATE DATABASE project1cs CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 4. Create the uploads directory

```bash
mkdir backend/uploads
```

---

## Running the Project

Open **two terminals** — one for the backend, one for the frontend.

### Terminal 1 — Backend

```bash
cd backend
npm install
npm start
```

The API server will start on **http://localhost:5000**

On first run, Sequelize will auto-create all tables and seed the predefined roles (Admin, Employee, Committee members).

### Terminal 2 — Frontend

```bash
cd frontend
npm install
npm start
```

The React app will open automatically at:

**http://localhost:3000**

---

## Accessing the App

| URL | Description |
|-----|-------------|
| `http://localhost:3000` | Public landing page |
| `http://localhost:3000/login` | Login page |
| `http://localhost:3000/Admin` | Admin dashboard (role: Admin) |
| `http://localhost:3000/Committee` | Committee dashboard (role: Committee) |
| `http://localhost:3000/Employee` | Employee dashboard (role: Employee) |

> Routes are protected — the app redirects automatically based on the logged-in user's role.

---

## Creating the First Admin User

Since registration is admin-only, use the API directly to seed the first account:

```bash
# 1. POST to /login endpoint doesn't work yet — seed manually via MySQL

# Connect to MySQL
mysql -u root -p project1cs

# The roles are auto-seeded on server start:
# id=1 → Admin, id=2 → Employee, id=3 → President, id=4 → VP, id=5 → Treasurer, id=6 → Normal Member

# Insert a user
INSERT INTO Users (fullName, email, createdAt, updatedAt)
VALUES ('Admin User', 'admin@esi-sba.dz', NOW(), NOW());

# Get the inserted user id
SELECT id FROM Users WHERE email = 'admin@esi-sba.dz';

# Insert their account (password below is bcrypt hash of 'Admin@1234')
INSERT INTO Accounts (userId, roleId, password, createdAt, updatedAt)
VALUES (<user_id>, 1, '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', NOW(), NOW());
```

After seeding, log in with:
- **Email:** `admin@esi-sba.dz`
- **Password:** `Admin@1234`

Then use the Admin panel to create other users via `POST /users`.

---

## API Reference

All protected routes require the header:
```
Authorization: Bearer <token>
```

| Method | Route | Auth | Description |
|--------|-------|------|-------------|
| POST | `/login` | Public | Login, returns JWT + roletype |
| POST | `/users` | Admin | Create a new user + account |
| GET | `/users/employes` | Admin/Committee | List all employees |
| GET | `/users/commite` | Admin/Committee | List all committee members |
| GET | `/users/search?q=` | Admin | Search users by name or email |
| GET | `/Categorie` | Public | List categories |
| POST | `/Categorie` | Committee | Create category |
| GET | `/Programme` | Public | List programmes |
| POST | `/Programme` | Committee | Create programme |
| GET | `/Demand` | Admin/Committee | List all demands |
| POST | `/Demand` | Employee/Committee | Submit a demand (with file upload) |
| PUT | `/Demand/:id` | Admin/Committee | Update demand status |
| GET | `/Meet` | Committee | List meetings |
| POST | `/Meet` | Committee | Create meeting |
| GET | `/MeetingPv/:id` | Admin/Committee | Download meeting PV |
| POST | `/MeetingPv` | Committee | Upload meeting PV |
| GET | `/payment` | Admin/Committee | List payments |
| POST | `/payment` | Admin/Committee | Add payment |
| PUT | `/payment/:id` | Admin/Committee | Update payment |
| DELETE | `/payment/:id` | Admin/Committee | Delete payment |

---

## Roles

| ID | Type | Name |
|----|------|------|
| 1 | Admin | — |
| 2 | Employee | — |
| 3 | Committee | President |
| 4 | Committee | Vice President |
| 5 | Committee | Treasurer |
| 6 | Committee | Normal Member |

---

## File Uploads

- Accepted types: **PDF, JPEG, PNG**
- Max size: **5 MB** per file (10 MB for meeting PVs)
- Stored in: `backend/uploads/` (git-ignored)

---

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `PORT` | No | API port (default: 5000) |
| `DB_HOST` | Yes | MySQL host |
| `DB_USER` | Yes | MySQL username |
| `DB_PASSWORD` | Yes | MySQL password |
| `DB_NAME` | Yes | MySQL database name |
| `ACCESS_TOKEN_SECRET` | Yes | JWT signing secret (min 32 chars) |
| `FRONTEND_URL` | No | CORS origin (default: http://localhost:3000) |
