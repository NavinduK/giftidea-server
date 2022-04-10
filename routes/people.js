var express = require('express');
var router = express.Router();
var People = require('../models/people.model');
var Gift = require('../models/gift.model');

//Get all people
router.get('/people', function (req, res) {
  People.find({ "owner":req.headers.authorization }, (err, people) => {
    if (err) { return res.status(500).json({ msg: 'ERROR_FETCH_PEOPLE', data: err }); }
    return res.status(200).json({ data: people });
  });
});

//Get person by id
router.get('/people/:id', function (req, res) {
  const id = req.params.id;
  People.findById(id, (err, person) => {
    if (err) return res.status(500).json({ msg: 'ERROR_FETCH_PERSON_DATA', data: err });
    return res.status(200).json({ data: person });
  }).populate('gifts');
});

// Add a person
router.post('/people', function (req, res) {
  var person = {
    name: req.body.name,
    birthDate: req.body.birthDate,
    owner: req.headers.authorization,
  }
  var people = new People(person);
  people.save(function (err, people) {
    if (err) return res.status(500).json({ msg: 'Error adding person', data: err });
    return res.status(200).json({ data: people });
  });
});

//Update a person
router.patch('/people/:id', function (req, res) {
  var person = {
    name: req.body.name,
    birthDate: req.body.birthDate,
    updatedAt: Date.now()
  }
  People.findOneAndUpdate({ _id: req.params.id }, person, { new: true },
    function (err, person) {
      if (err) return res.status(500).json({ msg: 'Error updating person.', data: err });
      return res.status(200).json({ msg: 'Updated', data: person });
    });
});

//Replace a user
router.put('/people/:id', function (req, res) {
  People.findById(req.params.id, (err, people) => {
    if (err) return res.status(500).json({ msg: 'Error replacing person.', data: err });
    people.name = req.body.name;
    people.birthDate = req.body.birthDate;
    people.updatedAt = Date.now();
    people.gifts = [];
    people.save();
    return res.status(200).json({ msg: 'Person replace success.' });
  });
});

//Delete a person
router.delete('/people/:id', function (req, res) {
  People.findOneAndDelete({ _id: req.params.id },
    function (err, person) {
      if (err) return res.status(500).json({ msg: 'Error deleting person.', data: err });
      if(person.gifts.length > 0) {
          Gift.deleteMany({_id: { $in: person.gifts} },
            function (err2) {
              if (err2) return res.status(500).json({ msg: 'Error deleting gifts of person.', data: err });
              return res.status(200).json({ msg: 'Deleted', data: person });
            });
      }
      else
        return res.status(200).json({ msg: 'Deleted', data: person });
    });
});

module.exports = router;
