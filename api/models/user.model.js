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
          type: DataTypes.STRING
        },
        full_name: {
          type: DataTypes.STRING
        },
        address: {
          type: DataTypes.STRING
        },
        isAmin: {
          type: DataTypes.BOOLEAN,
          defaultValue: false
        },
      }
    );
  
    return User;
  };
  