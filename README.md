# CRM System - Next-Gen Customer Relationship Management Platform

## 🚀 Quick Start

### Prerequisites
- Node.js >= 18.x
- PostgreSQL >= 15.x
- npm or yarn

### Installation

#### Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your database credentials
npm run dev
```

#### Frontend Setup
```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

### Access Application
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000

### Default Login Credentials
```
Email: admin@crmsystem.com
Password: Admin@123456
```

## 🐳 Docker Deployment
```bash
docker-compose up -d
```

## 📚 Features
- Lead Management (CRUD)
- Activity Timeline
- Real-time Notifications
- Dashboard Analytics
- Role-based Access Control
- Email Integration
- RESTful API

## 📖 Documentation
See PROJECT-SUMMARY.md for complete documentation.

## 🔐 Security
- JWT Authentication
- Password Hashing (bcryptjs)
- CORS Protection
- Rate Limiting
- Input Validation

## 📄 License
MIT License
