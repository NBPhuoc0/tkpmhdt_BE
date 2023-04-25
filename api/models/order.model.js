module.exports = (sequelize, Sequelize, DataTypes) => {
    const order = sequelize.define(
      "order", // Model name
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
      },
      {
        // Options
      }
    );
  
    return order;
  };
  