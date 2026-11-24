const form = document.getElementById("expense-form");
const nameInput = document.getElementById("expense-name");
const amountInput = document.getElementById("expense-amount");
const categoryInput = document.getElementById("expense-category");
const filterInput = document.getElementById("category-filter");
const list = document.getElementById("expense-list");
const totalDisplay = document.getElementById("total");
const message = document.getElementById("message");

let expenses = [];

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = nameInput.value.trim();
  const amount = Number(amountInput.value);

  if (name === "" || amount <= 0 || isNaN(amount)) {
    message.textContent = "Enter a valid name and positive amount.";
    return;
  }

  message.textContent = "";

  expenses.push({
    name: name,
    amount: amount,
    category: categoryInput.value
  });

  nameInput.value = "";
  amountInput.value = "";

  showExpenses();
});

filterInput.addEventListener("change", showExpenses);

function showExpenses() {
  list.innerHTML = "";
  let total = 0;
  const selected = filterInput.value;

  for (let i = 0; i < expenses.length; i++) {
    if (selected === "All" || expenses[i].category === selected) {
      const li = document.createElement("li");
      li.textContent = expenses[i].name + " - ₹" + expenses[i].amount + " - " + expenses[i].category;

      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";

      deleteButton.addEventListener("click", function () {
        expenses.splice(i, 1);
        showExpenses();
      });

      li.appendChild(deleteButton);
      list.appendChild(li);

      total = total + expenses[i].amount;
    }
  }

  totalDisplay.textContent = total;
}

showExpenses();