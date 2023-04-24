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
        // Triggers
        hooks : {
          afterCreate: async (order_detail, options) => {
            let price = 0;
            await sequelize.models.book.findOne({
              attributes: ['price'],
              where: {
                id: order_detail.book_id
              }
            }).then(data => {
              price = data.price * order_detail.quantity
            })
            await sequelize.models.order_detail.increment( {total:price}, {where : {order_id:order_detail.order_id, book_id:order_detail.book_id} } )
            await sequelize.models.order.increment( {total:price, total_quantity:order_detail.quantity}, {where : {id:order_detail.order_id} } )
          },

          beforeDestroy: async (order_detail, options) => {
            let price = 0;
            await sequelize.models.book.findOne({
              attributes: ['price'],
              where: {
                id: order_detail.book_id
              }
            }).then(data => {
              price = data.price * order_detail.quantity
            })
            await sequelize.models.order.decrement( {total:price, total_quantity:order_detail.quantity}, {where : {id:order_detail.order_id} } )
          }
        }
      }
      
    );

  
    return order_detail;
  };
  