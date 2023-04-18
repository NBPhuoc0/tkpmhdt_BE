const db = require("../models");

module.exports = {
    create : (req, res) => {
        if (!req.body.title) {
            res.status(400).send({
              message: "Content can not be empty!"
            });
            return;
        }

        // get data from request body
        const book = {
            title: req.body.title,
            author: req.body.author,
            price: req.body.price,
            description: req.body.description,
            publication_date: req.body.publication_date
        };

        // save book in the database
        db.books.create(book)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Book."
            });
        });
    },

    findAll : (req, res) => {
        db.books.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving books."
            });
        });
    },
    
    findByid : (req, res) => {
        const id = req.params.id;

        db.books.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Book with id=" + id
            });
        });
    },


}