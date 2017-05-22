var mongoose = require('mongoose'),
    bcrypt = require('bcrypt'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId,
    SALT_WORK_FACTOR = 10;

var UserSchema = new Schema({
    id: ObjectId,
    username: String,
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: String,
    age: Number,
    active: Boolean,
    signUpMethd: Number,
    created: Date
});

UserSchema.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();
    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);
        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);
            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

UserSchema.statics.register = function(email, password, username) {
    return new Promise((resolve, reject) => {
        var newUser = new this({
            email: email,
            password: password,
            username: username
        });

        newUser.save((error, user) => {
            if (error) {
                return reject(error);
            }

            return resolve(user);
        });
    });
};

UserSchema.statics.login = function(email, password) {
    return new Promise((resolve, reject) => {
        // fetch user and test password verification
        this.findOne({ email: email }, (error, user) => {
            if (error) {
                return reject(error);
            }
            if (!user) {
                return reject("user account does not exist");
            }

            user.comparePassword(password, (error, isMatch) => {
                if (error) {
                    return reject(error);
                }
                if (isMatch) {
                    return resolve(user);
                } else {
                    return reject("password is wrong");
                }
            });
        });
    });
};

module.exports = mongoose.model('User', UserSchema);
