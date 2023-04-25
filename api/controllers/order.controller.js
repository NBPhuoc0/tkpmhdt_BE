const db = require("../models");
const { findAll } = require("./category.controller");

module.exports = {
    createOder : async (req, res) => {
        if (!req.body.user_id) {
            res.status(400).send({
              message: "Content can not be empty!"
            });
            return;
        }

        let cart_id = null

        await db.cart.findOne({
            where: {
                user_id: req.body.user_id
            }
        }).then(data => {
            if (data) {
                cart_id = data.id;
            } else {
                db.cart.create({
                    user_id: req.body.user_id
                }).then(data => {
                    cart_id = data.id;
                })
            }
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Cart."
            });
        })

        let order_id = null
        await db.order.create({ user_id: req.body.user_id })
        .then(data => {
            order_id = data.id;
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Order."
            });
        });

        await db.cart_details.findAll({
            where: {
                cart_id: cart_id
            },
        }).then( async (data) => {
            await data.forEach(item => {
                db.cart_details.findOne({
                    where: {
                        cart_id: cart_id,
                        book_id: item.book_id
                    }
                }).then((data) =>  {
                    if(data) {
                        (db.order_details.create({
                            order_id: order_id,
                            book_id: data.book_id,
                            quantity: data.quantity,
                        })).catch(err => {
                            res.status(500).send({
                                message: err.message || "Some error occurred while add item to the Order."
                            });
                        })
                    }
                }).catch(err => {
                    res.status(500).send({
                        message: err.message || "Some error occurred while get Cart detail."
                    });
                })
            })
            await res.status(200).send({
                message: "Order was created successfully!"
            });
            
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while find the Cart."
            });
        })
    },

    deleteOrder : (req, res) => {
        const id = req.params.id;

        db.order.destroy({
            where: { id: id }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Order was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Order with id=${id}. Maybe Order was not found!`
                });
            }
        })
    },

    getAllOder: (req, res) => {
        db.order.findAll({
            include: [{
                model: db.user,
                attributes: ['name', 'email', 'phone', 'address']
            }]
        })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Order."
            });
        });
    },

    getOders : (req, res) => {
        const user_id = req.body.user_id;

        db.order.findAll({
            where: { user_id: user_id }
        })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Order."
            });
        });
    },

    getOderDetails : (req, res) => {
        db.order.findOne({
            where: { id: req.params.id },
            include: [{
                model: db.book,
                attributes : ['id', 'title', 'author', 'price', 'description', 'publication_date'], 
                through: {attributes: ['quantity','total']}
            }]
        })
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(400).send({
                    message: "Order not found!"              
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Order."
            });
        });
    },

}