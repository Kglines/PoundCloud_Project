// backend/routes/index.js
const express = require('express');
const router = express.Router();
const songsRouter = require('./songs.js');
const currentUserRouter = require('./currentUser.js');
const playlistRouter = require('./playlist.js');
const commentRouter = require('./comments.js')
const albumRouter = require('./albums.js');
const apiRouter = require('./api');

const { restoreUser } = require('../utils/auth.js');
router.use('/api', apiRouter);
router.use('/songs', songsRouter);
router.use('/currentUser', currentUserRouter);
router.use('/playlists', playlistRouter);
router.use('/comments', commentRouter);
router.use('/albums', albumRouter);

// GET /api/restore-user
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

// Hello World Test Route
// router.get('/hello/world', function(req, res) {
//   res.cookie('XSRF-TOKEN', req.csrfToken());
//   res.send('Hello World!');
// });

// Add a XSRF-TOKEN cookie
router.get("/api/csrf/restore", (req, res) => {
  const csrfToken = req.csrfToken();
  res.cookie("XSRF-TOKEN", csrfToken);
  res.status(200).json({
    'XSRF-Token': csrfToken
  });
});



module.exports = router;
