const express = require('express');
const session = require('express-session');
const path = require('path');
const fetch = require('node-fetch');
const db = require('./Databases/SQLCon');

const app = express();

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: 'my_secret-santa_',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000
  }
}));

// Services and middleware
const UserService = require('./Services/UserService');
const APIKeyService = require('./Services/APIKeyService');
const APIKeyMiddleware = require('./middleware/APIAuthMiddleware');
const checkSession = require('./middleware/SessionMiddleware');
const UsageDAO = require('./DAOs/UsageDAO');
const PostService = require('./Services/PostService');
const LikeService = require('./Services/LikeService');
const CommentService = require('./Services/CommentService');
const FollowService = require('./Services/FollowService');

const usageDAO = new UsageDAO();
const postService = new PostService();
const likeService = new LikeService();
const commentService = new CommentService();
const followService = new FollowService();

// ===== Public Routes =====

// Redirect root to login page
app.get('/', (req, res) => {
  res.redirect('/loginpage');
});

app.get('/loginpage', (req, res) => {
  res.sendFile(path.join(__dirname, 'login.html'));
});

app.get('/registerpage', (req, res) => {
  res.sendFile(path.join(__dirname, 'register.html'));
});

app.post('/register', async (req, res) => {
  const userService = new UserService();
  const result = await userService.create(req);
  if (result.success) {
    res.redirect('/loginpage');
  } else {
    res.send('Registration failed. <a href="/registerpage">Try again</a>');
  }
});

app.post('/login', async (req, res) => {
  const userService = new UserService();
  const result = await userService.authenticate(req);
  if (result.success) {
    res.redirect('/home');
  } else {
    res.send('Login failed. <a href="/loginpage">Try again</a>');
  }
});

app.get('/profile.html', checkSession, (req, res) => {
    res.sendFile(path.join(__dirname, 'profile.html'));
  });
  

// ===== Protected Routes =====

app.get('/home', checkSession, (req, res) => {
  res.sendFile(path.join(__dirname, 'home.html'));
});

app.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/loginpage');
  });
});

app.get('/testSession', checkSession, (req, res) => {
  res.json('User is logged in and authenticated');
});

app.get('/generateAPIKEY', checkSession, async (req, res) => {
  const apiKeyService = new APIKeyService();
  const userID = req.session.user.id;
  const result = await apiKeyService.create(userID);
  res.json(result);
});

app.get('/testAPIKey', APIKeyMiddleware, (req, res) => {
  res.json('Route has been validated and Key is valid');
});

// Blog posts
app.post('/createPost', checkSession, async (req, res) => {
  const result = await postService.create(req);
  res.json(result);
});

app.get('/posts', checkSession, async (req, res) => {
    const result = await postService.getAll(req);
    res.json(result);
  });  

app.get('/my-posts', checkSession, async (req, res) => {
    const result = await postService.getByUser(req.session.user.id);
    res.json(result);
  });
  

app.get('/profile-posts', checkSession, async (req, res) => {
    const userID = req.session.user.id;
    const posts = await postService.getByUser(userID);
    res.json(posts);
  });
  

app.put('/updatePost', checkSession, async (req, res) => {
  const result = await postService.update(req);
  res.json(result);
});

app.delete('/deletePost', checkSession, async (req, res) => {
  const result = await postService.delete(req);
  res.json(result);
});

// Likes & comments
app.post('/like', checkSession, async (req, res) => {
  const result = await likeService.like(req);
  res.json(result);
});

app.post('/comment', checkSession, async (req, res) => {
  const result = await commentService.comment(req);
  res.json(result);
});

// Follow system
app.post('/follow', checkSession, async (req, res) => {
  const result = await followService.follow(req);
  res.json(result);
});

app.post('/unfollow', checkSession, async (req, res) => {
  const result = await followService.unfollow(req);
  res.json(result);
});

app.get('/feed', checkSession, async (req, res) => {
  const posts = await followService.getFeed(req);
  res.json(posts);
});

app.get('/followers', checkSession, async (req, res) => {
  const followers = await followService.getFollowers(req);
  res.json(followers);
});

app.get('/following', checkSession, async (req, res) => {
  const following = await followService.getFollowing(req);
  res.json(following);
});

// Users for follow list
app.get('/users', checkSession, (req, res) => {
  const currentUserID = req.session.user.id;
  db.all('SELECT id, email AS username FROM users WHERE id != ?', [currentUserID], (err, rows) => {
    if (err) return res.status(500).json({ error: 'Failed to load users' });
    res.json(rows);
  });
});

// Country dropdown
app.get('/countries', async (req, res) => {
  try {
    const response = await fetch('https://restcountries.com/v3.1/all');
    const countries = await response.json();
    const formatted = countries.map(c => ({
      name: c.name.common,
      flag: c.flags?.png || '',
      capital: c.capital?.[0] || '',
      currency: c.currencies ? Object.values(c.currencies)[0].name : ''
    })).sort((a, b) => a.name.localeCompare(b.name));
    res.json(formatted);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch countries' });
  }
});

// Country info (protected route)
app.get('/countries', async (req, res) => {
    try {
      const response = await fetch('https://restcountries.com/v3.1/all');
      const countries = await response.json();
      const formatted = countries.map(c => ({
        name: c.name.common,
        flag: c.flags?.png || '',
        capital: c.capital?.[0] || '',
        currency: c.currencies ? Object.values(c.currencies)[0].name : ''
      })).sort((a, b) => a.name.localeCompare(b.name));
      res.json(formatted);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to fetch countries' });
    }
  });
  

// Start the server
app.listen(5002, () => console.log('Listening on port 5002'));
