const db = require("../models");

module.exports = {
    addItem : async (req, res) => {
        if (!req.body.book_id) {
            return res.status(400).send({
              message: "Content can not be empty!"
            });
            
        }

        let quantity = ( req.body.quantity == null ) ? 1 : req.body.quantity;

        let cart = await db.cart.findOne({
            where: {
                user_id: req.user_id
            }
        })

        if(cart == null || cart == []) {
            db.cart.create({
                user_id: req.user_id
            })
        }

        let book = await db.books.findOne({
            where: {
                id: req.body.book_id
            }
        })

        if(book == null) {
            return res.status(400).send({
                message: "Book not found!"
            });
        }
        
        try {  
            let cart_details = await db.cart_details.findOne({
                where: {
                    cart_id: cart.id,
                    book_id: book.id
                }
            })

            if(cart_details == null) {
                db.cart_details.create({
                    cart_id: cart.id,
                    book_id: book.id,
                    quantity: quantity
                })
            } else {
                await db.cart_details.update({
                    quantity: cart_details.quantity + quantity,
                    total : cart_details.total + (book.price * quantity)
                }, {
                    where: {
                        cart_id: cart.id,
                        book_id: book.id
                    }
                })

                await db.cart.update({
                    total: cart.total + (book.price * quantity),
                    total_quantity: cart.total_quantity + quantity
                }, {
                    where: {
                        id: cart.id
                    }
                })
            }

            res.status(200).send({
                message: "Item was added successfully!"
            });

        } catch (error) {
            res.status(500).send({
                message: error.message || "Some error occurred while retrieving carts."
            });
        }
    },

    removeItem : async (req, res) => {
        if (!req.body.book_id) {
            return res.status(400).send({
              message: "Content can not be empty!"
            });
        }

        let cart = await db.cart.findOne({
            where: {
                user_id: req.user_id
            }
        })

        if(cart == null) {
            db.cart.create({
                user_id: req.user_id
            })
        }

        // get data from request body
        const item = {
            cart_id: cart.id,
            book_id: req.body.book_id
        };

        try {
            await db.cart_details.destroy({
                where: {
                    cart_id: item.cart_id,
                    book_id: item.book_id
                },
                individualHooks: true
            })
            
            res.status(200).send({
                message: "Item was removed successfully!"
            });
            
        } catch (error) {
            res.status(500).send({
                message: error.message || "Some error occurred while retrieving carts."
            });
        }
    },

    getCart : async (req, res) => {
        let data = await db.cart.findOne({
            where: {
                user_id: req.user_id
            },
            include: [{
                model: db.books, 
                attributes : ['id', 'title', 'author', 'price', 'description', 'publication_date'], 
                through: {attributes: ['quantity','total']}
            }]
        })

        if(data == null) {
            data = await db.cart.create({
                user_id: req.user_id
            })
            return res.status(200).send(data);
        }

        res.status(200).send(data);
    }


}