# Eventify

Eventify is an event discovery and ticket-booking web application. It provides
HTML pages for browsing events and categories, JavaScript interactions for
registration, login, bookings, payments, and history, and a Node.js/Express
API backed by MySQL.

## Repository layout

```text
HTML/       Event pages, shared frames, login, registration, booking, and payment views
CSS/        Stylesheets for the frontend views
Javascript/ Browser-side API calls and page interactions
Images/     Event artwork used by the frontend
server/     Express API and MySQL service
```

Important entry points:

- `HTML/Main.html` is the main event browsing page.
- `HTML/Login.html` and `HTML/Register.html` provide authentication screens.
- `server/server.js` starts the Express API.
- `server/dbService.js` manages the MySQL connection and database queries.

## Features

- Browse events by month and category
- View event details and book tickets
- Register and log in as a user or administrator
- Store bookings and retrieve booking history
- Provide administrator endpoints for adding shows and ticket details
- Report booking, ticket, and revenue totals

## Requirements

- Node.js 18 or newer
- MySQL
- A database configured with the tables expected by `server/dbService.js`

## Server setup

Install the server dependencies:

```bash
cd server
npm install
```

Create `server/.env` with the MySQL connection settings used by the application:

```env
HOST=localhost
MYSQL_USER=your_mysql_user
PASSWORD=your_mysql_password
DATABASE=eventify
DB_PORT=3306
PORT=3001
```

Start the API:

```bash
npm start
```

For development with automatic restart:

```bash
npm run dev
```

The API listens on port `3001` by default. The frontend JavaScript files call
the API at `http://localhost:3001`.

## Frontend

Open `HTML/Main.html` through a local static web server so that the relative
HTML, CSS, JavaScript, and image paths resolve correctly. Keep the API running
while using features that load or save data.

## End-to-end tests

Cypress configuration is located in `HTML/cypress.config.js`. Install its
dependencies and run the Cypress test runner from the `HTML` directory:

```bash
cd HTML
npm install
npx cypress open
```

## Security and configuration

Do not commit `server/.env` or database credentials. The server `.gitignore`
already excludes `.env` and `node_modules`.
