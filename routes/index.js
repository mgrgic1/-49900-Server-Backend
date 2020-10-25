var express = require("express");
var router = express.Router();

// Subrouters;
const userRouter = require("./userRoutes");
const userGoalsRouter = require("./userGoalsRoutes");

router.use("/users", userRouter);
router.use("/userGoals",userGoalsRouter);



// Error handling middleware;
// Might need to modify later
router.use((req, res, next) => {
  const error = new Error("Not Found, Please Check URL!");
  error.status = 404;
  next(error);
});

module.exports = router;