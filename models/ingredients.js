const recipes = require("./recipes");

module.exports = function (sequelize, DataTypes) {
  const Ingredients = sequelize.define("Ingredients", {

    ingredientsName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
      validate: {

      }
    },

    ingredientMeasurement: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
      validate: {

      }
    },

    // recipesId: {
    //   type: DataTypes.INT,
    //   allowNull: false,
    //   unique: true,

    //   references: {
    //     // This is a reference to another model
    //     model: recipes,

    //     // This is the column name of the referenced model
    //     key: 'id',
    //   }
    // },
    // validate: {

    // }
  });

  return Ingredients;
};
