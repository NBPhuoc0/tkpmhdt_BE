const book = require("./book.model.js");
const category = require("./category.model.js");

module.exports = (sequelize, Sequelize, DataTypes) => {
    const book_category = sequelize.define(
      "book_category", // Model name
      {}
    );
  
    return book_category;
  };
  