const { Comment } = require('../models');

const commentData = [
  {
    user_id: 1,
    post_id: 3,
    comment_text: 'Such post. Much wow. Very informative.',
  },
  {
    user_id: 2,
    post_id: 1,
    comment_text: `I'm not sure that I agree with you, but I respect your opinion.`,
  },
  {
    user_id: 3,
    post_id: 2,
    comment_text: 'Very insightful. Thank you for sharing.',
  },
  {
    user_id: 4,
    post_id: 4,
    comment_text: 'I agree with you.',
  },
  {
    user_id: 5,
    post_id: 5,
    comment_text: 'I disagree with you.',
  },
  {
    user_id: 1,
    post_id: 5,
    comment_text: 'I think you are right.',
  },
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;
