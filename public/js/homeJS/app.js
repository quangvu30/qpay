const _$ = document.querySelector.bind(document);
const btnsConnectMetamask = _$(".btns-connect-metamask");
const btnsConnectedMetamask = _$(".btns-connected-metamask");
const dot = _$(".dot");
const network = _$("#network");
const address = _$("#address");
var qrcode = new QRCode("qrcode");

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
  if (account) {
    btnsConnectMetamask.classList.add("d-none");
    btnsConnectedMetamask.classList.remove("d-none");
    dot.innerHTML = "🟢";
    const newAccount = handleLengthAccount(account);
    network.innerHTML = window.ethereum.networkVersion;
    address.innerHTML = newAccount;
  }
});

//handle click btn deactivate
$("#deactivate").click(function () {
  btnsConnectMetamask.classList.remove("d-none");
  btnsConnectedMetamask.classList.add("d-none");
  dot.innerHTML = "🟠";
  network.innerHTML = "";
  address.innerHTML = "";
});

$("#sendBUSDButton").click(function () {
  let btn = this;
  if (!makeCode(btn)) {
    return;
  }
  $.getJSON("../contracts/BUSD.json", function (data) {
    sendToken(
      btn,
      56,
      "binance-usd",
      data,
      "0x4Fabb145d64652a948d72533023f6E7A623C7C53"
    );
  });
});

$("#sendBNBButton").click(async function () {
  let btn = this;
  if (!makeCode(btn)) {
    return;
  }
  await sendCoin(btn, 56, "binancecoin");
});

// Button test send token
$("#sendUSDTtestButton").click(function () {
  let btn = this;
  if (!makeCode(btn)) {
    return;
  }
  $.getJSON("../contracts/USDTtest.json", function (data) {
    sendToken(
      btn,
      4,
      "usdttest",
      data,
      "0x8A3abB37Faf98b01e61DC30FBC1c62e0c9Fa70dd"
    );
  });
});

$("#sendETHtestButton").click(async function () {
  let btn = this;
  if (!makeCode(btn)) {
    return;
  }
  await sendCoin(btn, 4, "ethereum");
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

async function sendCoin(btn, chainId, typeToken) {
  if (+window.ethereum.networkVersion !== chainId) {
    alert("You must change network to chainId " + chainId);
    return;
  }
  try {
    let amount = btn.getAttribute("data-rate");
    let data = {
      from: ethereum.selectedAddress,
      to: btn.getAttribute("value"),
      value: Web3.utils.toHex(Web3.utils.toWei(amount, "ether")),
      gas: "0x5208",
    };
    let result = await ethereum.request({
      method: "eth_sendTransaction",
      params: [data],
    });
    await sleep(10000);
    let transactionData = {};
    transactionData.blockNumber = "";
    transactionData.txn = result;
    transactionData.to = btn.getAttribute("value");
    transactionData.value = amount;
    transactionData.chainId = chainId;
    transactionData.typeToken = typeToken;
    postData(window.location.href, transactionData)
      .then(() => {
        payment.innerHTML = "PAYMENT SUCCESS !!!";
      })
      .catch(() => {
        payment.innerHTML =
          "SOMETHING WORONG. PLEASE CONTACT TO YOUR PROVIDER !!!";
      });
  } catch (error) {
    console.error(error);
  }
}

function sendToken(btn, chainId, typeToken, contractABI, contractAddress) {
  if (+window.ethereum.networkVersion !== chainId) {
    alert("You must change network to chainId " + chainId);
    return;
  }
  let currentUser = ethereum.selectedAddress;
  let amount = Web3.utils.toHex(
    Web3.utils.toWei(btn.getAttribute("data-rate"), "ether")
  );

  let contractInstance = new web3.eth.Contract(contractABI, contractAddress);

  contractInstance.methods
    .transfer(btn.getAttribute("value"), amount)
    .send({
      from: currentUser,
    })
    .then((result) => {
      let transactionData = {};
      transactionData.blockNumber = result.blockNumber;
      transactionData.txn = result.transactionHash;
      transactionData.to = result.events.Transfer.returnValues.to;
      transactionData.value = web3.utils.fromWei(
        result.events.Transfer.returnValues.value
      );
      transactionData.chainId = chainId;
      transactionData.typeToken = typeToken;

      const payment = _$(".payment");
      postData(window.location.href, transactionData)
        .then(() => {
          payment.innerHTML = "PAYMENT SUCCESS !!!";
        })
        .catch(() => {
          payment.innerHTML =
            "SOMETHING WORONG. PLEASE CONTACT TO YOUR PROVIDER !!!";
        });
    })
    .catch((error) => {
      console.log({ error });
    });
}

async function postData(url, data) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

function handleLengthAccount(account) {
  const firstAcc = account.slice(0, 4);
  const lastAcc = account.slice(account.length - 3, account.length);
  const newAccount = firstAcc + "..." + lastAcc;
  return newAccount;
}

function makeCode(btn) {
  let addressValue = btn.getAttribute("value");
  let rateValue = btn.getAttribute("data-rate");
  let unit = btn.children[0].innerText;

  if (addressValue === "null") {
    btn.style = "opacity: 0.9; cursor: no-drop;";
    return false;
  }

  _$("#wallet-address").innerText = `Address: ${addressValue}`;
  _$("#rate").innerText = `Amount: ${rateValue} ${unit}`;

  qrcode.makeCode(addressValue);
  return true;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
