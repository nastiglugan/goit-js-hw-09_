import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import Notiflix from 'notiflix';

const refs = {
  input: document.querySelector('#datetime-picker'),
  dataStartBnt: document.querySelector('[data-start]'),
  timer: document.querySelector('.timer'),
  dataDay: document.querySelector('[data-days]'),
  dataHours: document.querySelector('[data-hours]'),
  dataMinutes: document.querySelector('[data-minutes]'),
  dataSeconds: document.querySelector('[data-seconds]'),
};

// const currentDate = new Date();
// console.log(currentDate.getTime());

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    console.log(selectedDates[0]);
    if (selectedDates[0] - new Date() < 0) {
      Notiflix.Notify.failure('Please choose a date in the future');

      refs.dataStartBnt.disabled = true;
    } else {
      refs.dataStartBnt.disabled = false;

      refs.dataStartBnt.addEventListener('click', dataTimer(selectedDates[0]));

      function dataTimer(evt) {
        let timerId = null;

        timerId = setInterval(() => {
          let diff = evt - new Date();

          if (diff < 0) {
            return clearInterval(timerId);
          }
          let countTime = convertMs(diff);

          refs.dataDay.textContent = addLeadingZero(countTime.days);
          refs.dataHours.textContent = addLeadingZero(countTime.hours);
          refs.dataMinutes.textContent = addLeadingZero(countTime.minutes);
          refs.dataSeconds.textContent = addLeadingZero(countTime.seconds);
        }, 1000);
      }
    }
  },
};

flatpickr(refs.input, options);

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
