var express = require("express");
var router = express.Router();

// Subrouters;
const userRouter = require("./userRoutes");
const userGoalsRouter = require("./userGoalsRoutes");
const userExpensesRouter = require("./userExpensesRoutes");
const userIncomeRouter =  require("./userIncomeRoutes");

router.use("/users", userRouter);
router.use("/userGoals",userGoalsRouter);
router.use("/userExpenses",userExpensesRouter);
router.use("/userIncome",userIncomeRouter);


router.use((req, res, next) => {
  const error = new Error("Not Found, Please Check URL!");
  error.status = 404;
  next(error);
});

module.exports = router;
