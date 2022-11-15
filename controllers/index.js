// Index file to control API routes

// Import Dependencies
// Server connection
const router = require('express').Router();
// Import API routes
const apiRoutes = require('./api');

// Add API routes
router.use('/api', apiRoutes);

// Define catch-all for resources that don't exist
router.use((req, res) => {
  res.status(404).end();
});

// Export router
module.exports = router;
