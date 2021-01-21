const users = require("./users");

module.exports = function (sequelize, DataTypes) {
  const Recipes = sequelize.define("Recipes", {

    recipeName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
      validate: {

      }
    },

    recipeInstruction: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
      validate: {

      }
    },

    // usersId: {
    //   type: DataTypes.INT,
    //   allowNull: false,
    //   unique: true,
    //   references: {
    //     // This is a reference to another model
    //     model: users,

    //     // This is the column name of the referenced model
    //     key: 'id',
    //   },
    //   validate: {

    //   }
    // },

  });

  return Recipes;
};
