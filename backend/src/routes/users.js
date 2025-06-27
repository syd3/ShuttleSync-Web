const express = require('express');
const db = require('../db');
const jwt = require('jsonwebtoken');
const router = express.Router();

const JWT_SECRET = 'your_secret_key'; // Use env var in production

// Middleware to verify JWT
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// Email validation helper
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Get all regular users
router.get('/users', authenticateToken, (req, res) => {
  db.all('SELECT id, photo as userPhoto, username as name, given_name, middle_initial, last_name, phone, email, date_created as date FROM users', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Get all drivers
router.get('/drivers', authenticateToken, (req, res) => {
  db.all('SELECT id, photo as userPhoto, username as name, given_name, middle_initial, last_name, phone, email, platenumber as plate, date_created as date, vehicle_photo as vehiclePhoto FROM drivers', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Add a regular user
router.post('/users', authenticateToken, (req, res) => {
  const { username, given_name, middle_initial, last_name, phone, email, userPhoto } = req.body;
  if (!username || !given_name || !last_name || !email) {
    return res.status(400).json({ error: 'Username, given name, last name, and email are required.' });
  }
  if (!isValidEmail(email)) return res.status(400).json({ error: 'Invalid email format.' });
  db.run(
    'INSERT INTO users (username, given_name, middle_initial, last_name, phone, email, photo, date_created, password_hash) VALUES (?, ?, ?, ?, ?, ?, ?, datetime("now"), "")',
    [username, given_name, middle_initial || '', last_name, phone, email, userPhoto],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID });
    }
  );
});

// Edit a regular user
router.put('/users/:id', authenticateToken, (req, res) => {
  const { username, given_name, middle_initial, last_name, phone, email, userPhoto } = req.body;
  if (!username || !given_name || !last_name || !email) {
    return res.status(400).json({ error: 'Username, given name, last name, and email are required.' });
  }
  if (!isValidEmail(email)) return res.status(400).json({ error: 'Invalid email format.' });
  db.run(
    'UPDATE users SET username = ?, given_name = ?, middle_initial = ?, last_name = ?, phone = ?, email = ?, photo = ? WHERE id = ?',
    [username, given_name, middle_initial || '', last_name, phone, email, userPhoto, req.params.id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ success: true });
    }
  );
});

// Delete a regular user
router.delete('/users/:id', authenticateToken, (req, res) => {
  db.run('DELETE FROM users WHERE id = ?', [req.params.id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true });
  });
});

// Add a driver
router.post('/drivers', authenticateToken, (req, res) => {
  const { username, given_name, middle_initial, last_name, phone, email, plate, userPhoto, vehiclePhoto } = req.body;
  if (!username || !given_name || !last_name || !email) {
    return res.status(400).json({ error: 'Username, given name, last name, and email are required.' });
  }
  if (!isValidEmail(email)) return res.status(400).json({ error: 'Invalid email format.' });
  db.run(
    'INSERT INTO drivers (username, given_name, middle_initial, last_name, phone, email, platenumber, photo, vehicle_photo, date_created, password_hash) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, datetime("now"), "")',
    [username, given_name, middle_initial || '', last_name, phone, email, plate, userPhoto, vehiclePhoto],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID });
    }
  );
});

// Edit a driver
router.put('/drivers/:id', authenticateToken, (req, res) => {
  const { username, given_name, middle_initial, last_name, phone, email, plate, userPhoto, vehiclePhoto } = req.body;
  if (!username || !given_name || !last_name || !email) {
    return res.status(400).json({ error: 'Username, given name, last name, and email are required.' });
  }
  if (!isValidEmail(email)) return res.status(400).json({ error: 'Invalid email format.' });
  db.run(
    'UPDATE drivers SET username = ?, given_name = ?, middle_initial = ?, last_name = ?, phone = ?, email = ?, platenumber = ?, photo = ?, vehicle_photo = ? WHERE id = ?',
    [username, given_name, middle_initial || '', last_name, phone, email, plate, userPhoto, vehiclePhoto, req.params.id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ success: true });
    }
  );
});

// Delete a driver
router.delete('/drivers/:id', authenticateToken, (req, res) => {
  db.run('DELETE FROM drivers WHERE id = ?', [req.params.id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true });
  });
});

module.exports = router;
