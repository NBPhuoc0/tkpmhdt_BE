module.exports = app => {
  const bookController = require("../controllers/book.controller.js");

  const router = require("express").Router();

  // Create a new Book
  router.post("/", bookController.create);

  // find all books
  router.get("/", bookController.findAll);

  // find a single book with id
  router.get("/:id", bookController.findByid);

  app.use('/api/books', router);
};
