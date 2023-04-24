const db = require("../models");
const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");

module.exports = {
    signup : (req, res) => {
        if (!req.body.username && !req.body.email && !req.body.password) {
            res.status(400).send({
              message: "Content can not be empty!"
            });
            return;
        }

        // get data from request body
        const user = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        };

        // save user in the database
        db.user.create(user)
        .then(data => {
            res.status(200).send({
                message: "User was registered successfully!"
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the user."
            });
        });
    },

    signin : (req, res) => {
        if (!req.body.username && !req.body.password) {
            res.status(400).send({
              message: "Content can not be empty!"
            });
            return;
        }

        // get data from request body
        const user = {
            username: req.body.username,
            password: req.body.password
        };

        // save user in the database
        db.user.findOne({
            where: {
                username: user.username,
                password: user.password
            }
        })
        .then(data => {
            if (data){
                var token = jwt.sign({ id: data.id }, config.secret, {
                    expiresIn: 60*60*24 // 24 hours
                });
                res.status(200).send({
                    id: data.id,
                    username: data.username,
                    email: data.email,
                    accessToken: token
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the user."
            });
        });
    },

    updateProfile : (req, res) => {
        if (!req.body) {
            res.status(400).send({
              message: "Content can not be empty!"
            });
            return;
        }
        // save user in the database
        db.user.update(req.body, {
            where: {
                id: req.body.id
            }
        })
        .then(data => {
            res.status(200).send({
                message: "User was updated successfully!"
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while updating the user."
            });
        });
    },

    findAll : (req, res) => {
        db.user.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving users."
            });
        });
    },

    findByid : (req, res) => {
        const id = req.params.id;

        db.user.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving user with id=" + id
            });
        });
    }

}