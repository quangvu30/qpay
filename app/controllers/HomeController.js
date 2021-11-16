const axios = require("../../utils/axiosHelper");
class HomeController {
  //[GET] gateway
  async index(req, res) {
    const { idTicket } = req.params;
    const ticketInfo = await axios.getTicket(idTicket);
    if (ticketInfo.status === "error") {
      console.error(ticketInfo.error);
      return res.render("error", {
        layout: false,
      });
    }

    let wallet = {};
    Object.keys(ticketInfo.data.wallet).forEach((chainId) => {
      if (ticketInfo.data.wallet[chainId].active) {
        wallet[`C${chainId}`] = ticketInfo.data.wallet[chainId].address;
      } else {
        wallet[`C${chainId}`] = "null";
      }
    });
    res.render("home", {
      nameProvider: ticketInfo.data.businessName,
      totalValue: ticketInfo.data.value,
      wallet: wallet,
      rate: ticketInfo.data.rate,
      timeExpired: ticketInfo.data.timeExpired,
    });
  }

  // [POST]  validate transaction
  async validateTxn(req, res) {
    const { idTicket } = req.params;
    await axios.validTransaction(idTicket, req.body);
  }
}

module.exports = new HomeController();
