// const elSummaryTotal = document.querySelector(".summary__total");
// // elSummaryTotal.classList.add("open");

// const elListItem = document.querySelectorAll(".list__item");
// // elListItem.forEach((item) => {
// //   item.classList.add("open");
// // });

// const elSelectDropdown = document.querySelector(".select__dropdown");
// // elSelectDropdown.classList.add("open");

// const selectInput = document.querySelector(".select__input");

// selectInput.addEventListener("click", () => {
//   elSelectDropdown.classList.add("open");
// });

// const numberInputs = document.querySelectorAll('input[type="number"]');

// numberInputs.forEach((input) => {
//   input.addEventListener("change", function () {
//     const summary = this.id;

//     if (this.value == Math.floor(this.value) && this.value > 0) {
//       this.classList.remove("invalid");
//       this.classList.add("open");
//     } else {
//       this.classList.add("invalid");
//       input.value = "";
//       this.classList.remove("open");
//     }
//   });
// });

// function Calculator(form, summary) {
//   this.form = form;
//   this.summary = summary;
//   this.inputs = form.querySelectorAll("input[type='number']");
//   this.packageDropdown = form.querySelector(".select__dropdown");
// }

// Calculator.prototype.init = function () {
//   const self = this;

//   this.inputs.forEach(function (input) {
//     input.addEventListener("change", function () {
//       self.updateSummary();
//     });
//   });

//   this.packageDropdown.addEventListener("change", function () {
//     self.updateSummary();
//   });

//   this.updateSummary();
// };

// Calculator.prototype.updateSummary = function () {
//   let total = 0;
//   this.inputs.forEach(function (input) {
//     const maybeNumber = parseInt(input.value);
//     const test = isNaN(maybeNumber) ? 0 : maybeNumber;
//     total = total + test;
//   });
//   // debugger;
//   this.summary.innerHTML = "Total: " + total;
// };

// Handle number inputs
function validateNumberInput(inputElement, summaryElement) {
  if (
    inputElement.value == Math.floor(inputElement.value) &&
    inputElement.value > 0
  ) {
    inputElement.classList.remove("invalid");
    updateNumberSummary(inputElement, summaryElement);
    summaryElement.classList.add("open");
  } else {
    inputElement.classList.add("invalid");
    inputElement.value = "";
    summaryElement.classList.remove("open");
  }
}

function updateNumberSummary(inputElement, summaryElement) {
  const quantity = inputElement.value;
  const itemPrice = summaryElement.getAttribute("data-price");
  const sum = quantity * itemPrice;

  summaryElement.children[1].innerText = `${quantity} * $${itemPrice}`;
  summaryElement.children[2].innerText = `$ ${sum}`;
}

// Handle dropdown
// TODO validateDropdown()
// TODO updateDropdownSummary()

// Handle checkboxes
function validateCheckbox(inputElement, summaryElement) {
  if (inputElement.checked) {
    summaryElement.classList.add("open");
    updateCheckboxSummary(summaryElement);
  } else {
    summaryElement.classList.remove("open");
  }
}

function updateCheckboxSummary(summaryElement) {
  const itemPrice = summaryElement.getAttribute("data-price");

  summaryElement.children[1].innerText = `$ ${itemPrice}`;
}

// Refresh total sum on each change
function updateTotal(itemPriceElements, totalPriceElement) {
  let totalPrice = 0;

  for (el of itemPriceElements) {
    const priceText = el.innerText;
    const priceValue = +priceText.slice(2);

    totalPrice += priceValue;
  }

  totalPriceElement.innerText = `$ ${totalPrice}`;
}

const form = document.querySelector(".calc__form");
const productsInput = document.getElementById("products");
const productsSummary = document.querySelector(`li[data-id="products"]`);

const ordersInput = document.getElementById("orders");
const ordersSummary = document.querySelector(`li[data-id="orders"]`);

const packageDropdown = document.getElementById("package");

const accountingCheckbox = document.getElementById("accounting");
const accountingSummary = document.querySelector(`li[data-id="accounting"]`);

const terminalCheckbox = document.getElementById("terminal");
const terminalSummary = document.querySelector(`li[data-id="terminal"]`);

const summaryTotalElement = document.querySelector(".summary__total");
const totalPriceElement = document.querySelector(".total__price");

const itemPrices = document.querySelectorAll(".calc__summary .item__price");

summaryTotalElement.classList.add("open");

form.addEventListener("change", () => {
  updateTotal(itemPrices, totalPriceElement);
});

productsInput.addEventListener("change", () => {
  validateNumberInput(productsInput, productsSummary);
});

ordersInput.addEventListener("change", () => {
  validateNumberInput(ordersInput, ordersSummary);
});

accountingCheckbox.addEventListener("change", () => {
  validateCheckbox(accountingCheckbox, accountingSummary);
});

terminalCheckbox.addEventListener("change", () => {
  validateCheckbox(terminalCheckbox, terminalSummary);
});

// packageDropdown.addEventListener("change", updateSummary);
// accountingCheckbox.addEventListener("checked", updateSummary);
// terminalCheckbox.addEventListener("checked", updateSummary);

// updateSummary();

// const elSummaryTotal = document.querySelector(".summary__total");
// const elListItem = document.querySelectorAll(".list__item");
// const elSelectDropdown = document.querySelector(".select__dropdown");

// const form = document.querySelector(".calc__form");
// const divCalcForm = document.querySelectorAll(".calc__input");
// const productInput = document.getElementById("products");
// const orderInput = document.getElementById("orders");
// const packageDropdown = document.getElementById("package");
// const selectInput = document.querySelector("select__input");
// const selectDropdown = document.querySelector("select__dropdown");

// const lableFormCheckBox = document.querySelectorAll(".checkbox");
// const accountingCheckbox = document.getElementById("accounting");
// const terminalCheckbox = document.getElementById("terminal");

// const divCalcSummary = document.querySelector(".calc__summary");

// const summary = document.querySelector(".summary__total");
// const totalPriceElement = document.querySelector("#total-price");
