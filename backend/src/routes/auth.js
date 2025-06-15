// for hashing passwords
const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../db'); // your db connection file
const router = express.Router();

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

    // You can add JWT or session logic here if needed
    res.json({ success: true, username: user.username });
  });
});

module.exports = router;