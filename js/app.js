const totalPercentage = (given, total) => {
  return parseFloat(((given / total) * 100).toFixed(4));
};

const requiredPercentage = (given, total) => {
  return parseFloat(((given / 100) * total).toFixed(4));
};

const form = document.querySelector(".form");
let revenueSpan = document.getElementById("revenue");
let taxesFeeSpan = document.getElementById("taxes");
let paymentFeeSpan = document.getElementById("paymentFee");
let transactionFeeSpan = document.getElementById("transactionFee");
let totalFeeSpan = document.getElementById("totalFee");
let totalCostSpan = document.getElementById("totalCost");
let profitSpan = document.getElementById("profit");
let marginSpan = document.getElementById("margin");

const calculate = () => {
  let inputs = document.querySelectorAll(".input");

  let itemPrice = 0;
  let shippingCharge = 0;
  let shippingCost = 0;
  let itemCost = 0;
  let tax = 0;
  let method = 0;
  let revenue = 0;

  itemPrice = inputs[0].valueAsNumber;
  shippingCharge = inputs[1].valueAsNumber;
  shippingCost = inputs[2].valueAsNumber;
  itemCost = inputs[3].valueAsNumber;
  tax = inputs[4].valueAsNumber;
  method = inputs[5].value;

  revenue = itemPrice + shippingCharge;

  revenueSpan.innerText = "$" + revenue;
  taxesFeeSpan.innerText = "$" + tax * revenue;

  if (method == "esty") {
    let paymentFee = requiredPercentage(3, revenue) + 0.25;
    paymentFeeSpan.innerText = "$" + paymentFee;

    let transactionFee = requiredPercentage(6.5, revenue);
    transactionFeeSpan.innerText = "$" + transactionFee;

    let totalFees = parseFloat((paymentFee + transactionFee).toFixed(3));
    totalFeeSpan.innerText = "$" + totalFees;

    let totalCost = parseFloat(
      (shippingCost + itemCost + totalFees).toFixed(3)
    );
    totalCostSpan.innerText = "$" + totalCost;

    let profit = parseFloat((revenue - totalCost).toFixed(3));
    profitSpan.innerText = "$" + profit;

    let margin = totalPercentage(profit, revenue);
    marginSpan.innerText = margin + "%";
  } else if (method == "paypal") {
    let paymentFee = requiredPercentage(2.99, revenue);
    paymentFeeSpan.innerText = "$" + paymentFee;

    let transactionFee = requiredPercentage(6.5, revenue);
    transactionFeeSpan.innerText = "$" + transactionFee;

    let totalFees = parseFloat((paymentFee + transactionFee).toFixed(3));
    totalFeeSpan.innerText = "$" + totalFees;

    let totalCost = parseFloat(
      (shippingCost + itemCost + totalFees).toFixed(3)
    );

    totalCostSpan.innerText = "$" + totalCost;

    let profit = parseFloat((revenue - totalCost).toFixed(3));
    profitSpan.innerText = "$" + profit;

    let margin = totalPercentage(profit, revenue);
    marginSpan.innerText = margin + "%";
  }
};

form.addEventListener("keyup", (event) => {
  if (event.target.matches(".input")) {
    calculate();
  }
});

document.getElementById("method").addEventListener("change", (event) => {
  calculate();
});
