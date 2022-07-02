// backend/routes/api/index.js
const router = require('express').Router();

// A router is created and an API test route is added to the router
router.post('/test', function(req, res) {
  res.json({ requestBody: req.body });
});

module.exports = router;
