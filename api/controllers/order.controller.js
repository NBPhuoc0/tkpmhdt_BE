const db = require("../models");
const { findAll } = require("./category.controller");

module.exports = {
    createOder : async (req, res) => {
        if (!req.user_id) {
            res.status(400).send({
              message: "Content can not be empty!"
            });
            return;
        }

        let cart = await db.cart.findOne({
            where: {
                user_id: req.user_id
            }
        })

        if (cart != null) {
            if (cart.total == 0) {
                return res.status(400).send({
                    message: "Cart is empty!"
                });
            }
        } else {
            return res.status(400).send({
                message: "Cart is empty!"
            });
        }
        
        let order = await db.order.create({ user_id: req.user_id, total: cart.total, total_quantity: cart.total_quantity })
        
        const cartIteam = await db.cart_details.findAll({
            where: {
                cart_id: cart.id
            }
        })
              
        cartIteam.forEach(item => {
            db.order_details.create({
                order_id: order.id,
                book_id: item.book_id,
                quantity: item.quantity,
                total: item.total
            })
        });

        try {
            db.cart.destroy({
                where: { id: cart.id }            
            })
        } catch (error) {
            return res.status(500).send({
                message: err.message || "Some error occurred while destroy the cart."
            });
        }

        res.status(200).send(order)

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
        db.order.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Order."
            });
        });
    },

    getOders : async (req, res) => {
        let user_id = null
        if( req.isAdmin ) {
            user_id = await req.params.id
        }else { 
            user_id = await req.user_id 
        }

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
                model: db.books,
                attributes : ['id', 'title', 'author', 'price', 'description', 'publication_date', 'image'], 
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