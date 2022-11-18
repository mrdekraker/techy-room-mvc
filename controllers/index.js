// Index file to control API routes
const router = require(`express`).Router();
const apiRoutes = require(`./api`);
const homeRoutes = require(`./home-routes.js`);
const dashboardRoutes = require(`./dashboard-routes.js`);

// Add API routes
router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/dashboard', dashboardRoutes);

// Define catch-all for resources that don't exist
router.use((req, res) => {
  res.status(404).end();
});

// Export router
module.exports = router;
