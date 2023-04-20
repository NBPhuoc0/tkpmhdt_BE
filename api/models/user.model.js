module.exports = (sequelize, Sequelize, DataTypes) => {
    const User = sequelize.define(
      "user", // Model name
      {
        // Attributes
        id: {
          type: DataTypes.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true
        },
        username: {
          type: DataTypes.STRING,
          unique: true
        },
        email: {
          type: DataTypes.STRING,
          unique: true
        },
        password: {
          type: DataTypes.STRING
        },
        phone_number: {
          type: DataTypes.STRING,
          defaultValue: '0'
        },
        full_name: {
          type: DataTypes.STRING,
          defaultValue: 'tên'
        },
        address: {
          type: DataTypes.STRING,
          defaultValue: 'địa chỉ'
        },
        isAmin: {
          type: DataTypes.BOOLEAN,
          defaultValue: false
        },
      },
      {
        // Triggers
        hooks : {
          afterCreate: async (user, options) => {
            console.log('User created: ' + user.id);
            await sequelize.models.cart.create({ user_id: user.id }).then(cart => {
              console.log('Cart created: ' + cart.id);
            });
          },
        }
      }
    );
  
    return User;
  };
  