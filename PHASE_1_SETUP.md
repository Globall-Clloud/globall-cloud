# 🚀 Global Cloud - Phase 1: Database Design

## ✅ تەواو شد!

هەموو فایلی ٱساسی Phase 1 ی ڕێکخستووە:

### 📁 دروستکراو فایلەکان:

```
backend-api/
├── prisma/
│   └── schema.prisma          ✅ Database models
├── .env                        ✅ Environment config
├── .gitignore                  ✅ Git ignore rules
├── package.json               ✅ Dependencies
└── tsconfig.json              ✅ TypeScript config
```

---

## 🎯 ئێستا چی دەکەیت؟

### Step 1: Node.js و PostgreSQL دامەزراندن

**اگەر بێ دامەزراوە:**
- Node.js: https://nodejs.org (LTS)
- PostgreSQL: https://www.postgresql.org/download
- VS Code: https://code.visualstudio.com
- Git: https://git-scm.com

### Step 2: Repository Clone کردن

```bash
git clone https://github.com/Globall-Clloud/globall-cloud.git
cd globall-cloud
cd backend-api
```

### Step 3: Dependencies دامەزراندن

```bash
npm install
```

### Step 4: Environment Variables ڕێکخستن

`.env` فایلەکە دا بە دروستی:

```env
DATABASE_URL="postgresql://postgres:yourpassword@localhost:5432/globall_cloud"
PORT=5000
NODE_ENV=development
JWT_SECRET="your-secret-key"
```

**تکایە:** `yourpassword` بە PostgreSQL پاسوۆردی خۆتت گۆڕە!

### Step 5: Database Migrations

```bash
npm run prisma:generate
npm run prisma:migrate
```

هەمان پرسیار دەکات کە migration ی پێویست دروست بکات - ناوێک داخڵ بکە (مثلاً: `init`)

### Step 6: Prisma Studio (Optional)

بۆ دیتابەیسی دیتی:

```bash
npm run prisma:studio
```

---

## 📝 Checklist

- [ ] Node.js دامەزراوە (v20+)
- [ ] PostgreSQL دامەزراوە
- [ ] Repository cloned
- [ ] `npm install` تەواو شد
- [ ] `.env` فایل ڕێکخست
- [ ] `npm run prisma:migrate` تەواو شد
- [ ] پاسوارد لە `.env` دا صحیح نیشتیوە

---

## ⚠️ کێشە؟

**اگەر error هەبوو:**

1. **"Can't reach database server"**
   - PostgreSQL ڕوون بووە؟
   - DATABASE_URL صحیح نیشتیوە؟

2. **"node_modules not found"**
   ```bash
   rm -rf node_modules
   npm install
   ```

3. **"Migration failed"**
   - Database ئامادە؟
   - Permissions صحیح؟

---

## 🎉 دواتر

دوای تەواوکردنی ئەم ستەپەکان، ئامادە بوو بۆ **Phase 2: Backend Setup**

**پێم بڵێ:** ✅ هەمووشتێک تەواو شد!
