const { where } = require("sequelize");
const db = require("../models");

module.exports = (sequelize, Sequelize, DataTypes) => {
    const order_detail = sequelize.define(
      "order_detail", // Model name
      {
        // Attributes
        quantity: {
          type: Sequelize.INTEGER,
        }
      },
      {
        // Triggers
        hooks : {
          afterCreate: async (order_detail, options) => {
            const price = await db.book.findOne({
              attributes: ['price'],
              where: {
                id: order_detail.book_id
              }
            }) * order_detail.quantity;
            
            await db.order.increment( {total:price, total_quantity:order_detail.quantity}, {where : {id:order_detail.order_id} } )
          },

          beforeDestroy: async (order_detail, options) => {
            const price = await db.book.findOne({
              attributes: ['price'],
              where: {
                id: order_detail.book_id
              }
            }) * order_detail.quantity;
            
            await db.order.decrement( {total:price, total_quantity:order_detail.quantity}, {where : {id:order_detail.order_id} } )
          }
        }
      }
      
    );

  
    return order_detail;
  };
  