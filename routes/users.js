var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/user.model');

//Get all users
router.get('/users', function(req, res) {
  User.find({}, (err, user) => {
    if(err) { return res.status(500).json({ msg : 'ERROR_FETCH_USERS', data: err}); }
    //remove password
    return res.status(200).json({ data: user[firstName,lastName,email]});
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

// //Update a user
// router.put('/update/:id', function(req,res,next)
// {
//   // check email for validation since email cannot be changed.
//   User.findOneAndUpdate({_id : req.params.id},req.body,{new:true},
//     function (err, user) {
//       if (err) return res.status(500).json({ msg: 'Error updating user', data: err });
//       return res.status(200).json({ msg: 'Updated', data: req.body });
//     });
// });

// //Delete a user
// router.delete('/delete/:id', function(req,res,next)
// {
//   User.findOneAndDelete({_id : req.params.id},
//     function (err, user) {
//       if (err) return res.status(500).json({ msg: 'Error deleting user', data: err });
//       return res.status(200).json({ msg: 'Deleted', data: user });
//   });
// });

// /* GET users listing. */
// router.get('/:id', function (req, res) {
//   User.findById(req.params.id,'-password -salt', (err, user) => {
//     if(err) { return res.status(500).json({ msg : 'error fetching user'}); }
//     return res.status(200).json({ data: user });
//   });
// });


module.exports = router;
