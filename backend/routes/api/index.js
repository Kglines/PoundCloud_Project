// backend/routes/api/index.js
const express = require('express');
const router = express.Router();
const loginRouter = require('./login.js');
const signupRouter = require('./signup.js');
const { User } = require('../../db/models');
const { restoreUser, setTokenCookie, requireAuth } = require("../../utils/auth.js");

router.use('/login', loginRouter);

router.use('/signup', signupRouter);

// GET /api/set-token-cookie
router.get('/set-token-cookie', async (_req, res) => {
  const user = await User.findOne({
      where: {
        username: 'Demo-lition'
      }
    });
  setTokenCookie(res, user);
  return res.json({ user });
});

// Connect restoreUser middleware to the API router
  // If current user session is valid, set req.user to the user in the database
  // If current user session is not valid, set req.user to null
router.use(restoreUser);

// GET /api/restore-user
router.get('/restore-user', restoreUser, (req, res) => {
    return res.json(req.user);
  }
);

// GET /api/require-auth
router.get('/require-auth', requireAuth, (req, res) => {
    return res.json(req.user);
  }
);



router.post('/test', (req, res) => {
  res.json({ requestBody: req.body });
});

module.exports = router;
