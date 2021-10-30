const axios = require("axios");

async function getTicket(ticket_id) {
  let config = {
    method: "get",
    url: "http://54.255.155.203:3001/ticket/getTicket",
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
module.exports = { getTicket };
