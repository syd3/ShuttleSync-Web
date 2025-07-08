const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../firebase');
const JWT_SECRET = 'your_secret_key';

// Login route using Firestore and bcrypt
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const adminSnap = await db.collection('admin').where('username', '==', username).limit(1).get();
    if (adminSnap.empty) return res.status(401).json({ error: 'Invalid credentials' });
    const adminDoc = adminSnap.docs[0];
    const admin = adminDoc.data();
    const match = await bcrypt.compare(password, admin.password_hash);
    if (!match) return res.status(401).json({ error: 'Invalid credentials' });

    // Create JWT token
    const token = jwt.sign(
      { id: adminDoc.id, username: admin.username },
      JWT_SECRET,
      { expiresIn: '2h' }
    );
    res.json({ success: true, token, username: admin.username });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;