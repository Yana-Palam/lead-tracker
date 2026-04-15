# Mini Lead Tracker (Mini CRM)

Невеликий сервіс для управління лідами: створення, редагування, пошук, фільтрація, коментарі.

## Стек

- Frontend: Next.js (App Router, TypeScript, Tailwind)
- Backend: NestJS (TypeScript)
- Database: PostgreSQL
- ORM: TypeORM
- Docker + docker-compose

---

# 1. Як запустити локально

## 🔹 Backend

```bash
cd backend
npm install
npm run start:dev
```

Backend буде доступний:

```
http://localhost:4000
```

---

## 🔹 Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend:

```
http://localhost:3000
```

---

## Через Docker (рекомендовано)

```bash
docker compose up --build
```

Після запуску:

- Frontend → http://localhost:3000
- Backend → http://localhost:4000
- Swagger → http://localhost:4000/api/docs

---

# 2. Змінні оточення

## backend/.env.example

```env
PORT=4000

DB_HOST=postgres.lead-tracker.orb.local
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=password
DB_DATABASE=mydb

FRONTEND_URL=http://localhost:3000
```

### Опис:

- `PORT` — порт backend
- `DB_*` — підключення до PostgreSQL
- `FRONTEND_URL` — для CORS

---

## frontend/.env.example

```env
BACKEND_URL=http://localhost:4000
```

### Опис:

- `BACKEND_URL` — URL backend API

---

# 3. Як перевірити API

## Swagger

```
http://localhost:4000/api/docs
```

---

## Основні ендпоінти

### 🔹 Отримати список лідів

```
GET /api/leads
```

Параметри:

- `q` — пошук
- `status` — фільтр
- `page`, `limit`
- `sort`, `order`

---

### 🔹 Створити лід

```
POST /api/leads
```

Body:

```json
{
  "name": "John Doe",
  "email": "john@gmail.com",
  "company": "Google",
  "status": "NEW",
  "value": 1000,
  "notes": "Important lead"
}
```

---

### 🔹 Отримати один лід

```
GET /api/leads/:id
```

---

### 🔹 Оновити лід

```
PATCH /api/leads/:id
```

---

### 🔹 Видалити лід

```
DELETE /api/leads/:id
```

---

### 🔹 Коментарі

#### Отримати:

```
GET /api/leads/:id/comments
```

#### Додати:

```
POST /api/leads/:id/comments
```

Body:

```json
{
  "text": "Client is interested"
}
```

---

# 4. Build та запуск у production

## 🔹 Backend

```bash
cd backend
npm run build
npm run start:prod
```

---

## 🔹 Frontend

```bash
cd frontend
npm run build
npm run start
```

---

## Через Docker (production)

```bash
docker compose up --build
```

---

# Features

- CRUD для Lead
- Коментарі
- Пошук (name/email/company)
- Фільтрація по статусу
- Пагінація
- Swagger документація
- Docker setup

---

# Структура

```
/backend
/frontend
docker-compose.yml
```

---

# Автор

Test task implementation — Mini Lead Tracker
