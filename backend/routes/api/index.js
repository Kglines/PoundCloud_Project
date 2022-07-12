// backend/routes/api/index.js

const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
// User Ath Middleware Test
// const { setTokenCookie } = require('../../utils/auth');
// const { User } = require('../../db/models');
// GET /api/restore-user
const { restoreUser } = require('../../utils/auth.js');
// GET /api/require-auth
// const { requireAuth } = require('../../utils/auth.js');
// router.get(
//   '/require-auth',
//   requireAuth,
//   (req, res) => {
//     return res.json(req.user);
//   }
// );

// router.use('/session', sessionRouter);

// router.use('/users', usersRouter);

router.use(restoreUser);

router.get(
  '/restore-user',
  (req, res) => {
    return res.json(req.user);
  }
);


// router.post('/test', (req, res) => {
//   res.json({ requestBody: req.body });
// });

// A router is created and an API test route is added to the router
// router.post('/test', function(req, res) {
//   res.json({ requestBody: req.body });
// });

// router.get('/set-token-cookie', async (_req, res) => {
//   const user = await User.findOne({
//       where: {
//         username: 'Demo-lition'
//       }
//     });
//   setTokenCookie(res, user);
//   return res.json({ user });
// });


module.exports = router;
