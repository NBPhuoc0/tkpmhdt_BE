module.exports = (sequelize, Sequelize, DataTypes) => {
    const cart = sequelize.define(
      "cart", // Model name
      {
        // Attributes
        id: {
          type: DataTypes.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true
        },
        total: {
          type: DataTypes.INTEGER,
          defaultValue: 0
        },
        total_quantity: {
          type: DataTypes.INTEGER,
          defaultValue: 0
        }
      }
    );
  
    return cart;
  };
  