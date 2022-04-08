var express = require('express');
var router = express.Router();
var Gift = require('../models/gift.model');

// Add a user
router.post('/people/:id/gifts', function (req, res) {
    var gift = new Gift(req.body);
    gift.save(function (err, gift) {
        console.log(gift);
        if (err) return res.status(500).json({ msg: 'Error adding gift.', data: err });
        return res.status(200).json({ data: gift });
    });

    //Add gift id to the person
    var id = req.params.id;
    //
    //
    //
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
    Gift.findOneAndDelete({ _id: req.params.giftId },
        function (err, gift) {
            if (err) return res.status(500).json({ msg: 'Error deleting gift.', data: err });
            return res.status(200).json({ msg: 'Deleted', data: gift });
        });

    //Remove gift id from the person
    var id = req.params.id;
    //
    //
    //
});

module.exports = router;
