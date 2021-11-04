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

async function validTransaction(transactionData) {
  let config = {
    method: "post",
    url: "https://yowa.tech/api/ticket/validTicket",
    data: {
      ticket_id: "",
      blockNumber: "9553574",
      transactionHash:
        "0xaf0f0ed596c7848e429f67bcc145e95221f40d165327657ccfa02acd10f4974b",
      to: "0x09453c14D12603B4dD237991e8FDf52251EA0529",
      value: "10",
      chainId: 4,
      typeToken: "busd",
    },
  };

  try {
    let result = await axios(config);
    return result.data;
  } catch (err) {
    return err;
  }
}
module.exports = { getTicket };
