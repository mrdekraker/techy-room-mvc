// Post model

// Dependencies
// Sequelize model, data types, and db connection
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// Create Post model
class Post extends Model {}

// Set up fields and rules for Post model
Post.init(
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
    // Set up title column
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Set up post_url column
    post_url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isURL: true,
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
    modelName: 'post',
  }
);
