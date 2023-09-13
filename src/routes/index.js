const router = require("express").Router();
const { controllers: authController } = require("../api/v1/auth");
const { controllers: reportController } = require("../api/v1/report");
const { controllers: commentController } = require("../api/v1/comment");
const { controllers: bookmarkController } = require("../api/v1/bookmark");
const authenticate = require("../middleware/authenticate");
const authorize = require("../middleware/authorize");

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

router
  .route("/api/v1/reports/:id/comments")
  .get(authenticate, commentController.findReportComments)
  .put(authenticate, commentController.create);

router.put("/api/v1/reports/:id/bookmark", authenticate, bookmarkController.create);
router.put("/api/v1/users/bookmarks", authenticate, bookmarkController.userBookmarkReports);

module.exports = router;
