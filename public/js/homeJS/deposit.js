function validateData(transactionData) {
  const { blockNumber, transactionHash, to } = transactionData;
}

function countDownTime() {
  const payment = _$(".payment");
  const minus = _$(".minus");
  const second = _$(".second");
  const time = _$(".time");

  // Set the date = date now + 15 minus
  var countDownDate = new Date(Date.now() + 900000);

  // Update the count down every 1 second
  var x = setInterval(function () {
    // Get date now and time
    var now = new Date().getTime();

    // Find the distance between now and the count down date
    var distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Output the result
    minus.innerHTML = minutes + "m";
    second.innerHTML = seconds + "s";

    // If the count down is over, write some text
    if (distance < 0) {
      clearInterval(x);
      payment.innerHTML = "EXPIRED!";
    }
  }, 1000);
}
countDownTime();
