const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');

router.post("/signup", (req ,res , next) => {

    bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        email: req.body.email,
        password: hash
      });
      user.save()
      .then(result => {
          res.json({
            message: 'User is added to the databse',
            result: result
          });
      })
      .catch(err => {
        res.json({
          error: err
        });
      });
    });


});
module.exports = router;
