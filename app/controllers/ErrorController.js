class ErrorController {
  index(req, res) {
    res.render("error", {
      layout: false,
    });
  }
}

module.exports = new ErrorController();
