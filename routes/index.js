var express = require("express");
var router = express.Router();

// Subrouters;
const userRouter = require("./userRoutes");

router.use("/users", userRouter);

// Error handling middleware;
// Might need to modify later
router.use((req, res, next) => {
  const error = new Error("Not Found, Please Check URL!");
  error.status = 404;
  next(error);
});

module.exports = router;