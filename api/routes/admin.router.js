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

  // add category
  router.post("/categories", categoryController.create);

  // update category
  router.put("/categories/:id", categoryController.update);

  // delete category
  router.delete("/categories/:id", categoryController.delete);

  // get all categories
  router.get("/categories", categoryController.findAll);

  // Create a new Book
  router.post("/books", bookController.create);

  // Update a Book with id
  router.put("/books/:id", bookController.update);

  // Delete a Book with id
  router.delete("/books/:id", bookController.delete);

  // Retrieve all Books
  router.get("/books", bookController.findAll);

  // find a single book with id
  router.get("/books/:id", bookController.findByid);

  // add category to book
  router.post("/books/:id/categories", bookController.addBook_Category);

  // remove category from book
  router.delete("/books/:id/categories", bookController.removeBook_Category);

  // get Oders
  router.get("/order/all", orderController.getAllOder);

  // get Oders
  router.get("/order", orderController.getOders);

  // get order by id
  router.get("/order/:id", orderController.getOderDetails);




  app.use('/admin', router);
};
