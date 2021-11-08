const axios = require("axios");

async function getTicket(ticket_id) {
  let config = {
    method: "get",
    url: "https://yowa.tech/api/ticket/getTicket",
    data: {
      ticket_id,
    },
  };

  try {
    let result = await axios(config);
    return result.data;
  } catch (err) {
    return err;
  }
}

async function validTransaction(id, transactionData) {
  let config = {
    method: "post",
    url: "https://yowa.tech/api/ticket/validTicket",
    data: {
      ticket_id: id,
      blockNumber: transactionData.blockNumber,
      transactionHash: transactionData.txn,
      to: transactionData.to,
      value: transactionData.value,
      chainId: transactionData.chainId,
      typeToken: transactionData.typeToken,
    },
  };

  try {
    let result = await axios(config);
    return result.data;
  } catch (err) {
    return err;
  }
}
module.exports = { getTicket, validTransaction };
