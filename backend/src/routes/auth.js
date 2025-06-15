const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../db'); 
const router = express.Router();
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your_secret_key'; 

// for hashing passwords
router.post('/register', async (req, res) => {
  const { username, password, photo, phone, email } = req.body;
  try {
    const hash = await bcrypt.hash(password, 10);
    db.run(
      'INSERT INTO users (photo, username, phone, email, password_hash) VALUES (?, ?, ?, ?, ?)',
      [photo, username, phone, email, hash],
      function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ id: this.lastID });
      }
    );
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login route
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  db.get('SELECT * FROM admin WHERE username = ?', [username], async (err, user) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) return res.status(401).json({ error: 'Invalid credentials' });

    // Create JWT token
    const token = jwt.sign(
      { id: user.id, username: user.username },
      JWT_SECRET,
      { expiresIn: '2h' }
    );

    res.json({ success: true, token, username: user.username });
    
  });
});

module.exports = router;