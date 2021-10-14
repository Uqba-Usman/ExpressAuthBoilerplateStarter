const generalRoutes = require("./urgoferRoutes/generalRoutes");

module.exports = function (app) {
  app.use("/api/urgofer/", generalRoutes);
};
