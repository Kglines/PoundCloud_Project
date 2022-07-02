// backend/routes/index.js
const express = require('express');
const router = express.Router();
const apiRouter = require('./api');

// User Ath Middleware Test
const { setTokenCookie } = require('../utils/auth.js');
const { User } = require('../db/models');

router.get('/api/set-token-cookie', async (_req, res) => {
  const user = await User.findOne({
      where: {
        username: 'Demo-lition'
      }
    });
  setTokenCookie(res, user);
  return res.json({ user });
});

// GET /api/restore-user
const { restoreUser } = require('../utils/auth.js');
router.get(
  '/api/restore-user',
  restoreUser,
  (req, res) => {
    return res.json(req.user);
  }
);

// GET /api/require-auth
const { requireAuth } = require('../utils/auth.js');
router.get(
  '/api/require-auth',
  requireAuth,
  (req, res) => {
    return res.json(req.user);
  }
);


router.get('/hello/world', function(req, res) {
  res.cookie('XSRF-TOKEN', req.csrfToken());
  res.send('Hello World!');
});

// Add a XSRF-TOKEN cookie
router.get("/api/csrf/restore", (req, res) => {
  const csrfToken = req.csrfToken();
  res.cookie("XSRF-TOKEN", csrfToken);
  res.status(200).json({
    'XSRF-Token': csrfToken
  });
});

router.use('/api', apiRouter);

module.exports = router;
