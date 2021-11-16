const btnSignMessage = _$(".btn-sign-message");
const btnBack = _$(".btn-back");
const metamask = _$(".metamask");
const deposit = _$(".deposit");
const spinner = $("#loader");

//handle click btn sign message
btnSignMessage.onclick = () => {
  metamask.classList.add("d-none");
  deposit.classList.remove("d-none");
};
//handle click btn back
btnBack.onclick = () => {
  metamask.classList.remove("d-none");
  deposit.classList.add("d-none");
};
