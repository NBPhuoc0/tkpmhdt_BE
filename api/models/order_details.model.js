module.exports = (sequelize, Sequelize, DataTypes) => {
    const order_detail = sequelize.define(
      "order_detail", // Model name
      {
        // Attributes
        quantity: {
          type: DataTypes.INTEGER,
          defaultValue: 0
        },
        total: {
          type: DataTypes.INTEGER,
          defaultValue: 0
        }
      },
      {
        // Options
      }
      
    );

  
    return order_detail;
  };
  