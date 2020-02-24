'use strict';

module.exports = (app) => {
    var userAuthController = require('../controllers/userAuth');
    //var jwtMiddleware = require('../middleware/jwt');

    app.route('/auth')
        .post(userAuthController.authUser);

    app.route('/verify')
        .get(userAuthController.emailConfirm);
}