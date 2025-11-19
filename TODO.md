# Auth Backend & Frontend Wiring - Task Tracker

Information Gathered

- Backend serves static frontend and JSON via Express (backend/server.js).
- MySQL connection configured in backend/config/db.js (DB: travel_app).
- Schema defined in backend/init.sql including users and guiders tables.
- No prior auth routes; added role-based auth.
- Frontend pages:
  - TravelerSignUp.html, TravelerLogin.html
  - guider-register.html, guider-login.html
  - Home: /pages/home.html
  - Guider dashboard: /pages/GuiderDash.html

Plan Items and Status

- [x] Add scripts to backend/package.json (start, dev)
- [x] Create role-based auth routes (POST /api/auth/signup, POST /api/auth/login)
- [x] Hash passwords with bcrypt; issue JWT on success (returned to client)
- [x] Insert guider in guiders table when user_type = guider
- [x] Map redirect by role: - traveler -> /pages/home.html - guider -> /pages/GuiderDash.html
- [x] Mount routes in backend/server.js and enable urlencoded body parser
- [x] Wire TravelerSignUp.html to POST /api/auth/signup and redirect
- [x] Wire TravelerLogin.html to POST /api/auth/login and redirect
- [x] Wire guider-register.html submit to POST /api/auth/signup and redirect
- [x] Wire guider-login.html to POST /api/auth/login and redirect
- [x] Ensure dependencies in backend/package.json: bcrypt, jsonwebtoken
- [x] Install backend dependencies (npm install in backend)
- [ ] Run backend server (dev)
- [ ] Initialize MySQL schema if not already present (run init.sql)
- [ ] Manual validation: sign up/login for both roles

How to Run

1. Start backend server:

   - Windows PowerShell:
     cd backend; npm run dev
   - Or:
     cd backend; node server.js

2. Initialize DB schema (if tables do not exist yet):

   - Open MySQL client and execute backend/init.sql:
     - mysql -u root -p < backend/init.sql
   - Or copy-paste the SQL into your MySQL client.
   - Ensure database name is travel_app and credentials match backend/config/db.js.

3. Test Endpoints (optional with REST client):
   - POST http://localhost:5000/api/auth/signup
     {
     "username": "john_trav",
     "email": "john@example.com",
     "password": "Passw0rd!",
     "full_name": "John Traveler",
     "user_type": "traveler"
     }
   - POST http://localhost:5000/api/auth/signup
     {
     "username": "mike_guide",
     "email": "mike@example.com",
     "password": "Passw0rd!",
     "full_name": "Mike Guider",
     "user_type": "guider"
     }
   - POST http://localhost:5000/api/auth/login
     {
     "emailOrUsername": "john@example.com",
     "password": "Passw0rd!"
     }

Front-End Navigation

- Traveler:
  - Sign up: /pages/TravelerSignUp.html
  - Login: /pages/TravelerLogin.html
  - On success -> /pages/home.html
- Guider:
  - Register: /pages/guider-register.html
  - Login: /pages/guider-login.html
  - On success -> /pages/GuiderDash.html

Notes

- JWT is returned but not enforced yet; can be used for future protected routes.
- The initial login choice page may need links for guider paths depending on design preferences.
