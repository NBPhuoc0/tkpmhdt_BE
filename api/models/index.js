const config = require("../config/db.config");
const { Sequelize, DataTypes, Op } = require("sequelize");

const sequelize = new Sequelize(
  config.db.DB_NAME,
  config.db.DB_USER,
  config.db.DB_PASS,
  {
    host: config.db.DB_HOST,
    dialect: config.db.dialect,
    operatorsAliases: false,

    poll: {
      max: config.db.pool.max,
      min: config.db.pool.min,
      acquire: config.db.pool.acquire,
      idle: config.db.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.Op = Op;
db.sequelize = sequelize;

db.books = require("./book.model.js")(sequelize, Sequelize, DataTypes);
db.user = require("./user.model.js")(sequelize, Sequelize, DataTypes);
db.cart = require("./cart.model.js")(sequelize, Sequelize, DataTypes);
db.cart_details = require("./cart_details.model.js")(sequelize, Sequelize, DataTypes);
db.order = require("./order.model.js")(sequelize, Sequelize, DataTypes);
db.order_details = require("./order_details.model.js")(sequelize, Sequelize, DataTypes);
db.category = require("./category.model.js")(sequelize, Sequelize, DataTypes);
db.book_category = require("./book_category.model.js")(sequelize, Sequelize, DataTypes);

// RELATIONSHIPS
// Books vs Category
db.books.belongsToMany(db.category, { through: db.book_category, foreignKey: 'book_id' });
db.category.belongsToMany(db.books, { through: db.book_category, foreignKey: 'category_id' });

// Books vs Cart
db.books.belongsToMany(db.cart, { through: db.cart_details ,foreignKey: 'book_id' });
db.cart.belongsToMany(db.books, { through: db.cart_details ,foreignKey: 'cart_id' });

// Books vs Order
db.books.belongsToMany(db.order, { through: db.order_details ,foreignKey: 'book_id' });
db.order.belongsToMany(db.books, { through: db.order_details ,foreignKey: 'order_id' });

// User vs cart
db.user.hasMany(db.cart, { foreignKey: 'user_id' });
db.cart.belongsTo(db.user, { foreignKey: 'user_id' });

// User vs order
db.user.hasMany(db.order, { foreignKey: 'user_id' });
db.order.belongsTo(db.user, { foreignKey: 'user_id' });

module.exports = db;
