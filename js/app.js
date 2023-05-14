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
function validateDropdown(inputElement, summaryElement) {
  const hasValue = !!inputElement.dataset.value;
  const hasPrice = !!inputElement.dataset.price;

  if (hasValue && hasPrice) {
    inputElement.classList.remove("invalid");
    updateDropdownSummary(inputElement, summaryElement);
    summaryElement.classList.add("open");
  } else {
    inputElement.classList.add("invalid");
    summaryElement.classList.remove("open");
  }
}

function updateDropdownSummary(inputElement, summaryElement) {
  const selectedPackage = inputElement.dataset.value;
  const price = inputElement.dataset.price;

  summaryElement.children[1].innerHTML = selectedPackage;
  summaryElement.children[2].innerHTML = `$ ${price}`;
}

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
const packageSummary = document.querySelector(`li[data-id="package"]`);
const packageInput = document.querySelector(".select__input");
const packageOptions = document.querySelector(".select__dropdown");

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

packageInput.addEventListener("click", () => {
  packageDropdown.classList.add("open");
});

packageOptions.addEventListener("click", function (event) {
  const selectedOption = event.target;
  const selectedValue = selectedOption.dataset.value;
  const selectedPrice = selectedOption.dataset.price;

  if (selectedValue) {
    packageInput.innerHTML = selectedOption.innerHTML;
    packageDropdown.dataset.value = selectedValue;
    packageDropdown.dataset.price = selectedPrice;
    packageDropdown.classList.remove("open");

    validateDropdown(packageDropdown, packageSummary);
    form.dispatchEvent(new Event("change"));
  }
});
