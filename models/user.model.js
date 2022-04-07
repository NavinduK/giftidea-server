var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var user = new mongoose.Schema({
    firstName: {type: String, required: true, maxLength: 64},
    lastName: {type: String, required: true, maxLength: 64},
    email: {type: String, required: true, unique: true, maxLength: 512},
    password: {type: String, required: true,maxLength: 70},
});

user.pre('save', function(next){
    if(!this.isModified('password')){
        return next();
    }
    bcrypt.hash(this.password, 10, (err, passwordHash) => {
        if(err)
            return next(err);
        this.password = passwordHash;
        next();
    });
});

user.methods.comparePassword = function(password, cb){
    bcrypt.compare (password,this.password, (err, isMatch) => {
        if(err)
            return cb(err);
        else{
            if (!isMatch)
                return cb(null, isMatch);
        return cb(null,this);
        }
    });
}

module.exports = mongoose.model('User',user );
