module.exports = app => {
    const userController = require("../controllers/user.controller");
    const bookController = require("../controllers/book.controller");
    const categoryController = require("../controllers/category.controller");
    const orderController = require("../controllers/order.controller");
    const cartController = require("../controllers/cart.controller");

    const router = require("express").Router();

    // Signup
    router.post("/signup", userController.signup);

    // Signin
    router.post("/signin", userController.signin);

    // update user
    router.put("/user/:id", userController.updateProfile);

    // Retrieve all Books
    router.get("/books", bookController.findAll);

    // find a single book with id
    router.get("/books/:id", bookController.findByid);

    // get all categories
    router.get("/categories", categoryController.findAll);

    // get cart
    router.get("/cart", cartController.getCart);

    // add item to cart
    router.post("/cart", cartController.addItem);

    // remove item from cart
    router.delete("/cart", cartController.removeItem);

    // create order
    router.post("/order", orderController.createOder);

    // delete order
    router.delete("/order/:id", orderController.deleteOrder);
    
    // get all orders
    router.get("/order", orderController.getOders);

    // get order by id
    router.get("/order/:id", orderController.getOderDetails);



    app.use('/user', router);
};
  