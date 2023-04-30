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
            description: req.body.description,
            image: req.body.image
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

        db.category.update({isDelete: 1}, {
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

    findById : async (req, res) => {
        let id = req.params.id;
        id = id ? id : '';

        const data = await db.category.findAll({ where: {id : id}})
        if (data.length == 0) {
            return res.status(400).send({
                message: "Category not found!"
            });
        }
        res.status(200).send(data);
    },

    findAll : async (req, res) => {

        const data = await db.category.findAll();
        if (!data) {
            return res.status(400).send({
                message: "Category not found!"
            });
        }
        res.status(200).send(data);
    }

}
