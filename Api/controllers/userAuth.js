const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = mongoose.model('Users');

exports.authUser = (req, res) => {
    User.findOne(req.username, (err, user) => {
        if(err) {
            //res.send(err);
            console.log(err);
        }

        if(user.password == req.body.password && user.isVerified) {
            let token = jwt.sign(
                {
                    username: user.username
                },
                'secret',
                {
                    expiresIn: '24h'
                }
            );

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