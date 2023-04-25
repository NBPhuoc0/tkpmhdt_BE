const db = require("../models");

module.exports = {
    addItem : async (req, res) => {
        if (!req.body.user_id || !req.body.book_id) {
            res.status(400).send({
              message: "Content can not be empty!"
            });
            return;
        }

        let quantity = req.body.quantity || 1;

        let cart_id = await db.cart.findOne({
            where: {
                user_id: req.body.user_id
            }
        }).then(data => {
            if (data) {
                return data.id;
            } else {
                return db.cart.create({
                    user_id: req.body.user_id
                }).then(data => {
                    return data.id;
                })}
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Cart."
            });
        })
                
        await db.cart_details.findOne({
            where: {
                cart_id: cart_id,
                book_id: req.body.book_id
        }})
        .then(async (data) =>  {
            if (data) 
            { 
                quantity = await (data.quantity + quantity)
                await db.cart_details.destroy({
                        where: {
                            cart_id: cart_id,
                            book_id: req.body.book_id
                        }
                    })
            }
            await db.cart_details.create({
                cart_id: cart_id,
                book_id: req.body.book_id,
                quantity: quantity
            }).then(data => {
                res.status(200).send({
                    message: "Item was added successfully!"
                });
            })
            
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Cart."
            });
        })            
    },

    removeItem : (req, res) => {
        if (!req.body.user_id || !req.body.book_id) {
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
            res.status(200).send({
                message: "Item was removed successfully!"
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while removing the Item."
            });
        });
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
            include: [{
                model: db.books, 
                attributes : ['id', 'title', 'author', 'price', 'description', 'publication_date'], 
                through: {attributes: ['quantity','total']}
            }]
        })
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving carts."
            });
        });
    }


}