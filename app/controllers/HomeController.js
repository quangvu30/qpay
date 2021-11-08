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
      if (ticketInfo.data.wallet[chainId].active) {
        wallet[`C${chainId}`] = ticketInfo.data.wallet[chainId].address;
      } else {
        wallet[`C${chainId}`] = "";
      }
    });
    res.render("home", {
      nameProvider: ticketInfo.data.businessName,
      totalValue: ticketInfo.data.value,
      wallet: wallet,
      timeExpired: ticketInfo.data.timeExpired,
    });
  }

  // [POST]  validate transaction
  async validateTxn(req, res) {
    const { idTicket } = req.params;
    console.log(req.body);
    const dataValid = await axios.validTransaction(idTicket, req.body);
    res.json(dataValid);
  }
}

module.exports = new HomeController();
