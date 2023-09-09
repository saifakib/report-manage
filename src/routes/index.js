const router = require("express").Router();
const { controllers: authController } = require("../api/v1/auth");

// Auth Routes
router.post("/api/v1/auth/register", authController.register); 
router.post("/api/v1/auth/login", authController.login); 

module.exports = router;
