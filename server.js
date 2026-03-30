const express  = require('express');
const mysql    = require('mysql2/promise');
const bcrypt   = require('bcryptjs');
const session  = require('express-session');
const cors     = require('cors');
const path     = require('path');

const app  = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// 🔥 IMPORTANT FIX (CORS)
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));

app.use(session({
  secret: 'pawpath_secret_key',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}));

// MySQL Connection
const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',   // 👉 put your MySQL password if any
  database: 'pawpath_db'
});

// Auth Middleware
const requireAuth = (req, res, next) => {
  if (req.session.user) return next();
  res.status(401).json({ error: 'Not authenticated' });
};

// ================= AUTH =================

// LOGIN
app.post('/api/auth/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const [rows] = await db.query(
      'SELECT * FROM USERS WHERE username = ?',
      [username]
    );

    if (!rows.length) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const user = rows[0];
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    req.session.user = {
      id: user.user_id,
      username: user.username,
      role: user.role
    };

    res.json({ success: true, user: req.session.user });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// REGISTER
app.post('/api/auth/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const hash = await bcrypt.hash(password, 10);

    await db.query(
      'INSERT INTO USERS (username, email, password, role) VALUES (?, ?, ?, ?)',
      [username, email, hash, 'staff']
    );

    res.json({ success: true });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET CURRENT USER
app.get('/api/auth/me', (req, res) => {
  if (req.session.user) {
    res.json({ user: req.session.user });
  } else {
    res.status(401).json({ error: "Not logged in" });
  }
});

// LOGOUT
app.post('/api/auth/logout', (req, res) => {
  req.session.destroy();
  res.json({ success: true });
});

// ================= PETS =================

app.get('/api/pets', requireAuth, async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM PET');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ================= FRONTEND =================

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ================= START =================

app.listen(PORT, () => {
  console.log(`🔥 Server running on port ${PORT}`);
  console.log(`Login → admin / password`);
});