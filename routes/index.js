const homeRouter = require("./home");
const landingRouter = require("./landing");
const errorRouter = require("./error");

function route(app) {
  app.use("/gate", homeRouter);
  app.use("/", landingRouter);
  app.use("/error", errorRouter);
}

module.exports = route;
