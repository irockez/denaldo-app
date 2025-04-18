# 🚀 Denaldo App

Проект с фронтендом на **React (Vite + TypeScript)**, серверной частью на **Node.js** и базой данных **PostgreSQL**, развёрнутой через Docker.

## 📁 Структура проекта
```
denaldo-app/
├── frontend/
├── server/
├── README.md
```

---

## 🧰 Установка

```bash
# Установка зависимостей для сервера
cd server
npm install

# Установка зависимостей для фронта
cd ../frontend
npm install
```
---
## 🐳 База данных (PostgreSQL через Docker)
```bash
# Запуск контейнера с базой
docker start database

# Подключение к базе
docker exec -it database psql -U postgres
```
---
## ⚙️ Запуск проекта в трёх терминалах:

### 1️⃣ Сервер Node.js:
```bash
cd server
npm run dev
```
### 2️⃣ Фронтенд:
```bash
cd frontend
npm run dev
```
### 3️⃣ Работа с БД / Docker:
```bash
docker start database
```
---
## 🧾 Работа с формой
* Основная форма принимает текст вида:
```
Ключ 1

Значение 1

Ключ 2

Показать

Ключ 3

Значение 3
```
* Ключи без значений определяются по двойному переносу строки
* Ключи со значением — по одинарному переносу строки
* Ключи со значением "Показать" — отображают вложенные формы
---
## 📤 Сохранение
Нажатие кнопки "Сохранить" отправляет структуру на сервер:
```json
{
  "id": "user-id",
  "formData": {
    "Ключ": "Значение",
    "Ключ с формой": {
      "0": "123",
      "1": "456"
    }
  }
}
```
---
## 📚 Полезные команды
```bash
# docker + psql
docker start database
docker exec -it database psql -U postgres

# запуск сервера
cd server && npm run dev

# запуск фронта
cd frontend && npm run dev
```