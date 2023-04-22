const db = require("../models");
const { findAll } = require("./category.controller");

module.exports = {
    createOder : async (req, res) => {
        if (!req.body.cart_id) {
            res.status(400).send({
              message: "Content can not be empty!"
            });
            return;
        }

        // save user in the database
        await db.order.create(order({ user_id: user.id }))
        .then(data => {
            let order_id = data.id
        })

        await db.cart_details.findAll({
            where: {
                cart_id: req.body.cart_id
            },
        }).then(data => {
            data.forEach(item => {
                addItem(req.body.cart_id,item.book_id,order_id)
            })
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
    }

}

async function addItem (cart_id,book_id,order_id) {
    let item = null

    await db.cart_details.findAll({
        where: {
            cart_id: cart_id,
            book_id: book_id
        },
        attributes: ['quantity']
    }).then(data => {item = {
        order_id: order_id,
        book_id: book_id,
        quantity: data
    }})

    await db.order_details.create(item)
    .then(data => {
        res.send(data);
    })
}