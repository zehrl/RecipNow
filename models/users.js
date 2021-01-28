// Requiring bcrypt for password hashing. Using the bcryptjs version as the regular bcrypt module sometimes causes errors on Windows machines
const bcrypt = require("bcryptjs");

module.exports = function (sequelize, DataTypes) {
  const Users = sequelize.define("Users", {

    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {

      }
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false
    },

    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
      validate: {

      }
    },

    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
      validate: {

      }
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },

  });

  Users.associate = function (models) {
    Users.hasMany(models.Recipes, {
      onDelete: "cascade"
    });
  };

  // Creating a custom method for our Users model. This will check if an unhashed password entered by the users can be compared to the hashed password stored in our database
  Users.prototype.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
  };
  // Hooks are automatic methods that run during various phases of the Users Model lifecycle
  // In this case, before a Users is created, we will automatically hash their password
  Users.addHook("beforeCreate", users => {
    users.password = bcrypt.hashSync(
      users.password,
      bcrypt.genSaltSync(10),
      null
    );
  });
  
  return Users;

};
