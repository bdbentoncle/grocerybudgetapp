const form = document.getElementById("item-form");
const itemsList = document.getElementById("item-list");
const totalPrice = document.getElementById("total-price");
const clearButton = document.getElementById("clear-btn");

let items = [];

form.addEventListener("submit", addItem);

clearButton.addEventListener("click", clearList);

function addItem(event) {
  event.preventDefault();

  const itemInput = document.getElementById("item-input");
  const priceInput = document.getElementById("price-input");

  const item = {
    name: itemInput.value,
    price: parseFloat(priceInput.value),
  };

  items.push(item);

  itemInput.value = "";
  priceInput.value = "";

  const row = document.createElement("tr");
  const nameCell = document.createElement("td");
  nameCell.textContent = item.name;
  const priceCell = document.createElement("td");
  priceCell.textContent = item.price.toFixed(2);
  const deleteCell = document.createElement("td");

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.classList.add("delete-btn");
  deleteButton.addEventListener("click", () => {
    deleteRow(row);
  });
  deleteCell.appendChild(deleteButton);

  row.appendChild(nameCell);
  row.appendChild(priceCell);
  row.appendChild(deleteCell);
  itemsList.append(row);

  const total = items.reduce((sum, item) => sum + item.price, 0);
  totalPrice.textContent = "$" + total.toFixed(2);
}
function deleteRow(row) {
  const index = Array.from(itemsList.children).indexOf(row);

  items.splice(index, 1);
  row.remove();

  const total = items.reduce((sum, item) => sum + item.price, 0);
  totalPrice.textContent = "$" + total.toFixed(2);
}
function clearList() {
  items = [];
  while (itemsList.firstChild) {
    itemsList.removeChild(itemsList.firstChild);
  }
  totalPrice.textContent = "$0.00";
}
