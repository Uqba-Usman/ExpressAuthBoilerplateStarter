const express = require("express");
const router = express.Router();

//router.get("/todays/check/:id", challange.checkHabbitState);
router.get("/", (req, res) => {
  console.log("Main Running");
  res.send({ Main: "Running" });
});

module.exports = router;
