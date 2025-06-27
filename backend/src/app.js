const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const usersRoutes = require('./routes/users');

const app = express();
app.use(cors());
app.use(express.json());

// Mount your auth routes at /api/auth
app.use('/api/auth', authRoutes);
// Mount users routes at /api
app.use('/api', usersRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});