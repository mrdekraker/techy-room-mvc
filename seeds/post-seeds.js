const { Post } = require('../models');

const postData = [
  {
    title: 'In the Techy Techy Techy Techy Techy Room',
    content: "I don't know what to post here, but here goes...",
    user_id: 3,
  },
  {
    title: 'Is this thing on?',
    content:
      "Lots of people struggle with this question: is this thing on? Thankfully, I have the answer. All you have to do is check if you see a green light on. If you do, then you know that the thing is on. If you don't see a green light, then you know that the thing is off. It's that simple.",
    user_id: 2,
  },
  {
    title: 'Never Gonna Give You Up',
    content:
      'I would never give you up, never let you down, never run around and desert you. Never make you cry, never say goodbye, never tell a lie and hurt you.',
    user_id: 1,
  },
  {
    title: 'JavaScript is the best programming language',
    content:
      'JavaScript is a programming language that is used to make web pages interactive. It is the most popular programming language in the world. It is the programming language of the web. It is easy to learn. It is used by millions of developers around the world. It is free to use. It is open source. It is the best programming language.',
    user_id: 4,
  },
  {
    title: 'I am a title',
    content: 'I am some content.',
    user_id: 5,
  },
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;
