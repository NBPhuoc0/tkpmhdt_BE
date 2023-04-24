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
          type: DataTypes.STRING
        },
        image : {
          type: DataTypes.STRING
        }
      }
    );
  
    return Category;
  };
  