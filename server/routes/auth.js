const express = require('express');
const router = express.Router();

const generateRandomToken = () => {
  return Math.random().toString(36).substring(2);
};

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username === 'admin' && password === 'admin') {
    const token = generateRandomToken();
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

router.post('/logout', (req, res) => {
  // Логика для выхода из системы (например, инвалидация токена)
  res.status(200).json({ message: 'Logout successful' });
});

module.exports = router;
