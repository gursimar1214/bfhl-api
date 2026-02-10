const express = require("express");
const router = express.Router();

const {
  handleBFHL,
  healthCheck
} = require("../controllers/bfhl.controller");

// POST API
router.post("/bfhl", handleBFHL);

// Health Check API
router.get("/health", healthCheck);

module.exports = router;
