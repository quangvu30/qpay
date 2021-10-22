class HomeController {
  //[GET] home
  index(req, res) {
    const { idTicket } = req.params;
    console.log(idTicket);
    res.render("home");
  }
}

module.exports = new HomeController();
