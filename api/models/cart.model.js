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
      },
      {
        // Triggers
        hooks : {
          beforeDestroy: (cart, options) => {
            sequelize.models.cart.created({user_id : cart.user_id})
          }
        }
      }
    );
  
    return cart;
  };
  