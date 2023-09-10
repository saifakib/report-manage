const router = require("express").Router();
const { controllers: authController } = require("../api/v1/auth");
const { controllers: reportController } = require("../api/v1/report");
const authenticate = require("../middleware/authenticate");
const authorize = require("../middleware/authorize")

// Auth Routes
router.post("/api/v1/auth/register", authController.register); 
router.post("/api/v1/auth/login", authController.login); 

// Refresh Token
router.post("/api/v1/auth/refreshToken", authController.refreshToken);

// Report Routes
router
  .route("/api/v1/reports")
  .get(authenticate, reportController.findAll)
  .post(authenticate, authorize, reportController.create);

router
  .route("/api/v1/reports/:id")
  .put(authenticate, authorize, reportController.update)
  .delete(authenticate, authorize, reportController.remove);

module.exports = router;
