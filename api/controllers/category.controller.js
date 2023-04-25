const db = require("../models");

module.exports = {
    create : (req, res) => {
        if (!req.body.name) {
            res.status(400).send({
              message: "Content can not be empty!"
            });
            return;
        }

        // get data from request body
        const category = {
            name: req.body.name,
        };

        // save book in the database
        db.category.findOne({where: {name: category.name}})
        .then(data => {
            if (data) {
                res.status(400).send({
                    message: "Category already exists!"
                });
            } else {
                db.category.create(category)
                .then(data => {
                    res.status(200).send({
                        message: "Category was created successfully."
                    });
                }).catch(err => {
                    res.status(500).send({
                        message: err.message || "Some error occurred while creating the Category."
                    });
                });
            }
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Category."
            });
        });
    },

    update : (req, res) => {
        const id = req.params.id;

        db.category.update(req.body, {
            where: { id: id }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Category was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Category with id=${id}. Maybe Category was not found or req.body is empty!`
                });
            }
        })
    },

    delete : (req, res) => {
        const id = req.params.id;

        db.category.destroy({
            where: { id: id }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Category was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Category with id=${id}. Maybe Category was not found!`
                });
            }
        })
    },

    findAll : (req, res) => {
        let name = req.query.name;
        name = name ? name : '';

        db.category.findAll({ where: {name : { [db.Op.substring]: name }}})
        .then(data => {
            res.send(data);
        })
    },


}