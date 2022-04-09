var express = require('express');
var router = express.Router();
var User = require('../models/user.model');
var bcrypt = require('bcrypt');

//Get current users
router.get('/users/me', function(req, res) {
  const ID_token = req.headers.authorization;
  User.findById(ID_token, (err, user) => {
    if(err) return res.status(500).json({ msg : 'ERROR_FETCH_USERS', data: err});
    return res.status(200).json({ data: user});
  });
});

// Add a user
router.post('/users', function (req, res) {
  var user = new User(req.body);
  user.save(function (err, user) {
    console.log(user);
    if (err) return res.status(500).json({ msg: 'Error adding user', data: err });
    return res.status(200).json({ data: user });
  });
});

// Login
router.post('/tokens', function (req, res) {
  var email = req.body.email;
  var pw = req.body.password;
  User.findOne({ 'email': email }, function (err, profile) {
    if (err) return res.status(500).json(err);
    if (!profile) {
      return res.status(400).json({msg:'INVALID_EMAIL'});
    }
    bcrypt.compare(pw, profile.password, function(err, result) {
      if (!result) {
        return res.status(400).json({msg:'INVALID_PWD'});
      } else {
        // var token = jwt.sign(profile._id, config.secret, {
        //   expiresIn: '7d'
        // });
        const payload = {
          firstname: profile.firstName,
          lastname: profile.lastName,
          email: profile.email
        };
        const token = profile._id;
        return res.status(200).json({ profile: payload, tokenID: token });
      }
    });
  }).select("+password");
});

//Update a user
router.put('/users/me', function(req, res) {
  const pw = req.body.password;
  const ID_token = req.headers.authorization;
  User.findById(ID_token, (err, user) => {
    if(err) return res.status(500).json({ msg : 'ERROR_FETCH_USERS', data: err});
    user.password = pw;
    user.save();
    return res.status(200).json({ msg : 'Password update success.'});
  });
});

module.exports = router;
