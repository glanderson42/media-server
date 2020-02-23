'use strict';

var mongoose = require('mongoose');
var User = mongoose.model('Users');

exports.listAllUsers = (req, res) => {
    User.find({}, (err, user) => {
        if(err) {
            res.send(err);
        }
        res.json(user);
    })
};

exports.createUser = (req, res) => {
    var new_user = new User(req.body);
    new_user.save((err, user) => {
        if(err) {
            res.send(err);
        }
        res.json(user)
    });
};

exports.readUser = (req, res) => {
    User.findById(req.params.id, (err, user) => {
        if(err) {
            res.send(err);
        }
        res.json(user);
    })
};

exports.updateUser = (req, res) => {
    User.findOneAndUpdate({
        _id: req.params.id
    }, req.body, {
        new: true
    }, (err, user) => {
        if(err) {
            res.send(err);
        }
        res.json(user);
    });
};

exports.deleteUser = (req, res) => {
    User.remove({
        _id: req.params.id
    }, (err, user) => {
        if(err) {
            res.send(err);
        }
        res.json({message: 'User deleted'});
    });
};