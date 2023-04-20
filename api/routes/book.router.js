module.exports = app => {
  const bookController = require("../controllers/book.controller");

  const router = require("express").Router();

  // Create a new Book
  router.post("/", bookController.create);

  // Update a Book with id
  router.put("/:id", bookController.update);

  // Delete a Book with id
  router.delete("/:id", bookController.delete);

  // Retrieve all Books
  router.get("/", bookController.findAll);

  // find a single book with id
  router.get("/id/:id", bookController.findByid);

  // find all books by author
  router.get("/author", bookController.findByAuthor);

  // find all books by title
  router.get("/title", bookController.findByTitle);

  // find all books by price
  router.get("/price", bookController.findByPrice);

  // find all books by publication year
  router.get("/year", bookController.findByYear);

  app.use('/books', router);
};
