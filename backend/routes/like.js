const express = require("express");

const { likeProperty } = require("../controllers/likeController");

const requireAuth = require("../middleware/requireAuth")

const router = express.Router();

// login route
router.post('/like/:propertyId',requireAuth,likeProperty);

module.exports = router;
