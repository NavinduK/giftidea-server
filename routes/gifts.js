var express = require('express');
var router = express.Router();
var Gift = require('../models/gift.model');
var People = require('../models/people.model');

// Add a gift
router.post('/people/:id/gifts', function (req, res) {
    //Add gift and the gift id to the person
    People.findById(req.params.id, (err, person) => {
        if (err || person==null) return res.status(500).json({ msg: 'Error find person to add gift.', data: err });
        var gift = new Gift(req.body);
        gift.save(function (err, gift) {
            if (err) return res.status(500).json({ msg: 'Error adding gift.', data: err });
            person.gifts.push(gift._id);
            person.save();
            return res.status(200).json({ data: gift });
        });
    });
});

//Update a gift
router.patch('/people/:id/gifts/:giftId', function (req, res) {
    Gift.findOneAndUpdate({ _id: req.params.giftId }, req.body, { new: true },
        function (err, gift) {
            if (err) return res.status(500).json({ msg: 'Error updating gift.', data: err });
            return res.status(200).json({ msg: 'Updated', data: gift });
        });
});

//Delete a gift
router.delete('/people/:id/gifts/:giftId', function (req, res) {
    //Remove gift and the id from the person
    People.findById(req.params.id, (err, person) => {
        if (err || person==null) return res.status(500).json({ msg: 'Error find person to add gift.', data: err });
        Gift.findOneAndDelete({ _id: req.params.giftId },
            function (err, gift) {
                if (err) return res.status(500).json({ msg: 'Error deleting gift.', data: err });
                const giftIDX = person.gifts.indexOf(gift._id);
                if (giftIDX > -1) {
                    person.gifts.splice(giftIDX, 1);
                    person.save();
                }
                return res.status(200).json({ msg: 'Deleted', data: gift });
        });
    });
});

module.exports = router;
