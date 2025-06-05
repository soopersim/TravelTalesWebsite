# TravelTales – Advanced Server-Side Development CW2

## Developed by: Simranjit Kaur Gill 

---

## Project Overview

TravelTales is a full-stack tourism blogging platform built with **Node.js**, **Express**, **SQLite**, and **Docker**. Users can share their travel stories, follow others, interact with posts, and view global data powered by the RestCountries API. The app includes secure login, session handling, an API key system, and complete CRUD functionality.

---

## Features

### User Management
- Register/login system (passwords securely hashed with bcrypt)
- Session-based authentication (via express-session)
- Only authors can edit/delete their own posts

### Blog Post System
- Create/edit/delete posts with title, content, country, and visit date
- Real-time country dropdown (flag, capital, currency)
- Pagination for posts
- Display total likes, dislikes, and comments per post

### Interactions
- Like/Dislike system
- Add/view comments (shown under each post)
- Comment/like restrictions for logged-in users only

### Follow System
- Follow/unfollow other users
- “My Feed” page showing followed users’ posts
- Profile page showing user’s posts, followers, and following

### Search & Filter
- Search by country or poster’s email
- Sort by newest, most liked, most commented
- Filters integrated into both UI & backend

### API Gateway
- Country info route (`/country/:name`) secured by API key
- API usage tracked by user
- Users can generate their own API key

### Docker Support
- Containerized using Docker for easier deployment

---

## Screenshots

### Login Page

<img width="1367" alt="Screenshot 2025-06-05 at 4 08 56 AM" src="https://github.com/user-attachments/assets/b76b056a-2944-463c-a35f-f878b5210b34" />

### Home Page

<img width="1372" alt="Screenshot 2025-06-05 at 4 09 24 AM" src="https://github.com/user-attachments/assets/ca7f7f0b-bb09-4017-837e-8c6aa5763135" />

<img width="1366" alt="Screenshot 2025-06-05 at 4 09 36 AM" src="https://github.com/user-attachments/assets/87a2e56c-a45c-480e-97a0-8952d7bfd146" />

<img width="1366" alt="Screenshot 2025-06-05 at 4 09 51 AM" src="https://github.com/user-attachments/assets/48f54169-7004-4812-9626-15f8b34f865e" />

### Profile Page

<img width="1368" alt="Screenshot 2025-06-05 at 4 10 18 AM" src="https://github.com/user-attachments/assets/a60b3ac0-5248-4c5a-8600-a8478636057c" />

<img width="1356" alt="Screenshot 2025-06-05 at 4 10 29 AM" src="https://github.com/user-attachments/assets/ce4e5ee5-c818-4cae-9e4f-adc2795f2819" />

---

## 🗂 Project Structure
AdvancedServerSideDevelopment/
├── DAOs/ # DB access (users, posts, likes, comments, follows, API keys)

├── Databases/SQLCon.js # SQLite connection

├── Services/ # Business logic per domain

├── middleware/ # Session & API key guards

├── public/ # Frontend HTML/CSS/JS

│ ├── home.html

│ ├── login.html

│ ├── register.html

│ ├── profile.html

│ ├── all-posts.html

│ └── my-feed.html

├── Dockerfile

├── .dockerignore

├── index.js # Express app entrypoint

└── README.md


---

## How to Run

### Locally

```bash
npm install
node index.js

### Using Docker
docker build -t traveltales-app .
docker run -d -p 5002:5002 traveltales-app













