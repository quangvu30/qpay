const axios = require("axios");

async function getTicket(ticket_id) {
  try {
    let response = await axios(`http://54.255.155.203:3001/ticket/getTicket`, {
      method: "get",
      url: "http://localhost:3001/ticket/getTicket",
      headers: {},
      data: { ticket_id: ticket_id },
    });
    response = await JSON.stringify(response);
    return response;
  } catch (err) {
    console.log(err);
  }
}
module.exports = { getTicket };
