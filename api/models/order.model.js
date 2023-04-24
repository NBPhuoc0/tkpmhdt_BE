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
        // Triggers
        hooks : {
          afterCreate: async (order, options) => {
            await sequelize.models.cart.destroy({
              where: {
                user_id: order.user_id
              }
            })
          }

        } 
      }
    );
  
    return order;
  };
  