const jwt = require('jsonwebtoken');
const config = require('../config');

exports.checkToken = (req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers['authorization'];
    if(token != undefined && token.startsWith('Bearer ')) {
        token = token.slice(7, token.length);
    }

    if(token) {
        jwt.verify(token, config.secret, (err, decoded) => {
            if(err) {
                return res.json({
                    success: false,
                    message: 'invalid token'
                });
            }

            req.decoded = decoded;
            next();
        });
    } else {
        console.log('Auth not supplied');
    }
}

exports.generateToken = (payload) => {
    return jwt.sign(
        { payload }, 
        config.secret, 
        { expiresIn: '48h' }
        )
}