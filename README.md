# HelpDesk

![Build and Deploy](https://github.com/jusnd/helpdesk/actions/workflows/deploy.yml/badge.svg)

**GitHub Pages:** https://jusnd.github.io/helpdesk/

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

Frontend публикуется на GitHub Pages автоматически после каждого push в ветку `main`. Workflow находится в `.github/workflows/deploy.yml`: он проверяет код линтером, собирает frontend через Webpack и развёртывает содержимое `frontend/dist`.

Адрес приложения: https://jusnd.github.io/helpdesk/

Backend представляет собой отдельный Node.js Web Service. Для production-версии его HTTPS-адрес указывается в `frontend/src/js/config.js`.

> Backend хранит заявки в оперативной памяти. После перезапуска сервера список возвращается к исходному состоянию — так устроен выданный в задании сервер.
