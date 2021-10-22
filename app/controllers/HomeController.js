class HomeController {
  //[GET] home
  index(req, res) {
    const { idTicket } = req.params;
    res.render("home");
  }
}

module.exports = new HomeController();
