const axios = require("../../utils/axiosHelper");
class HomeController {
  //[GET] gateway
  async index(req, res) {
    const { idTicket } = req.params;
    const ticketInfo = await axios.getTicket(idTicket);
    if (ticketInfo.status === "error") {
      return res.json({
        status: "error",
        error: "error",
      });
    }

    let wallet = {};
    Object.keys(ticketInfo.data.wallet).forEach((chainId) => {
      Object.keys(ticketInfo.data.wallet[chainId]).forEach((coin) => {
        if (ticketInfo.data.wallet[chainId][coin].active) {
          wallet[`${coin}_${chainId}`] =
            ticketInfo.data.wallet[chainId][coin].address;
        }
      });
    });
    res.render("home", {
      nameProvider: ticketInfo.data.businessName,
      totalValue: ticketInfo.data.value,
      wallet,
      timeExpired: ticketInfo.data.timeExpired,
    });
  }
}

module.exports = new HomeController();
