const router = require("express").Router();
const { controllers: authController } = require("../api/v1/auth");
const { controllers: reportController } = require("../api/v1/report");

// Auth Routes
router.post("/api/v1/auth/register", authController.register); 
router.post("/api/v1/auth/login", authController.login); 

// Report Routes
router
  .route("/api/v1/reports")
  .post(reportController.create);

router
  .route("/api/v1/reports/:id")
  .put(reportController.update)

module.exports = router;
