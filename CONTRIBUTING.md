# Contributing Guide

Thanks for contributing to this project.

## Ways to Contribute

- Add new data structure or algorithm implementations in `Study Materials/`
- Improve explanations and markdown docs for existing topics
- Improve frontend UX, performance, or accessibility in `dsa/`
- Improve API quality and validation in `dsa-backend/`
- Fix bugs and tighten code quality

## Prerequisites

- Node.js 18+
- npm 9+
- MongoDB (local or Atlas)
- Git

## Local Setup

1. Fork and clone the repository.

```bash
git clone https://github.com/<your-username>/Data-Structures-and-Algorithms.git
cd Data-Structures-and-Algorithms
```

2. Install frontend dependencies.

```bash
cd dsa
npm install
```

3. Install backend dependencies.

```bash
cd ../dsa-backend
npm install
```

4. Add environment files.

Backend `dsa-backend/.env`:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/dsa-platform
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000
NODE_ENV=development
```

Frontend `dsa/.env`:

```env
VITE_GEMINI_API_KEY=your_gemini_api_key
REACT_APP_BACKEND=http://localhost:5000
```

5. Start both applications.

```bash
# Terminal 1
cd dsa-backend
node server.js

# Terminal 2
cd dsa
npm run dev
```

## Branch and Commit Rules

- Create a feature branch from `main`.
- Keep branch names descriptive. Examples:
  - `feature/add-avl-visualization`
  - `fix/history-api-validation`
  - `docs/update-readme-setup`
- Use clear commit messages. Conventional-style is preferred:
  - `feat(labs): add queue practice module`
  - `fix(api): handle missing assignment id`
  - `docs(readme): improve local setup section`

## Coding Expectations

- Keep changes scoped and avoid unrelated refactors.
- Follow existing style and naming conventions.
- Add concise comments only where logic is not obvious.
- For `Study Materials`, include both implementation and explanation updates where possible.

## Validation Before PR

Frontend:

```bash
cd dsa
npm run lint
npm run build
```

Backend:

```bash
cd dsa-backend
node server.js
```

Then verify:

- `GET /api/health` responds successfully
- Updated features behave as expected in the UI
- No sensitive keys or secrets are committed

## Pull Request Checklist

- [ ] Branch is up to date with `main`
- [ ] Changes are focused and self-contained
- [ ] Documentation updated when behavior changed
- [ ] Lint/build checks completed
- [ ] Screenshots or request/response examples included for UI/API changes
- [ ] PR description explains what changed and why

## Reporting Issues

When filing an issue, include:

- Problem statement and expected behavior
- Reproduction steps
- Environment (OS, Node version, browser)
- Screenshots/logs when relevant

## License

By contributing, you agree that your contributions will be licensed under the [MIT License](LICENSE).
