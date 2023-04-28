module.exports = (sequelize, Sequelize, DataTypes) => {
    const Category = sequelize.define(
      "category", // Model name
      {
        // Attributes
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
          type: DataTypes.STRING,
          unique: true
        },
        description: {
          type: DataTypes.STRING,
          defaultValue: ""
        },
        image : {
          type: DataTypes.STRING,
          defaultValue: ""
        },
        isDelete: {
          type: DataTypes.INTEGER,
          defaultValue: 0
        }
      }
    );

    return Category;
  };
