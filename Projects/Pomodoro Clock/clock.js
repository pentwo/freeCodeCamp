const breakTime = document.querySelector('.break-time');
const workTime = document.querySelector('.work-time');
const clockTime = document.querySelector('.clock-time');
const btns = document.querySelectorAll('.time-option');
const start = document.querySelector('.start');

// let time = workTime.innerHTML * 60;
// clockTime.innerHTML = tranformTime(time);

const timeObj = {
  breakTimer: 5,
  workTimer: 25,
  setTime: function(time) {
    clockTime.textContent = tranformTime(time * 60);
  },
  updateTime: function() {
    workTimer++;
  },
};
function setTime(obj) {
  breakTime.textContent = obj.breakTimer;
  workTime.textContent = obj.workTimer;
}
setTime(timeObj);

function changeTimeSetting() {
  let time = Number(this.parentElement.querySelector('span').innerHTML);
  if (this.textContent === '+') {
    this.parentElement.querySelector('span').textContent++;
  } else if (this.textContent === '-') {
    this.parentElement.querySelector('span').textContent--;
  }
  console.log('time: ', time);
}
function tranformTime(sec) {
  const mins = Math.round(sec / 60);
  return `${mins}:${sec % 60}`;
}
function updateTime() {
  clockTime.innerHTML = tranformTime(time--);
}

btns.forEach((btn) => btn.addEventListener('click', changeTimeSetting));
