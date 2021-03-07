const countTimer = () => {
  let timerHours = document.querySelector('#timer-hours'),
    timerMinutes = document.querySelector('#timer-minutes'),
    timerSeconds = document.querySelector('#timer-seconds'),
    idInterval;

  const date = new Date();
  const minutesValue = date.getMinutes() + 30;
  date.setMinutes(minutesValue);
  let dateStop = date.getTime();



  const addZero = (num) => {
    if (num.length === 1) {
      num = '0' + num;
    }
    return num;
  };

  const getTimeRemaining = () => {
    let dateNow = new Date().getTime(),
      timeRemaining = (dateStop - dateNow) / 1000,
      seconds = (Math.floor(timeRemaining % 60)).toString(),
      minutes = (Math.floor((timeRemaining / 60) % 60)).toString(),
      hours = (Math.floor((timeRemaining / 60) / 60)).toString();
    seconds = addZero(seconds);
    minutes = addZero(minutes);
    hours = addZero(hours);
    return {
      timeRemaining,
      hours,
      minutes,
      seconds
    };
  };

  const updateClock = () => {
    let timer = getTimeRemaining();
    timerHours.textContent = timer.hours;
    timerMinutes.textContent = timer.minutes;
    timerSeconds.textContent = timer.seconds;
    if (timer.timeRemaining <= 0) {
      timerHours.textContent = '00';
      timerMinutes.textContent = '00';
      timerSeconds.textContent = '00';
      clearInterval(idInterval);
    }
  }
  updateClock();
  idInterval = setInterval(updateClock, 1000);

};

countTimer();

const validation = () => {
  const phoneInput = document.querySelector('[type="tel"]');
  
  phoneInput.addEventListener('input', () => {
    phoneInput.value = phoneInput.value.replace(/[^\d]/,'');
  });
}

validation();