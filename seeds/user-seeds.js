const { User } = require(`../models`);

const userData = [
  {
    username: `uniquename_1`,
    password: `password1`,
  },
  {
    username: `uniquename_2`,
    password: `password2`,
  },
  {
    username: `uniquename_3`,
    password: `password3`,
  },
  {
    username: `uniquename_4`,
    password: `password4`,
  },
  {
    username: `uniquename_5`,
    password: `password5`,
  },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
