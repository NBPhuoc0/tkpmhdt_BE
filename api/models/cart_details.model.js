module.exports = (sequelize, Sequelize, DataTypes) => {
    const cart_details = sequelize.define(
      "cart_details", // Model name
      {
        // Attributes
        quantity: {
          type: DataTypes.INTEGER,
          defaultValue: 1
        }
      },
      {
        // Triggers
        hooks : {
          afterCreate: async (cart_details, options) => {
            const price = await db.book.findOne({
              attributes: ['price'],
              where: {
                id: cart_details.book_id
              }
            }) * cart_details.quantity;
            
            await db.cart.increment( {total:price, total_quantity:cart_details.quantity}, {where : {id:cart_details.cart_id} } )
          },

          beforeDestroy: async (cart_details, options) => {
            const price = await db.book.findOne({
              attributes: ['price'],
              where: {
                id: cart_details.book_id
              }
            }) * cart_details.quantity;
            
            await db.cart.decrement( {total:price, total_quantity:cart_details.quantity}, {where : {id:cart_details.cart_id} } )
          }
        }
      }
    );

  
    return cart_details;
  };
  