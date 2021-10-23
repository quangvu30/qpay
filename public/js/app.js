const _$ = document.querySelector.bind(document);

window.addEventListener("load", async () => {
  if (!isMetamaskInstalled()) {
    return;
  }
  // set provider
  window.web3 = new Web3(ethereum);
});

$("#connect-to-metamask").click(async function () {
  //Will Start the metamask extension
  ethereum.request({
    method: "eth_requestAccounts",
  });

  const account = await getAccount();
  const newAccount = handleLengthAccount(account);
  _$("#network").innerHTML = window.ethereum.networkVersion;
  _$("#address").innerHTML = newAccount;
});

$("#sendUSDTButton").click(function () {
  $.getJSON("./contracts/USDT.json", function (data) {
    sendToken(data);
  });
});

$("#sendBUSDButton").click(function () {
  $.getJSON("./contracts/BUSD.json", function (data) {
    sendToken(data);
  });
});

// Button test send token
$("#sendUSDTtestButton").click(function () {
  $.getJSON("./contracts/USDTtest.json", function (data) {
    sendToken(data);
  });
});

$("#sendBUSDtestButton").click(function () {
  $.getJSON("./contracts/BUSDtest.json", function (data) {
    sendToken(data);
  });
});

function isMetamaskInstalled() {
  if (typeof window.ethereum !== "undefined") {
    console.log("MetaMask is installed!");
    return true;
  } else {
    window.alert("You need install metamask to use this function");
    return false;
  }
}

async function getAccount() {
  accounts = await ethereum.request({
    method: "eth_requestAccounts",
  });
  return accounts[0];
}

function sendToken(chainId, contractABI, contractAddress, receiverAddress) {
  if (+window.ethereum.networkVersion !== chainId) {
    alert("You must change network to chainId " + chainId);
    return;
  }

  let currentUser = ethereum.selectedAddress;
  let amount = Web3.utils.toHex(
    Web3.utils.toWei(_$("#totalValue").innerText, "ether")
  );

  let contractInstance = new web3.eth.Contract(contractABI, contractAddress);

  contractInstance.methods
    .transfer(receiverAddress, amount)
    .send({
      from: currentUser,
    })
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.log({ error });
    });
}

function handleLengthAccount(account) {
  const firstAcc = account.slice(0, 4);
  const lastAcc = account.slice(account.length - 3, account.length);
  const newAccount = firstAcc + "..." + lastAcc;
  return newAccount;
}
