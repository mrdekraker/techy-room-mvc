// Comment Model

// Dependencies
// Sequelize model, data types, and db connection
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// Create Comment model
class Comment extends Model {}

// Set up fields and rules for Comment model
Comment.init(
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
    // Set up comment_text column
    comment_text: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        // This means the comment must be at least one character long
        len: [1],
      },
    },
    // Set up user_id column
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
    // Set up post_id column
    post_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'post',
        key: 'id',
      },
    },
  },
  {
    // Pass in imported sequelize connection (the direct connection to our database)
    sequelize,
    // Don't automatically create createdAt/updatedAt timestamp fields
    timestamps: true,
    // Don't pluralize name of database table
    freezeTableName: true,
    // Use underscores instead of camel-casing (i.e. `comment_text` and not `commentText`)
    underscored: true,
    // Make it so our model name stays lowercase in the database
    modelName: 'comment',
  }
);
