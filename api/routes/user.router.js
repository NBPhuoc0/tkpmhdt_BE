module.exports = app => {
    const userController = require("../controllers/user.controller");
    const bookController = require("../controllers/book.controller");

    const router = require("express").Router();

    // Signup
    router.post("/signup", userController.signup);

    // Signin
    router.post("/signin", userController.signin);

    // Retrieve all Books
    router.get("/books", bookController.findAll);

    // find a single book with id
    router.get("/books/:id", bookController.findByid);

    // 


    app.use('/user', router);
};
  