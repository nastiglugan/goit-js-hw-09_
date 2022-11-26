import Notiflix from 'notiflix';

const form = document.querySelector('.form');
form.addEventListener('submit', onSubmit);

function onSubmit(evt) {
  evt.preventDefault();

  let delay = Number(evt.currentTarget.delay.value);
  const step = Number(evt.currentTarget.step.value);
  const amount = Number(evt.currentTarget.amount.value);

  for (let i = 1; i <= amount; i += 1) {
    delay += step;

    createPromise(i, delay).then(onSuccess).catch(onError);

    form.reset();
  }
}
function onSuccess({ position, delay }) {
  Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
}

function onError({ position, delay }) {
  Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
}

function createPromise(position, delay) {
  return new Promise((resorve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resorve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
