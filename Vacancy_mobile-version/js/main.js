document.addEventListener('DOMContentLoaded', () => {
  // активация бургера
  const body = document.body;
  const burger = document?.querySelector('[data-burger]');
  const nav = document?.querySelector('[data-nav]');
  const navItems = nav?.querySelectorAll('a');

  burger.addEventListener('click', () => {
    body.classList.toggle('stop-scroll');
    burger?.classList.toggle('burger--active');
    nav?.classList.toggle('nav-visible')
  })
  navItems.forEach(el => {
    el.addEventListener('click', () => {
      body.classList.remove('stop-scroll');
    burger?.classList.remove('burger--active');
    nav?.classList.remove('nav-visible')
    })
  })


  // Для секции vacancy
  const vacancyBtns = document.querySelectorAll('.vacancy .custom__btn');
  const vacancyDescriptions = document.querySelectorAll('.vacancy__body');
  function showVacancyContent(button) {
    let currentBtn = button.currentTarget;
    let description = currentBtn.closest('.vacancy__card').querySelector('.vacancy__body');
    vacancyBtns.forEach(el => {
      if (el !== currentBtn) {
        el.classList.remove('active');
      }
    });
    vacancyDescriptions.forEach(el => {
      if (el !== description) {
        el.classList.remove('vacancy__body--active');
      }
    });
    description.classList.toggle('vacancy__body--active');
    currentBtn.classList.toggle('active');
  }
  vacancyBtns.forEach(el => {
    el.addEventListener('click', (e) => {
      showVacancyContent(e);
    });
  });
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.vacancy__card')) {
      vacancyBtns.forEach(el => {
        el.classList.remove('active');
      });
      vacancyDescriptions.forEach(el => {
        el.classList.remove('vacancy__body--active');
      });
    }
  });

  // Для секции benefits
  const benefitBtns = document.querySelectorAll('.benefits .benefits__btn');
  const benefitDescriptions = document.querySelectorAll('.benefits__body');
  function showBenefitContent(button) {
    let currentBtn = button.currentTarget;
    let benefitsDescr = currentBtn.closest('.benefits__card').querySelector('.benefits__body');
    benefitBtns.forEach(el => {
      if (el !== currentBtn) {
        el.classList.remove('active');
      }
    });
    benefitDescriptions.forEach(el => {
      if (el !== benefitsDescr) {
        el.classList.remove('benefits__body--active');
      }
    });
    currentBtn.classList.toggle('active');
    benefitsDescr.classList.toggle('benefits__body--active');
  }
  benefitBtns.forEach(el => {
    el.addEventListener('click', (e) => {
      showBenefitContent(e);
    });
  });
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.benefits__card')) {
      benefitBtns.forEach(el => {
        el.classList.remove('active');
      });
      benefitDescriptions.forEach(el => {
        el.classList.remove('benefits__body--active');
      });
    }
  });


  // Показываем я.карту
  function init() {
    let center = [59.90747806421724,30.324797499999896];
    let map = new ymaps.Map('map', {
      center: center,
      zoom: 18
    });
    map.controls.remove('geolocationControl');
    map.controls.remove('searchControl');
    map.controls.remove('trafficControl');
    map.controls.remove('typeSelector');
    map.controls.remove('fullscreenControl');
    map.controls.remove('zoomControl');
    map.controls.remove('rulerControl');
    map.behaviors.disable(['scrollZoom']);
  }
  ymaps.ready(init);
});
