// Creating our User model
module.exports = function(sequelize, DataTypes) {
  const User = sequelize.define("User", {
    
    
   
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
      userId: {
        type: DataTypes.INT,
        allowNull: false,
        unique: true,
        validate: {
         
        }
      },
  });
return Recipe;
};
