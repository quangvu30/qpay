const homeRouter = require("./home");
const landingRouter = require("./landing");

function route(app) {
  app.use("/gate", homeRouter);
  app.use("/", landingRouter);
}

module.exports = route;
