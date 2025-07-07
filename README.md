# Draw Polygon - Fullstack Assignment

## Environment Setup & Usage

### Requirements

- Node.js v18.18.0 or higher (recommended: latest LTS)
- npm (comes with Node.js)

### Install Dependencies

```bash
npm install
```

### Run the Development Server

```bash
npm run dev
```

- Open [http://localhost:3000](http://localhost:3000) in your browser.

### Run in Debug Mode (with VS Code or Chrome DevTools)

```bash
npm run debug
```

- Or use the VS Code "Debug Next.js" launch configuration.

### Inspect the SQLite Database

- The database file is `polygons.sqlite` in the project root.
- You can inspect it with the sqlite3 CLI:
  ```bash
  sqlite3 polygons.sqlite
  # Then run SQL commands, e.g.:
  .tables
  SELECT * FROM polygons;
  ```
- Or use a GUI tool like DB Browser for SQLite.

---

## Running Tests

This project uses [Vitest](https://vitest.dev/) and [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) for both backend and frontend tests.

### Run all tests

```bash
npx vitest run
```

### Run only UI (frontend) tests

```bash
npx vitest run tests/ui
```

### Run only backend tests

```bash
npx vitest run tests/dal tests/services
```

**Note:**

- Canvas-related tests are auto-mocked in `tests/setup.ts` to avoid jsdom errors.
- All test files are located in the `tests/` directory.

---

## Project Structure

- `src/` - Application source code
- `tests/` - All test files (UI and backend)

---

For any questions, please refer to the code or contact the maintainer.

---

## Docker Usage & Best Practices

- **Do not delete `package-lock.json` from the repo.**
- **Do not copy or add your local `node_modules` into the Docker image.**
- The Dockerfile will install all dependencies inside the container for the correct architecture.
- The `.dockerignore` file ensures local build artifacts and dependencies are not sent to Docker.
- Native modules (like `sqlite3`) are rebuilt inside the container as needed.

To build and run the Docker image:

```bash
docker build -t draw-polygon-app .
docker run -p 3000:3000 draw-polygon-app
```

---
