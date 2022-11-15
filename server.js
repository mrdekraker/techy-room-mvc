// Set up server for Techy Room MVC

// Import dependencies
const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const routes = require('./controllers');
const sequelize = require('./config/connection');
const helpers = require('./utils/helpers');

const hbs = exphbs.create({ helpers });
const session = require('express-session');

// dotenv is a zero-dependency module that loads environment variables from a .env file into process.env
require(`dotenv`).config();

// Set up Express.js
const app = express();
const PORT = process.env.PORT || 3001;

// Set up Express.js to handle data parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Set up static folder
app.use(express.static(path.join(__dirname, 'public')));

// Give Express.js path to the routes
app.use(routes);

// Set up Handlebars.js
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Set up sessions
const sess = {
  secret: process.env.SECRET,
  cookie: {
    // Session will expire in 15 minutes
    expires: 15 * 60 * 1000,
  },
  resave: true,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

// Sync sequelize models to the database, then turn on the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
});
