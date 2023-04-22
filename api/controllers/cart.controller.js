const db = require("../models");

module.exports = {
    addItem : (req, res) => {
        if (!req.body.cart_id && !req.body.book_id) {
            res.status(400).send({
              message: "Content can not be empty!"
            });
            return;
        }

        // get data from request body
        const item = {
            cart_id: req.body.cart_id,
            book_id: req.body.book_id,
            quantity: req.body.quantity
        };

        // save user in the database
        db.cart_details.create(item)
        .then(data => {
            res.send(data);
        })
    
    },

    updateItem : (req, res) => {
        if (!req.body.cart_id && !req.body.book_id) {
            res.status(400).send({
              message: "Content can not be empty!"
            });
            return;
        }

        // get data from request body
        const item = {
            cart_id: req.body.cart_id,
            book_id: req.body.book_id,
            quantity: req.body.quantity
        };

        // save user in the database
        db.cart_details.update(item, {
            where: {
                cart_id: item.cart_id,
                book_id: item.book_id
            }
        })
        .then(data => {
            res.send(data);
        })
    },

    removeItem : (req, res) => {
        if (!req.body.cart_id && !req.body.book_id) {
            res.status(400).send({
              message: "Content can not be empty!"
            });
            return;
        }

        // get data from request body
        const item = {
            cart_id: req.body.cart_id,
            book_id: req.body.book_id
        };

        // save user in the database
        db.cart_details.destroy({
            where: {
                cart_id: item.cart_id,
                book_id: item.book_id
            }
        })
        .then(data => {
            res.send(data);
        })
    },

    getCart : async (req, res) => {
        if (!req.body.user_id) {
            res.status(400).send({
              message: "Content can not be empty!"
            });
            return;
        }

        await db.cart.findAll({
            where: {
                user_id: req.body.user_id
            },
            attributes: ['id']
        }).then()
        // get data from request body
        const item = {
            cart_id: req.body.cart_id
        };

        // save user in the database
        db.cart_details.findAll({
            where: {
                cart_id: item.cart_id
            }
        })
        .then(data => {
            res.send(data);
        })
    }


}