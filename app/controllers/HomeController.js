class HomeController {
  //[GET] home
  index(req, res) {
    const { idTicket } = req.params;
    res.render("home", {
      nameProvider: "quang",
      totalValue: 20,
      wallet: {
        BUSD: "test",
        USDT: "https://www.youtube.com/",
      },
    });
  }
}

module.exports = new HomeController();
