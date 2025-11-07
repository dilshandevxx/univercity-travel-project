# Travel Backend

This is the backend for the travel project, built with Node.js, Express, and MySQL.

## Setup

1. Install dependencies:

   ```
   npm install
   ```

2. Set up MySQL database:

   - Create a MySQL database.
   - Run the SQL script in `init.sql` to create the necessary tables.

3. Configure environment variables:

   - Copy `.env` and update the values with your MySQL credentials and JWT secret.

4. Start the server:
   ```
   npm start
   ```

## API Endpoints

- POST /api/auth/signup: Register a new user
- POST /api/auth/login: Login user

## Database Schema

- users: id, username, email, password, created_at
