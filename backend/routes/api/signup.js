// backend/routes/api/users.js
const express = require('express')
const router = express.Router();

const { setTokenCookie } = require('../../utils/auth');
const { User } = require('../../db/models');
const { validateSignup } = require('../../utils/validation');

/******************** POST ********************/

// Sign up
router.post('/', validateSignup, async (req, res) => {
    const { email, password, username, firstName, lastName } = req.body;

    const checkEmail = await User.findOne({ where: { email }});
    const checkUsername = await User.findOne({ where: { username }});

    if(checkEmail){
      const error = new Error("User with that email already exists");
      error.status = 403;
      error.message = ["Please enter a different Email...this Email already exists"];
      throw error;
    }

    if(checkUsername){
      const error = new Error("User with that username already exists");
      error.status = 403;
      error.message = ["Please enter a different username...this username already exists"];
      throw error;
    }

    const user = await User.signup({ email, username, firstName, lastName, password });

    const token = await setTokenCookie(res, user);
    
    return res.json({
      ...user.toSafeObject(),
      token
    });
  }
);

module.exports = router;
