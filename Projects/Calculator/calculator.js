const numbers = document.querySelectorAll('.numbers');
const point = document.querySelector('.point');
const text = document.querySelector('#digi');
const cal = document.querySelector('#cal');
const pro = document.querySelector('.process');
const symbols = document.querySelectorAll('.symbols');
const clear = document.querySelector('.clear');
const backspace = document.querySelector('.backspace');

const calNumbers = [];
const tempNumbers = [];
let calBool = false;

function updateCal() {
  cal.innerHTML = calNumbers.concat(tempNumbers).join('');
}
function updateText(num) {
  if (text.innerHTML === 0 || text.innerHTML === '0') {
    text.innerHTML = num;
  } else {
    text.innerHTML += num;
  }
  // cal.innerHTML += num;
  // updateCal();
}
function clearCal() {
  calNumbers.length = 0;
  tempNumbers.length = 0;
  cal.innerHTML = 0;
}
function clearText() {
  text.innerHTML = 0;
}

function op(pre, cur, sym) {
  switch (sym) {
    case '+':
      return BigNumber(pre).plus(cur);
    // return pre + cur;
    case '-':
      return BigNumber(pre).minus(cur);
    // return pre - cur;
    case '*':
      return BigNumber(pre).times(cur);
    // return pre * cur;
    case '/':
      return BigNumber(pre).div(cur);
    // return pre / cur;
    default:
      break;
  }
}

function combine(arr) {
  return Number(arr.join(''));
}

// Button Actions
numbers.forEach((item) => {
  item.addEventListener('click', () => {
    clearText();
    if (calBool) {
      clearCal();
      updateCal();
      calBool = false;
    }

    tempNumbers.push(Number(item.id));

    updateCal();

    updateText(item.id);
  });
});
symbols.forEach((item) => {
  item.addEventListener('click', () => {
    if (calBool) {
      tempNumbers.push(calNumbers.pop());
      calNumbers.length = 0;
      calBool = false;
    }
    if (tempNumbers.length !== 0) {
      calNumbers.push(combine(tempNumbers));
      tempNumbers.length = 0;
    }
    if (isNaN(calNumbers[calNumbers.length - 1])) {
      calNumbers.pop();
    }
    calNumbers.push(item.id);

    clearText();
    updateText(item.id);
    updateCal();
  });
});
pro.addEventListener('click', () => {
  if (calNumbers.length < 2) {
    return;
  }
  calNumbers.push(combine(tempNumbers));
  tempNumbers.length = 0;
  calNumbers.push('=');

  clearText();
  const result = calculate(calNumbers);
  updateText(result);
  calNumbers.push(result);
  calBool = true;

  updateCal();
});
clear.addEventListener('click', () => {
  clearText();
  clearCal();
});
backspace.addEventListener('click', () => {
  if (tempNumbers.length > 0) {
    tempNumbers.pop();
    if (tempNumbers.length === 0) {
      tempNumbers.push(0);
    }
  } else if (calNumbers.length !== 0) {
    calNumbers.pop();
  } else {
    return;
  }
  updateText('');
  updateCal();
});
point.addEventListener('click', () => {
  if (tempNumbers.includes('.') || tempNumbers.length === 0) {
    return;
  }
  tempNumbers.push('.');
  clearText();
  updateText(point.id);
  updateCal();
});

// Calculate
function calculate(arr) {
  let result = 0;
  let operator = '';
  console.log(arr);
  for (const item of arr) {
    if (isNaN(item)) {
      operator = item;
    } else {
      result =
        op(result, item, operator) !== undefined
          ? op(result, item, operator)
          : item;
    }
  }
  console.log(result);

  return result;
}
