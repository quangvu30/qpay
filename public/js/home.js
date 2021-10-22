const btnsConnectMetamask = _$(".btns-connect-metamask");
const btnsConnectedMetamask = _$(".btns-connected-metamask");
const btnConnectMetamask = _$(".btn-connect-metamask");
const btnDeactivate = _$(".btn-deactivate");
const btnSignMessage = _$('.btn-sign-message');
const btnBack = _$('.btn-back');
const dot = _$(".dot");
const network = _$("#network");
const address = _$("#address");
const metamask = _$('.metamask');
const deposit = _$('.deposit');

//handle click btn connect metamask
btnConnectMetamask.onclick = () => {
  btnsConnectMetamask.classList.add("d-none");
  btnsConnectedMetamask.classList.remove("d-none");
  dot.innerHTML = "🟢";
};
//handle click btn deactivate
btnDeactivate.onclick = () => {
  let network = _$("#network");
  let address = _$("#address");
  btnsConnectMetamask.classList.remove("d-none");
  btnsConnectedMetamask.classList.add("d-none");
  dot.innerHTML = "🟠";
  network.innerHTML = '';
  address.innerHTML = '';
};
//handle click btn sign message
btnSignMessage.onclick = () => {
  metamask.classList.add('d-none');
  deposit.classList.remove('d-none');
}
//handle click btn back
btnBack.onclick = () => {
  metamask.classList.remove('d-none');
  deposit.classList.add('d-none');
}