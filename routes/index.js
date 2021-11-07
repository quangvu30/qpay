function route(app) {
  app.use("/gate", require("./home"));
  app.use("/", require("./landing"));
  app.use("/error", require("./error"));
  app.use("/document", require("./document"));
}

module.exports = route;
