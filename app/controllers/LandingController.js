class LandingController {
  index(req, res) {
    res.render("landing", {
      layout: false,
    });
  }
}

module.exports = new LandingController();
