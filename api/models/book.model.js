module.exports = (sequelize, Sequelize, DataTypes) => {
    const Book = sequelize.define(
      "book", // Model name
      {
        // Model attributes
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true
        },
        title: {
          type: DataTypes.STRING
        },
        author: {
          type: DataTypes.STRING
        },
        price:{
            type: DataTypes.INTEGER
        },
        description:{
            type: DataTypes.STRING
        },
        image:{
            type: DataTypes.STRING
        },
        publication_date:{
            type: DataTypes.DATE
        },
        isDelete:{
          type: DataTypes.INTEGER,
          defaultValue: 0
        }
      }
    );

    return Book;
  };
