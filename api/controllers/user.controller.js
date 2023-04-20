const db = require("../models");

module.exports = {
    signup : (req, res) => {
        if (!req.body.username) {
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
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the user."
            });
        });
    },

}