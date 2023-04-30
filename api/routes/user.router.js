const userController = require("../controllers/user.controller");
const bookController = require("../controllers/book.controller");
const categoryController = require("../controllers/category.controller");
const orderController = require("../controllers/order.controller");
const cartController = require("../controllers/cart.controller");
const router = require("express").Router();
const verify = require("../middlewares/authJwt").verifyToken_User;

module.exports = (app) => {

    // get profile
    router.get("/profile", verify, userController.findByid);

    // update user
    router.put("/profile", verify, userController.updateProfile);

    // Retrieve all Books
    router.get("/books", bookController.findAll);

    // find a single book with id
    router.get("/books/id/:id", bookController.findByid);

    // find books by category
    router.post("/books/category", bookController.findByCategory);

    // get all categories
    router.get("/categories", categoryController.findAll);

    // get cart
    router.get("/cart", verify, cartController.getCart);

    // add item to cart
    router.post("/cart", verify, cartController.addItem);

    // remove item from cart
    router.delete("/cart", verify, cartController.removeItem);

    // create order
    router.post("/order", verify, orderController.createOder);

    // delete order
    // router.delete("/order", verify, orderController.deleteOrder);
    
    // get all orders
    router.get("/order", verify, orderController.getOders);

    // get order by id
    router.get("/order/:id", verify, orderController.getOderDetails);

    // get category by id
    router.get("/categories/:id", categoryController.findById);



    app.use('/user', router);
};
  