const Users = require("./user");

// Creating our User model
module.exports = function(sequelize, DataTypes) {
  const Recipes = sequelize.define("Recipe", {
    
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
      recipeId: {
        type: DataTypes.INT,
        allowNull: false,
        unique: true,
        
    references: {
        // This is a reference to another model
        model: user,
  
        // This is the column name of the referenced model
        key: 'id',
  
        // With PostgreSQL, it is optionally possible to declare when to check the foreign key constraint, passing the Deferrable type.
        deferrable: Deferrable.INITIALLY_IMMEDIATE
        // Options:
        // - `Deferrable.INITIALLY_IMMEDIATE` - Immediately check the foreign key constraints
        // - `Deferrable.INITIALLY_DEFERRED` - Defer all foreign key constraint check to the end of a transaction
        // - `Deferrable.NOT` - Don't defer the checks at all (default) - This won't allow you to dynamically change the rule in a transaction
      }
    },
        validate: {
         
        }
      
      
  });
return Recipe;
};
