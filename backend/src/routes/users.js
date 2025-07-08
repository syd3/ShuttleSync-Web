const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const db = require('../firebase'); 

const JWT_SECRET = 'your_secret_key'; 

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
router.get('/users', authenticateToken, async (req, res) => {
  try {
    const usersSnapshot = await db.collection('users').get();
    const users = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a regular user
router.post('/users', authenticateToken, async (req, res) => {
  const { username, given_name, middle_initial, last_name, phone, email, user_photo } = req.body;
  if (!username || !given_name || !last_name || !email) {
    return res.status(400).json({ error: 'Username, given name, last name, and email are required.' });
  }
  if (!isValidEmail(email)) return res.status(400).json({ error: 'Invalid email format.' });
  try {
    const docRef = await db.collection('users').add({
      username,
      given_name,
      middle_initial: middle_initial || '',
      last_name,
      phone,
      email,
      user_photo: typeof user_photo === 'string' ? user_photo : '',
      date_created: new Date().toISOString()
    });
    res.json({ id: docRef.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Edit a regular user
router.put('/users/:id', authenticateToken, async (req, res) => {
  let { username, given_name, middle_initial, last_name, phone, email, user_photo } = req.body;
  try {
    const updateData = { username, given_name, middle_initial, last_name, phone, email, user_photo };
    Object.keys(updateData).forEach(key => {
      if (updateData[key] === undefined) delete updateData[key];
    });
    if (updateData.middle_initial === undefined) updateData.middle_initial = '';
    await db.collection('users').doc(req.params.id).update(updateData);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a regular user
router.delete('/users/:id', authenticateToken, async (req, res) => {
  try {
    await db.collection('users').doc(req.params.id).delete();
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all drivers
router.get('/drivers', authenticateToken, (req, res) => {
  db.all('SELECT id, photo as userPhoto, username as name, given_name, middle_initial, last_name, phone, email, platenumber as plate, date_created as date, vehicle_photo as vehiclePhoto FROM drivers', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
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
router.put('/drivers/:id', authenticateToken, async (req, res) => {
  let { username, given_name, middle_initial, last_name, phone, email, plate, userPhoto, vehiclePhoto } = req.body;
  try {
    const updateData = { username, given_name, middle_initial, last_name, phone, email, plate, userPhoto, vehiclePhoto };
    Object.keys(updateData).forEach(key => {
      if (updateData[key] === undefined) delete updateData[key];
    });
    if (updateData.middle_initial === undefined) updateData.middle_initial = '';
    await db.collection('drivers').doc(req.params.id).update(updateData);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a driver
router.delete('/drivers/:id', authenticateToken, (req, res) => {
  db.run('DELETE FROM drivers WHERE id = ?', [req.params.id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true });
  });
});

module.exports = router;
