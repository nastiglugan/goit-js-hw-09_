const startColor = document.querySelector('[data-start]');
const stopColor = document.querySelector('[data-stop]');
const body = document.querySelector('body');
let timeId = null;

startColor.addEventListener('click', startChangeColor);
stopColor.addEventListener('click', stopChangeColor);

function startChangeColor(evt) {
  timeId = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  startColor.disabled = true;
}

function stopChangeColor(evt) {
  clearInterval(timeId);
  startColor.disabled = false;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
