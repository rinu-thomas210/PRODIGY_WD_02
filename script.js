let timerInterval;
let startTime;
let running = false;

const display = document.getElementById('display');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapTimesList = document.getElementById('lap-times');

function startTimer() {
  startTime = Date.now() - (display.dataset.elapsed || 0);
  timerInterval = setInterval(updateDisplay, 1000);
  running = true;
}

function pauseTimer() {
  clearInterval(timerInterval);
  running = false;
}

function resetTimer() {
  clearInterval(timerInterval);
  display.textContent = '00:00:00';
  display.dataset.elapsed = 0;
  lapTimesList.innerHTML = '';
  running = false;
}

function updateDisplay() {
  const elapsed = Date.now() - startTime;
  const formattedTime = new Date(elapsed).toISOString().substr(11, 8);
  display.textContent = formattedTime;
  display.dataset.elapsed = elapsed;
}

function recordLap() {
  if (running) {
    const lapTime = display.textContent;
    const lapItem = document.createElement('li');
    lapItem.textContent = lapTime;
    lapTimesList.appendChild(lapItem);
  }
}

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);
lapButton.addEventListener('click', recordLap);
