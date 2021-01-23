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
    Recipes.belongsTo(models.Users, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Recipes;
};
