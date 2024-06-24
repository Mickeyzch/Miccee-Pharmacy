import { allData, allInputElement, clearAllInput, saveToStorage, getInputData, getNextOrderNumber, removeData } from "../data/data.js";
import { getTodaysDate } from "../data/utils/date.js";
// import { getPrescriptions, addPrescription, removePrescription } from "../data/database.js";

const submitButton = document.querySelector('.data-submit');
const dataTable = document.querySelector('.js-data-table');
const orderInput = document.querySelector('.js-data-items-order');
const dateInput = document.querySelector('.js-data-items-date');
const searchInput = document.querySelector('.js-search-input');

submitButton.addEventListener('click', () => {
  getInputData();
  renderDataTable();
});

function renderDataTable(database = allData) {
  let rowHTML = '';
  let allRowHTML = '';
  let tableHTML = '';
  database.forEach((data) => {
    const order_id = data['order'];

    allInputElement.forEach((inputElement) => {
      const html = `<td>${data[inputElement]}</td>`;

      if (inputElement === 'order') {
        rowHTML += `<td class="remove-cell js-remove-row"><span>${data[inputElement]}</span><span class="remove-link js-remove-link" data-order-id=${order_id}>X</span></td>`;
      }
      else {
        rowHTML += html;
      }
    });
    allRowHTML += `
    <tr>
    ${rowHTML}
    </tr>
    `;
    rowHTML = '';
  });
  tableHTML = `
    <tr>
      <th class="order">OrderID</th>
      <th class="date">Date</th>
      <th class="gender">Gender</th>
      <th class="age">Age</th>
      <th class="prodcut">Product</th>
      <th class="quantity">Quantity</th>
      <th class="price">Price</th>
    </tr>
  ` + allRowHTML;

  dataTable.innerHTML = tableHTML;

  document.querySelectorAll('.js-remove-link').forEach((link) => {
    link.addEventListener('click', () => {
      const order_id = Number(link.dataset.orderId);
      removeData(order_id);

      renderDataTable();
    });
  });
}

renderDataTable();

function getSearchInput() {
  const searchTerm = searchInput.value;
  const lowerSearchTerm = searchTerm.toLowerCase();

  let matchingData = [];
  allData.forEach((data) => {
    const orderId = data.order.toString();
    const lowerProductName = data.product.toLowerCase();

    if (orderId.includes(lowerSearchTerm) || lowerProductName.includes(lowerSearchTerm)) {
      matchingData.push(data);
    }
  });
  return matchingData;
}


searchInput.addEventListener('keyup', () => {
  if (!searchInput.value) {
    renderDataTable();
  }
  else {
    renderDataTable(getSearchInput());
  }
});



orderInput.disabled = true;
orderInput.value = getNextOrderNumber();
dateInput.disabled = true;
dateInput.value = getTodaysDate(); // Set initial order number
setInterval(() => {
  dateInput.value = getTodaysDate();
}, 1000);

const dateTimeString = "2024-04-02T06:55:17.000Z";

// Parse the datetime string into a Date object
const dateObject = new Date(dateTimeString);

// Format the date object with 24-hour format
const formattedDate = dateObject.toLocaleTimeString('en-US', {
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false // This key is crucial for 24-hour format
});

// Combine formatted date and time with a space
const fullFormattedDate = `${dateObject.toLocaleDateString('en-US', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit'
})}` + " " + formattedDate;

console.log(fullFormattedDate); // Output: 2024-04-02 06:55:17
