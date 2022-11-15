// Set up models and export them

// User Model
const User = require('./User');
// Post Model
const Post = require('./Post');
// Comment model
const Comment = require('./Comment');

// Create associations
// User/Post relationship
User.hasMany(Post, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

Post.belongsTo(User, {
  foreignKey: 'user_id',
});

// Comment/User relationship
Comment.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

// Comment/Post relationship
Comment.belongsTo(Post, {
  foreignKey: 'post_id',
  onDelete: 'CASCADE',
});

// User/Comment relationship
User.hasMany(Comment, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

// Post/Comment relationship
Post.hasMany(Comment, {
  foreignKey: 'post_id',
  onDelete: 'CASCADE',
});

// Export Models
module.exports = { User, Post, Comment };
