const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
router.post("/login", (req, res, next) => {
  User.findOne({email: req.body.email})
    .then(user => {
        if(!user){
          return res.status(404).json({message: "User not found"});
        }
        bcrypt.compare(req.body.password, user.password);
    })
    .then(result => {
      if(!result){
        return res.status(404).json({message: "User not found"});
      }
      const token = jwt.sign({email: user.email, userId: user._id}, "secret", {expiresIn: '1h'});
    });
});

});
module.exports = router;
