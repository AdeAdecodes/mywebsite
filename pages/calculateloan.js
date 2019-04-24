"use strict";

function calculate() {
  // Look up the input and output elements in the document
  var amount = document.getElementById("amount");
  var apr = document.getElementById("apr");
  var months = document.getElementById("months");
  var payment = document.getElementById("payment");
  var total = document.getElementById("total");
  var totalinterest = document.getElementById("totalinterest");

  // Get the user's input from the input elements.
  // Assume all input is valid (for now).
  // Convert interest rate from percentage to decimal
  // Convert from annual rate to monthly rate
  // Convert payment period in years to number of monthly payments
  var principal = parseFloat(amount.value.replace(/,/g, ""));
  var rate = parseFloat(apr.value) / 100 / 12;
  var payments = parseFloat(months.value) * 1;

  // Compute the monthly payment
  var x = Math.pow(1 + rate, payments);
  var monthly = (principal * x * rate) / (x - 1);

  // If the result is a finite number, the user's input was good
  // and we have meaningful results to display
  if (isFinite(monthly)) {
    // Fill in the output fields, rounding to 2 decimal places
    payment.innerHTML = formatNumber(monthly, 2);
    total.innerHTML = formatNumber(monthly * payments, 2);
    totalinterest.innerHTML = formatNumber(monthly * payments - principal, 2);
  } else {
    // Result was NaN or Infinite,
    // which means the input was incomplete or invalid.
    // Clear any previously-displayed output.
    payment.innerHTML = "";
    total.innerHTML = "";
    totalinterest.innerHTML = "";
  }
}

function formatNumber(num, decimals) {
  return num.toFixed(decimals).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  // http://blog.tompawlak.org/number-currency-formatting-javascript
}
