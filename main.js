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

const slider = () => {
  const slide = document.querySelectorAll('.slide'),
  btn = document.querySelectorAll('.slider-btn'),
  sliderFeedbacks = document.querySelector('.slider');

  let currentSlide = 0,
  interval;

  const prevSlide = (elem, index, strClass) => { 
    elem[index].classList.remove(strClass);
  };

  const nextSlide = (elem, index, strClass)  => { 
    elem[index].classList.add(strClass);
  };

  const autoPlaySlide = () => {
    prevSlide(slide, currentSlide, 'slide--active');
    currentSlide++;
    if (currentSlide>=slide.length) {
      currentSlide = 0;
    }
    nextSlide(slide, currentSlide, 'slide--active');
  };

  const startSlide = (time = 3000) => {
    interval = setInterval(autoPlaySlide, time);
  };

  const stopSlide = () => {
    clearInterval(interval);
  };

  sliderFeedbacks.addEventListener('click', (event) => {
    event.preventDefault();
    let target = event.target;

    if (!target.matches('.slider-btn')) {
      return;
    }
    
    prevSlide(slide, currentSlide, 'slide--active');

    if (target.matches('.slider-btn--next')) {
      currentSlide++;
    }
    else if (target.matches('.slider-btn--prev')) {
      currentSlide--;
    }
    else if (target.matches('.dot')) {
      dot.forEach((elem, index) => {
        if (elem === target) {
          currentSlide = index;
        }
      });
    }

    if (currentSlide >= slide.length) {
      currentSlide = 0;
    }
    if (currentSlide < 0) {
      currentSlide = slide.length - 1;
    }
    nextSlide(slide, currentSlide, 'slide--active');

  });

  startSlide(3000);

  sliderFeedbacks.addEventListener('mouseover', (event) => {
    let target = event.target;

    if (target.matches('.slider-btn')) {
      stopSlide();
    }
  });

  sliderFeedbacks.addEventListener('mouseout', (event) => {
    let target = event.target;

    if (target.matches('.slider-btn')) {
      startSlide(3000);
    }
  });
};

slider();

const scrollingDown = () => {
  const scrollLinks = document.querySelectorAll('a[href*="#"]');
  scrollLinks.forEach((scrollLink) => {
    scrollLink.addEventListener('click', (elem) => {
        elem.preventDefault();
        const blockID = scrollLink.getAttribute('href').substr(1);
        if (document.getElementById(blockID) !== null) {
          document.getElementById(blockID).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
  });
};

scrollingDown();

