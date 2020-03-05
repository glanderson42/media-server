const mongoose = require('mongoose');
const jwt = require('../middleware/jwt');
const User = mongoose.model('Users');
const config = require('../config');

exports.authUser = (req, res) => {
    User.findOne(req.username, (err, user) => {
        if(err) {
            //res.send(err);
            console.log(err);
        }

        if(user.password == req.body.password && user.isVerified) {
            let token = jwt.generateToken(user.username)

            res.json({
                success: true,
                message: 'Authentication successful!',
                token: token
            });
        } else {
            res.json({
                success: false,
                message: 'Authentication failed! Please check the request'
            });
        }
    })
};

exports.emailConfirm = (req, res) => {
    User.findOneAndUpdate({
        _id: req.query.id
    }, {
        $set: {
            isVerified: true
        }
    }, {
        new: true
    }).then(updatedDoc => {
        if(updatedDoc) {
            res.json({
                verified: true
            });
        } else {
            res.json({
                verified: false
            });
        }
    })
}