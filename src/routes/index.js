const router = require("express").Router();
const { controllers: authController } = require("../api/v1/auth");
const { controllers: reportController } = require("../api/v1/report");
const authenticate = require("../middleware/authenticate");

// Auth Routes
router.post("/api/v1/auth/register", authController.register); 
router.post("/api/v1/auth/login", authController.login); 

// Report Routes
router
  .route("/api/v1/reports")
  .post(authenticate, reportController.create);

router
  .route("/api/v1/reports/:id")
  .put(authenticate, reportController.update)
  .delete(authenticate, reportController.remove);

module.exports = router;
