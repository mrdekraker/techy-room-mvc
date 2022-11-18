// User Model

// Dependencies
// Sequelize model, data types, and db connection
const { Model, DataTypes } = require('sequelize');
// Import bcrypt
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

// Create User model
class User extends Model {
  // set up method to run on instance data (per user) to check password
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

// Set up fields and rules for User model
User.init(
  {
    // Set up id column
    id: {
      // Use the special Sequelize DataTypes object provide what type of data it is
      type: DataTypes.INTEGER,
      // This is the equivalent of SQL's `NOT NULL` option
      allowNull: false,
      // Instruct that this is the Primary Key
      primaryKey: true,
      // Turn on auto increment
      autoIncrement: true,
    },
    // Set up username column
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Set up email column
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      // There cannot be any duplicate email values in this table
      unique: true,
      // If allowNull is set to false, we can run our data through validators before creating the table data
      validate: {
        isEmail: true,
      },
    },
    // Set up password column
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        // This means the password must be at least four characters long
        len: [4],
      },
    },
  },
  {
    // TABLE CONFIGURATION OPTIONS GO HERE (https://sequelize.org/v5/manual/models-definition.html#configuration))
    hooks: {
      // set up beforeCreate lifecycle "hook" functionality
      async beforeCreate(newUserData) {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
      // set up beforeUpdate lifecycle "hook" functionality
      async beforeUpdate(updatedUserData) {
        updatedUserData.password = await bcrypt.hash(
          updatedUserData.password,
          10
        );
        return updatedUserData;
      },
    },
    // Pass in imported sequelize connection (the direct connection to our database)
    sequelize,
    // Don't automatically create createdAt/updatedAt timestamp fields
    timestamps: false,
    // Don't pluralize name of database table
    freezeTableName: true,
    // Use underscores instead of camel-casing (i.e. `comment_text` and not `commentText`)
    underscored: true,
    // Make it so our model name stays lowercase in the database
    modelName: 'user',
  }
);

module.exports = User;
