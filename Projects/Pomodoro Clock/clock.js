const breakTimeLabel = document.querySelector(".break-time");
const workTimeLabel = document.querySelector(".work-time");
const clockTime = document.querySelector(".clock-time");
const btns = document.querySelectorAll(".time-option");
const start = document.querySelector(".start");
const session = document.querySelector(".session");

let breakTimeClock = 300;
let workTimeClock = 1500;
let windowTimeID = 0;
let countdownTimeClock = 0;
let pauseTime = 0;
let currentTimer = 0;

function setLabel() {
  if (breakTimeClock > 0) {
    breakTimeLabel.textContent = tranformTime(breakTimeClock);
  }
  if (workTimeClock > 0) {
    workTimeLabel.textContent = tranformTime(workTimeClock);
  }
}
setLabel();
function tranformTime(sec) {
  const mins = Math.floor(sec / 60);
  let s = sec % 60;
  if (s < 10) {
    s = "0" + s;
  }
  return `${mins}:${s}`;
}

function setTimeValue(value) {
  countdownTimeClock = value;
}

function updateTime() {
  countdownTimeClock -= 1;
  clockTime.innerHTML = tranformTime(countdownTimeClock);

  if (countdownTimeClock <= 0 && workTimerRunning) {
    workTimerRunning = false;
    breakTimerRunning = true;
    countdownTimeClock = breakTimeClock;
  } else if (countdownTimeClock <= 0 && !workTimerRunning) {
    workTimerRunning = true;
    breakTimerRunning = false;
    countdownTimeClock = workTimeClock;
  }
  let leftTimePercent =
    (workTimeClock - countdownTimeClock) * 100 / workTimeClock;
  session.innerHTML = `WORK TIME!`;
  if (breakTimerRunning) {
    session.innerHTML = `BREAK TIME!`;
    leftTimePercent =
      (breakTimeClock - countdownTimeClock) * 100 / breakTimeClock;
  }
  bar.style.width = `${leftTimePercent}%`;
}

function resetTimer() {
  clearInterval(windowTimeID);
  windowTimeID = 0;
  pauseTime = 0;
  setTimeValue(workTimeClock);
  // timerRunning = false;
  workTimerRunning = false;
  timerInit();
  bar.style.width = `0%`;
}

// bool value
// let timerRunning = false;
let workTimerRunning = false;
let breakTimerRunning = false;
let isPause = false;

function timerInit() {
  currentTimerClock = workTimeClock;
  setTimeValue(workTimeClock);
  clockTime.innerHTML = tranformTime(currentTimerClock);
}
timerInit();
function startTimer() {
  if (!workTimerRunning) {
    windowTimeID = window.setInterval(updateTime, 1000);
    // timerRunning = true;
    workTimerRunning = true;
  } else {
    if (windowTimeID !== 0) {
      clearInterval(windowTimeID);
      windowTimeID = 0;
      pauseTime = countdownTimeClock;
      isPause = true;
    } else if (pauseTime !== 0) {
      countdownTimeClock = pauseTime;
      windowTimeID = window.setInterval(updateTime, 1000);
      isPause = false;
    }
  }
}

const brTimeAdd = document.getElementById("br-time-add");
const brTimeMinus = document.getElementById("br-time-minus");
const wkTimeAdd = document.getElementById("wk-time-add");
const wkTimeMinus = document.getElementById("wk-time-minus");

function breakTimeUpdate(value) {
  const id = value.target.id;
  if (id === "br-time-add") {
    breakTimeClock += 60;
    setLabel();
  } else if (id === "br-time-minus") {
    if (breakTimeClock >= 60) {
      breakTimeClock -= 60;
    }
    setLabel();
  }
}
function workTimeUpdate(value) {
  const id = value.target.id;
  if (workTimerRunning) {
    return;
  }
  if (isPause) {
  }
  if (id === "wk-time-add") {
    workTimeClock += 60;
    setLabel();
  } else if (id === "wk-time-minus") {
    if (workTimeClock >= 60) {
      workTimeClock -= 60;
    }
    setLabel();
  }
  timerInit();
}

brTimeAdd.addEventListener("click", breakTimeUpdate);
brTimeMinus.addEventListener("click", breakTimeUpdate);
wkTimeAdd.addEventListener("click", workTimeUpdate);
wkTimeMinus.addEventListener("click", workTimeUpdate);

let bar = document.querySelector(".bar");
