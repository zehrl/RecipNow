// const users = require("./users");

module.exports = function (sequelize, DataTypes) {
  const Recipes = sequelize.define("Recipes", {

    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
      validate: {

      }
    },

    ingredient: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
      validate: {

      }
    },

    instruction: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
      validate: {

      }
    },

  });

  Recipes.associate = function (models) {
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    Recipes.belongsTo(models.Users, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Recipes;
};
