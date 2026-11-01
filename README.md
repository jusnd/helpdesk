# HelpDesk

![Build and Deploy](https://github.com/jusnd/helpdesk/actions/workflows/deploy.yml/badge.svg)

**GitHub Pages:** https://jusnd.github.io/helpdesk/

**Backend API:** https://helpdesk-backend-jusnd.vercel.app

Учебный проект к занятию «Работа с HTTP». Реализованы загрузка списка заявок, создание, редактирование, удаление, изменение статуса и отдельная загрузка подробного описания.

## Локальный запуск

Нужны Node.js 26 и npm.

### 1. Backend

```bash
cd backend
npm ci
npm start
```

Сервер работает на `http://localhost:7070`.

### 2. Frontend

Откройте второй терминал, не останавливая backend. Для локальной разработки временно замените `API_URL` в `frontend/src/js/config.js` на `http://localhost:7070`, затем выполните:

```bash
cd frontend
npm ci
npm start
```

Откройте `http://localhost:8080`. Не отправляйте локальный адрес в репозиторий: опубликованный сайт должен использовать HTTPS-адрес backend на Vercel.

## Публикация

Frontend публикуется на GitHub Pages автоматически после каждого push в ветку `main`. Workflow находится в `.github/workflows/deploy.yml`: он проверяет код линтером, собирает frontend через Webpack и развёртывает содержимое `frontend/dist`.

Адрес приложения: https://jusnd.github.io/helpdesk/

Backend развёртывается на Vercel из папки `backend`. Express-приложение экспортируется через `backend/api/index.js`, а `backend/vercel.json` направляет API-запросы в serverless-функцию. Для production-версии HTTPS-адрес backend указывается в `frontend/src/js/config.js`.

> Backend хранит заявки в оперативной памяти. После перезапуска сервера список возвращается к исходному состоянию — так устроен выданный в задании сервер.
