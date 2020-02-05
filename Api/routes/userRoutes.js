'use strict';

module.exports = (app) => {
    var userController = require('../controllers/userController');

    app.route('/user')
        .get(userController.list_all_users)
        .post(userController.create_a_user);

    app.route('/user/:id')
        .get(userController.read_a_user)
        .put(userController.update_a_user)
        .delete(userController.delete_a_user);
}