# TravelTales – Advanced Server-Side Development CW2

## Developed by: Simranjit Kaur Gill (W19314851)  
University of Westminster – Advanced Server-Side Development Coursework – 2025

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


