# Server (Express + Mongoose)

This backend provides a simple API for Users, Jobs, and Applications using Express and Mongoose.

Setup
1. Copy `.env.example` to `.env` and set `MONGO_URI`.
2. cd server
3. npm install
4. npm run dev

API endpoints
- GET /health
- /api/users (CRUD)
- /api/jobs (CRUD)
- /api/applications (CRUD)

Notes
- Passwords should be hashed before storing in production (bcrypt). This sample stores plain strings for simplicity; please update before production.
- Validation is present using `express-validator` in routes, and Mongoose schema validation is also applied.
