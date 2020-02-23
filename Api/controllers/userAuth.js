const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = mongoose.model('Users');

exports.authUser = (req, res) => {
    User.find(req.username, (err, user) => {
        if(err) {
            res.send(err);
        }

        if(user.password == req.password) {
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
            res.send(400).json({
                success: false,
                message: 'Authentication failed! Please check the request'
            });
        }
    })
}