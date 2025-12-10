# Issue Tracker

A full-stack issue-tracking application built with **Next.js 16**, featuring a powerful dashboard, issue management system, and secure authentication.  
Users can create, edit, delete, and filter issues through a clean and modern interface.

---

## 🚀 Tech Stack

### Frontend / Full-Stack

- **Next.js 16**
- **React 19**
- **Radix UI Themes & Icons**
- **TailwindCSS 4**
- **React Hook Form**
- **React Query (@tanstack/react-query)**
- **Zod**
- **React Markdown**
- **Recharts**
- **React Loading Skeleton**
- **React Hot Toast**

### Backend

- **Next.js Route Handlers**
- **Prisma ORM**
- **PostgreSQL**
- **@prisma/adapter-pg**
- **@prisma/extension-accelerate**

### Authentication

- **NextAuth v5**
  - Google login
  - Credentials login
  - CSRF protection
  - Secure sessions
  - Middleware route protection

### Other Tools

- **bcrypt** (password hashing)
- **dotenv**
- **ESLint**
- **TypeScript**

---

## 📌 Features

### 🔐 Authentication

- Login with Google
- Login with email & password
- Protected pages using NextAuth `auth()`
- Middleware-based route protection

### 🗂 Issue Management

- Create new issues
- Edit existing issues
- Delete issues
- Filter issues by status
- Pagination
- Markdown support for descriptions
- Rich form validation using **Zod**
- Skeleton loading states

### 📊 Dashboard

- Issue statistics
- Latest issues
- Data visualization using **Recharts**

---

## 📦 Scripts

```bash
npm run dev      # Start development server
npm run build    # Build the application
```
