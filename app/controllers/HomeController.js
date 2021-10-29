// const { getTicket } = require("../../util/handleAPI");

class HomeController {
  //[GET] home
  async index(req, res) {
    const { idTicket } = req.params;
    // const response = await getTicket(idTicket);

    // if (response.status === "error") {
    //   return res.status(500).json("error");
    // }

    // console.log(response);
    // return;

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
