# 🎯 Phase 2: Backend Setup - Node.js + PostgreSQL

## ✅ تەواو شد!

هەموو فایلانەی Backend API ئامادە کراون:

### 📁 دروستکراو فایلەکان:

```
backend-api/
├── src/
│   ├── config/
│   │   └── database.js              ✅ PostgreSQL Config
│   ├── models/
│   │   ├── User.js                  ✅ User Model
│   │   └── Shipment.js              ✅ Shipment Model
│   ├── middleware/
│   │   └── auth.ts                  ✅ JWT Middleware
│   ├── routes/
│   │   ├── auth.ts                  ✅ Auth Routes
│   │   └── shipments.ts             ✅ Shipment Routes
│   └── server.ts                    ✅ Main Server
├── .env.example                     ✅ Environment Template
└── package.json                     ✅ Dependencies
```

---

## 🔧 دامەزراندن و رووداندن

### 1️⃣ **Dependencies دامەزراندن**

```bash
cd backend-api
npm install
```

### 2️⃣ **.env فایل ئامادەکردن**

```bash
cp .env.example .env
```

دوای ئەوەی `.env` بکەیتەوە و ئەم شتانە پڕ بکە:

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=globall_cloud
DB_USER=postgres
DB_PASSWORD=your_postgres_password    # 👈 خۆتا PostgreSQL پاسوۆرد بنووسە
PORT=5000
JWT_SECRET=your-super-secret-key
```

### 3️⃣ **Database دروستکردن (PostgreSQL)**

PSQL یان pgAdmin لە کۆمپیوتەرەکەت بکە شاڕ:

```sql
CREATE DATABASE globall_cloud;
```

### 4️⃣ **سیرڤەر رووداندن**

```bash
npm run dev
```

ئەگەر سەرکەفتی بوو، ئەم پەیامە ببینیت:

```
✅ PostgreSQL Connected Successfully
✅ Database Synced
🚀 Server running on http://localhost:5000
```

---

## 🧪 API تاقیکردنەوە

### 📝 Register (ثبت نام)

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "علی",
    "phone": "+964750000000",
    "email": "ali@example.com",
    "password": "password123",
    "location": "Erbil"
  }'
```

**جواب (Response):**
```json
{
  "message": "User created successfully",
  "userId": 1,
  "customerCode": "GC-5432"
}
```

### 🔑 Login

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "phone": "+964750000000",
    "password": "password123"
  }'
```

**جواب:**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "customerCode": "GC-5432",
    "name": "علی",
    "phone": "+964750000000",
    "role": "customer"
  }
}
```

### 📦 درخواست بارە نوێ (Create Shipment)

```bash
curl -X POST http://localhost:5000/api/shipments \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "trackingId": "GC-5432-001",
    "fromCountry": "China",
    "toCity": "Erbil",
    "weight": 25.5,
    "volume": 0.5,
    "cargoCount": 3,
    "price": 150
  }'
```

### 📊 هەموو بارەکان بینین

```bash
curl http://localhost:5000/api/shipments \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## ✅ Checklist

- [ ] Node.js و PostgreSQL دامەزراون
- [ ] Repository cloned
- [ ] `npm install` تەواو شد
- [ ] `.env` فایل ڕێکخست
- [ ] PostgreSQL database دروستکراو
- [ ] `npm run dev` کار دەکات
- [ ] API tests تاقی کراوە

---

## 📊 API Endpoints خێراپەنجەرە

| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/auth/register` | ثبت نام کڕیار نوێ |
| POST | `/api/auth/login` | چوونەژوورەوە |
| POST | `/api/auth/logout` | دەرچوون |
| GET | `/api/shipments` | هەموو بارەکان |
| GET | `/api/shipments/:id` | بارەی تایبەت |
| POST | `/api/shipments` | بارە نوێ |
| PUT | `/api/shipments/:id` | گۆڕینی بارە |
| DELETE | `/api/shipments/:id` | سڕینەوەی بارە |

---

## ⚠️ کێشەی دەوری سیستەم

### "Can't connect to database"
```bash
# PostgreSQL رووناناو؟
psql -U postgres

# Database بۆ دروستکردنی؟
CREATE DATABASE globall_cloud;
```

### "Module not found"
```bash
rm -rf node_modules
npm install
```

### "Port already in use"
```bash
# پۆرتی 5000 بەکاردەچێت، بە پۆرتی دیکە وەرگرە
# .env فایل:
PORT=5001
```

---

## 🚀 دوواتر

**Phase 3:** Authentication System بێتر بێتر 🔐
- Role-based Access Control (RBAC)
- Token Refresh
- Password Reset
- 2FA (Two-Factor Authentication)

**پێم بڵێ ئایا ئامادە بوویت!** ✅
