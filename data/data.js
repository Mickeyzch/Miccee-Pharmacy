import { getTodaysDate } from "./utils/date.js";
export let allData = JSON.parse(localStorage.getItem('prescription')) || [{
  order: 1,
  date: '2024-04-03 22:35:36',
  gender: 'Male',
  age: 34,
  product: 'Para',
  quantity: 2,
  price: 420
}, {
  order: 2,
  date: '2024-04-04 08:12:54',
  gender: 'Female',
  age: 21,
  product: 'Enol',
  quantity: 5,
  price: 59
}];

export const allInputElement = ['order', 'date', 'gender', 'age', 'product', 'quantity', 'price'];

export function saveToStorage() {
  localStorage.setItem('prescription', JSON.stringify(allData));
}

export function clearAllInput() {
  allInputElement.forEach((inputElement) => {
    document.querySelector(`.js-data-items-${inputElement}`).value = '';
  });
}

export function getInputData() {
  const order = getNextOrderNumber();
  let data = {};
  data.order = order;
  data.date = getTodaysDate();

  for (let i = 0; i < allInputElement.length; i++) {
    const inputElement = document.querySelector(`.js-data-items-${allInputElement[i]}`);
    let value = inputElement.value;
    if (allInputElement[i] === 'order') {
      continue;
    }

    if (!value) {
      alert('Please fill in all the fields and correct format of data before submitting!');
      return;
    }

    const valueIsNan = parseFloat(value);

    if (!isNaN(valueIsNan) && (allInputElement[i] === 'gender' || allInputElement[i] === 'product')) {
      console.log(allInputElement[i]);
      alert('Please fill in all the fields and correct format of data before submitting!');
      return;
    }

    if (isNaN(valueIsNan) && (allInputElement[i] === 'age' || allInputElement[i] === 'quantity' || allInputElement[i] === 'price')) {
      console.log(allInputElement[i]);
      alert('Please fill in all the fields and correct format of data before submitting!');
      return;
    }

    if (!isNaN(valueIsNan) && allInputElement[i] !== 'date') {
      value = valueIsNan;
    }

    data[`${allInputElement[i]}`] = value;
  }

  allData.push(data);

  clearAllInput();
  saveToStorage();

  document.querySelector('.js-data-items-order').value = getNextOrderNumber();
}

export function getNextOrderNumber() {
  return allData.length !== 0 ? allData[allData.length - 1].order + 1 : 1;
}


export function removeData(order_id) {
  const newData = [];
  allData.forEach((data) => {
    if (data.order !== order_id) {
      newData.push(data);
    }
  });

  allData = newData;

  saveToStorage();
}