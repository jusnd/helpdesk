# HelpDesk

![Build and Deploy](https://github.com/USERNAME/REPOSITORY/actions/workflows/deploy.yml/badge.svg)

**GitHub Pages:** https://USERNAME.github.io/REPOSITORY/

Учебный проект к занятию «Работа с HTTP». Реализованы загрузка списка заявок, создание, редактирование, удаление, изменение статуса и отдельная загрузка подробного описания.

## Локальный запуск

Нужны Node.js 20 и npm.

### 1. Backend

```bash
cd backend
npm ci
npm start
```

Сервер работает на `http://localhost:7070`.

### 2. Frontend

Откройте второй терминал, не останавливая backend:

```bash
cd frontend
npm ci
npm start
```

Откройте `http://localhost:8080`.

## Публикация

1. Загрузите проект в GitHub-репозиторий.
2. Опубликуйте папку `backend` на Render как Web Service. Build Command: `npm ci`, Start Command: `npm start`, переменная окружения `NODE_VERSION=20`.
3. В `frontend/src/js/config.js` замените `http://localhost:7070` на HTTPS-адрес backend.
4. В настройках GitHub-репозитории выберите Pages → Build and deployment → Source → GitHub Actions.
5. Замените `USERNAME` и `REPOSITORY` в этом README на свои данные.

> Backend хранит заявки в оперативной памяти. После перезапуска сервера список возвращается к исходному состоянию — так устроен выданный в задании сервер.
