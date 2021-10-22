const _$ = document.querySelector.bind(document);

window.addEventListener("load", async () => {
  if (!isMetamaskInstalled()) {
    return;
  }
  // set provider
  window.web3 = new Web3(ethereum);
});

$("#connect-to-metamask").click(async function () {
  console.log("connect to meta mask");
  //Will Start the metamask extension
  ethereum.request({
    method: "eth_requestAccounts",
  });

  console.log(window.ethereum.networkVersion);
  _$("#network").innerHTML = window.ethereum.networkVersion;
  const account = await getAccount();
  const newAccount = handleLengthAccount(account);
  _$("#address").innerHTML = newAccount;
});

$("#sendUSDTButton").click(async function () {
  $.getJSON("./contracts/BUSDTest.json", function (data) {
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

async function sendToken(contractABI, receiver) {
  if (+window.ethereum.networkVersion !== 97) {
    alert("You must change network to BSC-TEST");
    return;
  }
  var contractAddress = "0xeD24FC36d5Ee211Ea25A80239Fb8C4Cfd80f12Ee";
  var receiver = "0x07EbCac872A867FA5B9f9593BD0564e6c541EEd7";
  var currentUser = ethereum.selectedAddress;
  console.log(currentUser);
  var amount = Web3.utils.toHex(
    Web3.utils.toWei(_$("#totalValue").innerText, "ether")
  );

  var contractInstance = new web3.eth.Contract(contractABI, contractAddress);

  contractInstance.methods
    .transfer(receiver, amount)
    .send({
      from: currentUser,
    })
    .then(console.log);
}

function handleLengthAccount(account) {
  const firstAcc = account.slice(0, 4);
  const lastAcc = account.slice(account.length - 3, account.length);
  const newAccount = firstAcc + "..." + lastAcc;
  return newAccount;
}
