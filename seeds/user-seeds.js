const { User } = require(`../models`);

const userData = [
  {
    username: `uniquename_1`,
    email: `email1@gmail.com`,
    twitter: `uniquename_1`,
    github: `uniquename_1`,
    password: `password1`,
  },
  {
    username: `uniquename_2`,
    email: `email2@gmail.com`,
    twitter: `uniquename_2`,
    github: `uniquename_2`,
    password: `password2`,
  },
  {
    username: `uniquename_3`,
    email: `email3@gmail.com`,
    twitter: `uniquename_3`,
    github: `uniquename_3`,
    password: `password3`,
  },
  {
    username: `uniquename_4`,
    email: `email4@gmail.com`,
    twitter: `uniquename_4`,
    github: `uniquename_4`,
    password: `password4`,
  },
  {
    username: `uniquename_5`,
    email: `email5@gmail.com`,
    twitter: `uniquename_5`,
    github: `uniquename_5`,
    password: `password5`,
  },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
