# uTask 3.0

uTask 3.0 is a full-stack task management app built around a simple idea: make it easy to organize work in a Kanban board while practicing real application structure from end to end.

The project includes authentication, protected routes, a task API, a PostgreSQL database, drag-and-drop task movement, dark/light themes, and a responsive interface. It was also a way for me to connect pieces that are often studied separately: frontend state, API integration, backend routes, database entities, and the small UI details that make an app feel complete.

## What the app does

- Allows users to create an account and log in.
- Keeps authenticated users inside protected pages.
- Lets users create, edit, delete, and move tasks.
- Organizes tasks into Kanban columns: To Do, Doing, and Done.
- Supports drag and drop on the board with `@dnd-kit`.
- Includes a light and dark theme system.
- Shows feedback to the user through modals and toast messages.
- Uses a backend API connected to PostgreSQL.

## Tech stack

### Frontend

- React
- TypeScript
- Vite
- React Router
- Axios
- `@dnd-kit` for drag and drop
- React Toastify
- Component-level CSS files
- Context API for authentication and theme state

### Backend

- Node.js
- TypeScript
- Fastify
- TypeORM
- PostgreSQL
- JWT authentication
- Bcrypt for password hashing
- Dotenv for environment variables
- TypeScript migrations with TypeORM

## Project structure

The repository is split into two main applications:

```bash
uTask 3.0/
|-- backend/
|   |-- src/
|   |   |-- @types/
|   |   |-- database/
|   |   |   |-- entities/
|   |   |   `-- migrations/
|   |   |-- modules/
|   |   |   |-- auth/
|   |   |   |   |-- controllers/
|   |   |   |   |-- routes/
|   |   |   |   `-- services/
|   |   |   `-- tasks/
|   |   |       |-- controllers/
|   |   |       |-- routes/
|   |   |       `-- services/
|   |   |-- shared/
|   |   |   `-- middlewares/
|   |   |-- app.ts
|   |   `-- server.ts
|   `-- package.json
|
|-- frontend/
|   |-- src/
|   |   |-- assets/
|   |   |-- components/
|   |   |-- contexts/
|   |   |-- hooks/
|   |   |-- pages/
|   |   |-- providers/
|   |   |-- routes/
|   |   |-- services/
|   |   |-- styles/
|   |   |-- types/
|   |   `-- utils/
|   `-- package.json
|
`-- README.md
```

## Main features

### Authentication

The authentication flow includes user registration, login, JWT token handling, protected routes on the frontend, and middleware validation on the backend. The frontend stores the token and sends it automatically through an Axios interceptor.

### Kanban board

The main screen is a Kanban board where each task belongs to a status. Tasks can be created, edited, deleted, and moved between columns. The board uses `@dnd-kit` to handle drag-and-drop interactions and also includes navigation controls for smaller screens.

### Task API

The backend exposes routes for creating, listing, updating, moving, and deleting tasks. Task access is protected by authentication, so each request goes through the auth middleware before reaching the task controllers.

### Theme system

The app has light and dark themes managed through a dedicated theme context and provider. The UI was built with custom CSS and reusable components instead of relying on a component library.

### UI and feedback

The interface includes reusable components such as task cards, columns, modals, headers, forms, and feedback messages. The goal was to make the app feel like a real product, not just a collection of isolated screens.

## API overview

The backend runs on port `3333` by default.

```bash
GET    /
POST   /auth/register
POST   /auth/login
GET    /auth/me
POST   /tasks
GET    /tasks
PATCH  /tasks/:id
PATCH  /tasks/:id/status
DELETE /tasks/:id
```

## Running locally

### 1. Clone the repository

```bash
git clone <repository-url>
cd "uTask 3.0"
```

### 2. Install backend dependencies

```bash
cd backend
npm install
```

### 3. Configure backend environment variables

Create a `.env` file inside `backend/`.

```env
PORT=3333

DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=your_password
DATABASE_NAME=utask

JWT_SECRET=your_jwt_secret
```

### 4. Run backend migrations

```bash
npm run typeorm migration:run
```

### 5. Start the backend

```bash
npm run dev
```

### 6. Install frontend dependencies

Open another terminal:

```bash
cd frontend
npm install
```

### 7. Start the frontend

```bash
npm run dev
```

The frontend uses the API at:

```bash
http://localhost:3333
```

## Available scripts

### Frontend

```bash
npm run dev
npm run build
npm run lint
npm run preview
```

### Backend

```bash
npm run dev
npm run build
npm run start
npm run typeorm
```

## My development journey

This section is reserved for the personal timeline behind the project. I want this README to show not only what the app does, but also the path I took to build it.

### Timeline

- Started learning HTML and CSS: 04/26/2026
- Started learning JavaScript: 04/27/2026
- Started learning React and TypeScript: 04/27/2026
- Started building uTask 3.0 front-end: 05/08/2026
- Started studying backend development: 05/15
- Started learning databases and PostgreSQL: **[add date here]**
- Finished the first complete version: **[add date here]**

### Notes from the process

uTask 3.0 helped me understand how different parts of an application talk to each other. Some parts were straightforward, and others forced me to slow down, debug, refactor, and rethink the structure.

The project became a good reminder that building software is not only about making something work once. It is also about organizing the code, naming things clearly, handling edge cases, improving the interface, and coming back to old decisions with a better eye.

## Things I practiced

- Structuring a React project with reusable components.
- Managing routes for public and private pages.
- Creating custom hooks for auth, theme, and tasks.
- Connecting the frontend to an API with Axios.
- Building a REST API with Fastify.
- Using controllers and services to separate responsibilities.
- Modeling database entities with TypeORM.
- Protecting routes with JWT middleware.
- Working with migrations.
- Improving UI consistency across pages and components.
- Using Git throughout the development process.

## Future improvements

- Add task priority and labels.
- Add due dates and filters.
- Improve mobile drag-and-drop behavior.
- Add user profile settings.
- Add search for tasks.
- Add task history or activity logs.
- Add automated tests for frontend and backend flows.
- Prepare the project for deployment.

## Author

Developed by Felipe Dobravoski.

This project is part of my learning path as a developer and represents one of the moments where frontend, backend, database, and UI practice started to come together in a more complete way.
