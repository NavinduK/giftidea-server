var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var user = new mongoose.Schema({
    firstName: {type: String, required: true, maxLength: 64},
    lastName: {type: String, required: true, maxLength: 64},
    email: {
        type: String, 
        required: true, 
        unique: true, 
        maxLength: 512,
        validate: [
        { validator: function(email) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
            },message: "Please enter a valid email address."
        },{ validator: async function(email) {
              const user = await this.constructor.findOne({ email });
              if(user) {
                if(this.id === user.id) {
                  return true;
                }return false;
              }return true;
            },message: "Duplicate email adrress found."
          }]
    },
    password: {type: String, required: true,maxLength: 70,select: false},
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

module.exports = mongoose.model('User',user );
