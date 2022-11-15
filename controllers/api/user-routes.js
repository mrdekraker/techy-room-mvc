// Set up User Routes
const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// GET all users
router.get('/', (req, res) => {
  User.findAll({
    // Query configuration: exclude password
    attributes: { exclude: ['password'] },
  })
    // Return the data as JSON
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => {
      console.log(err);
      // 500 status code: server error
      res.status(500).json(err);
    });
});

// GET a single user /api/users/1
router.get('/:id', (req, res) => {
  User.findOne({
    attributes: { exclude: ['password'] },
    where: {
      id: req.params.id,
    },
    // Include the posts and comments for this user
    include: [
      {
        model: Post,
        attributes: [`id`, `title`, `post_url`, `created_at`],
      },
      {
        model: Comment,
        attributes: [`id`, `comment_text`, `created_at`],
        include: {
          model: Post,
          attributes: [`title`],
        },
      },
    ],
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: `No user found with this id` });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// POST /api/users
router.post(`/`, (req, res) => {
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    twitter: req.body.twitter,
    github: req.body.github,
    linkedin: req.body.linkedin,
  }).then((dbUserData) => {
    req.session.save(() => {
      req.session.user_id = dbUserData.id;
      req.session.username = dbUserData.username;
      req.session.twitter = dbUserData.twitter;
      req.session.github = dbUserData.github;
      req.session.linkedin = dbUserData.linkedin;
      req.session.loggedIn = true;

      res.json(dbUserData);
    });
  });
});

// LOGIN /api/users/login
router.post(`/login`, (req, res) => {
  User.findOne({
    where: {
      email: req.body.email,
    },
  }).then((dbUserData) => {
    if (!dbUserData) {
      res.status(400).json({ message: `No user with that email address!` });
      return;
    }

    // Verify user
    const validPassword = dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: `Incorrect password!` });
      return;
    }

    req.session.save(() => {
      // Declare session variables
      req.session.user_id = dbUserData.id;
      req.session.username = dbUserData.username;
      req.session.twitter = dbUserData.twitter;
      req.session.github = dbUserData.github;
      req.session.linkedin = dbUserData.linkedin;
      req.session.loggedIn = true;

      res.json({ user: dbUserData, message: `You are now logged in!` });
    });
  });
});

// PUT /api/users/1
router.put('/:id', withAuth, (req, res) => {
  // Pass in req.body instead to only update what's passed through
  User.update(req.body, {
    individualHooks: true,
    where: {
      id: req.params.id,
    },
  })
    .then((dbUserData) => {
      if (!dbUserData[0]) {
        res.status(404).json({ message: `No user found with this id` });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// DELETE /api/users/1
router.delete('/:id', withAuth, (req, res) => {
  User.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: `No user found with this id` });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// LOGOUT /api/users/logout
router.post(`/logout`, (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
