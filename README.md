# React Movie Search

A full-stack academic web application for browsing, filtering, and adding movie records through a React interface backed by a Node.js and Express API.

## Features

- Search movies by title
- Filter movie results by actor and year
- Browse movie, actor, and genre information
- Add movie records through a controlled form
- Retrieve data from an Express API
- Render reusable React components for search controls and results

## Technology stack

- React
- JavaScript
- Node.js
- Express
- HTML and CSS
- JSON-based data storage
- REST-style HTTP endpoints

## Repository structure

- `client/` - React user interface
- `server.js` - Express application and API endpoints
- `data/` - movie dataset used by the server
- `sample-data/` - compact data used for testing

## Running locally

The API and React client run in separate terminals.

### Windows PowerShell

Terminal 1 — API server:

```powershell
npm install
npm start
```

Terminal 2 — React client:

```powershell
cd client
npm install
npm start
```

### macOS or Linux

Terminal 1 — API server:

```bash
npm install
npm start
```

Terminal 2 — React client:

```bash
cd client
npm install
npm start
```

The client opens at `http://localhost:3000`.

### Fixing an existing client installation

If you previously installed the client and receive an ESLint or `jest/globals` error, reinstall its dependencies.

Windows PowerShell:

```powershell
cd client
Remove-Item -Recurse -Force node_modules
Remove-Item -Force package-lock.json -ErrorAction SilentlyContinue
npm install
npm start
```

macOS or Linux:

```bash
cd client
rm -rf node_modules package-lock.json
npm install
npm start
```

## Academic context

Created as an individual Computer Science assignment at Cégep Heritage College. Grading documents, assignment instructions, and unrelated classroom files were excluded from this portfolio version.

## Notes

This project reflects the technologies and conventions used when it was originally completed. Future improvements could include automated tests, database persistence, validation middleware, and an updated React build toolchain.

## Author

Joshua Mina-Loaiza
