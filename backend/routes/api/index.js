// backend/routes/api/index.js
const router = require('express').Router();
const loginRouter = require('./login.js');
const signupRouter = require('./signup.js');
const { restoreUser } = require("../../utils/auth.js");

// Connect restoreUser middleware to the API router
  // If current user session is valid, set req.user to the user in the database
  // If current user session is not valid, set req.user to null
router.use(restoreUser);

router.use('/login', loginRouter);

router.use('/signup', signupRouter);



router.post('/test', (req, res) => {
  res.json({ requestBody: req.body });
});

module.exports = router;
