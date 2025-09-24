# Colbin assignment Backend

NOTE: USE PRODUCTION ONLY IF YOU WERE NOT ABLE TO SETUP LOCALLY. THIS IS A FREE TIER SERVICE . IT MIGHT BREAK ANYTIME SOON WITHIN A WEEK . IF YOU USE PRODUCTION , YOU DONT NEED TO SETUP DB
DELOYED PRODUCTION FRONTEND LINK : https://colbin-assignment-frontend.vercel.app/

DEPLOYED PRODUCTION BACKEND LINK : https://colbin-assignment-backend.onrender.com

## Setup Instructions

### 1. Clone the Repository
```sh
git clone <your-repo-url>
```

### 2. Install Dependencies
```sh
npm install
```

### 3. Environment Variables
Create a `.env` file in the `backend` directory with the following placeholder values:
```
MONGO_URI=mongodb://<username>:<password>@<host>:<port>/<database>
JWT_SECRET=<your_jwt_secret>
PORT=3000
BASE_URL=http://localhost:3000
```

### 4. Start MongoDB
Ensure you have a running MongoDB instance. You can use [MongoDB Atlas](https://www.mongodb.com/products/platform/atlas-database) or run locally:

NOTE : 
EITHER CREATE MONGODB ATLAS INSTANCE AND REPLACE (PREFERRED)
MONGO_URI=mongodb://<username>:<password>@<host>:<port>/<database>

ELSE
HAVE LOCAL MONGODB INSTALLED (LOCAL SETUP BASED). YOU CAN RUN LOCAL MONDODB WITH BELOW COMMAND
```sh
mongod
```

### 5. Run the Backend Server
```sh
npm run dev
```
Or, if you use nodemon:
```sh
npx nodemon src/index.ts
```

### 6. API Endpoints

#### Registration
- **POST** `/api/users/register`
- **Body (JSON):**
```json
{
  "name": "Test User",
  "email": "test@example.com",
  "password": "Test@1234"
}
```

#### Login
- **POST** `/api/users/login`
- **Body (JSON):**
```json
{
  "email": "test@example.com",
  "password": "Test@1234"
}
```
- **Response:**
```json
{
  "token": "<jwt_token>"
}
```

#### Get User Profile
- **GET** `/api/users/profile`
- **Headers:**
  - `Authorization: Bearer <jwt_token>`
- **Response:**
```json
{
  "_id": "...",
  "name": "Test User",
  "email": "test@example.com",
  ...
}
```

### 7. Testing APIs
- Use [Postman](https://www.postman.com/) or `curl` to test endpoints.
- Ensure you send JSON in the request body for registration and login.
- For protected routes, include the JWT token in the `Authorization` header.

### 8. Project Structure
```
backend/
  .env
  package.json
  tsconfig.json
  src/
    index.ts
    controllers/
      user.controller.ts
    db/
      db.ts
    interfaces/
      user.interface.ts
      auth.interface.ts
    middleware/
      auth.ts
    models/
      user.model.ts
    routes/
      user.routes.ts
    types/
      express.d.ts
```
---

## Example `.env` (Placeholders Only)
```
MONGO_URI=mongodb://<username>:<password>@<host>:<port>/<database>
JWT_SECRET=<your_jwt_secret>
PORT=3000
BASE_URL=http://localhost:3000
```
