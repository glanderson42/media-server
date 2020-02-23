'use strict';

const jwt = require('../middleware/jwt');

module.exports = (app) => {
    const userController = require('../controllers/userController');

    app.route('/user')
        .get(jwt.checkToken, userController.listAllUsers)
        .post(userController.createUser);

    app.route('/user/:id')
        .get(userController.readUser)
        .put(userController.updateUser)
        .delete(userController.deleteUser);
}