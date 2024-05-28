
document.addEventListener("DOMContentLoaded", ()=> {
  function cloneAnimate() {
    const main = document.getElementById('main')
    const tickerSection = document.getElementById('ticker')

    const tickerCopy = tickerSection.cloneNode(true)
    main.appendChild(tickerCopy)
  }

  function membersSlider() {
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const slidesPerPage = 3;
    const totalPages = Math.ceil(slides.length / slidesPerPage);
    let currentPage = 0;

    const currentSlidesShow = document.getElementById('currentPage');

    function showSlides(page) {
      const startIndex = page * slidesPerPage;
      const endIndex = startIndex + slidesPerPage;
      slides.forEach((slide, index) => {
        if (index >= startIndex && index < endIndex) {
          slide.style.display = 'block';
        } else {
          slide.style.display = 'none';
        }
      });

      currentSlidesShow.textContent = `${currentPage + 1}/${Math.ceil(slides.length / slidesPerPage)}`;
    }

    function nextPage() {
      currentPage = (currentPage + 1) % totalPages;
      showSlides(currentPage);
    }

    function prevPage() {
      currentPage = (currentPage - 1 + totalPages) % totalPages;
      showSlides(currentPage);
    }

    prevBtn.addEventListener('click', prevPage);
    nextBtn.addEventListener('click', nextPage);

    showSlides(currentPage);
  }

  function membersMobileSlider() {
    const slides = document.querySelectorAll('.slide');
    const totalPages = slides.length;
    let currentPage = 0;
    const currentSlidesShow = document.getElementById('currentPage');

    function showSlide(page) {
      slides.forEach((slide, index) => {
        if (index === page) {
          slide.style.display = 'block';
        } else {
          slide.style.display = 'none';
        }
      });

      currentSlidesShow.textContent = `${currentPage + 1}/${totalPages}`;
    }

    function nextPage() {
      currentPage = (currentPage + 1) % totalPages;
      showSlide(currentPage);
    }

    function prevPage() {
      currentPage = (currentPage - 1 + totalPages) % totalPages;
      showSlide(currentPage);
    }

    prevBtn.addEventListener('click', prevPage);
    nextBtn.addEventListener('click', nextPage);

    showSlide(currentPage);
  }

  function createHeroTitle() {
    const heroTitle = document.getElementById('heroTitle');

    if (!heroTitle) {
      return;
    }

    heroTitle.innerHTML = '';

    const text1 = 'Чтобы поддержать Международный васюкинский турнир';
    const text2 = 'посетите лекцию на&nbsp;тему:';
    const text3 = '&laquo;Плодотворная дебютная идея&raquo;';

    const part1 = document.createElement('div');
    part1.classList.add('hero__title--part1');
    part1.innerHTML = text1;

    const imagePart = document.createElement('div');
    imagePart.classList.add('hero__title--imagePart')

    const part2 = document.createElement('div');
    part2.classList.add('hero__title--part2');
    part2.innerHTML = text2 + ' <span class="hero__title--red">' + text3 + `</span>`;

    heroTitle.appendChild(part1)
    heroTitle.appendChild(imagePart)
    heroTitle.appendChild(part2)
  }

  function stagesSlider() {
    const stagesSlides = document.querySelectorAll('.stages__slide');
    const stagesContainer = document.getElementById('stagesContainer');
    const totalPages = stagesSlides.length;
    let currentPage = 0;

    const prevBtn = document.createElement('button');
    prevBtn.classList.add('stages__prev-btn', 'reset-btn');
    prevBtn.innerHTML = `
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="18" cy="18" r="18" transform="rotate(-180 18 18)"/>
        <path d="M20.0766 24.923L13.1536 17.9999L20.0766 11.0768" stroke="white" stroke-width="1.63636" stroke-linecap="square" />
      </svg>`;
    const nextBtn = document.createElement('button');
    nextBtn.classList.add('stages__next-btn', 'reset-btn');
    nextBtn.innerHTML = `
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="18" cy="18" r="18" />
        <path d="M15.9234 11.0769L22.8464 18L15.9234 24.9231" stroke="white" stroke-width="1.63636" stroke-linecap="square" />
      </svg>`;
    const stagesCurrentPage = document.createElement('span');
    stagesCurrentPage.id = 'stagesCurrentPage';
    const stagesBtnGroup = document.createElement('div');
    stagesBtnGroup.classList.add('stages__btn-group');
    stagesBtnGroup.append(prevBtn);
    stagesBtnGroup.append(stagesCurrentPage);
    stagesBtnGroup.append(nextBtn);
    stagesContainer.appendChild(stagesBtnGroup)

    function showSlide(page) {
      stagesSlides.forEach((slide, index) => {
        if (index === page) {
          slide.style.display = 'block';
        } else {
          slide.style.display = 'none';
        }
      });

      stagesCurrentPage.textContent = `${currentPage + 1}/${totalPages}`;
    }
    function nextPage() {
      currentPage = (currentPage + 1) % totalPages;
      showSlide(currentPage);
    }
    function prevPage() {
      currentPage = (currentPage - 1 + totalPages) % totalPages;
      showSlide(currentPage);
    }
    prevBtn.addEventListener('click', prevPage);
    nextBtn.addEventListener('click', nextPage);

    showSlide(currentPage);
  }

  function getMembersBtnGroup() {
    const membersBtnGroup = document.getElementById('membersBtnGroup');
    const membersContainer = document.getElementById('membersContainer');

    membersContainer.appendChild(membersBtnGroup)
  }

  function checkScreenSize() {
    console.log('Window width:', window.innerWidth);

    if (window.innerWidth <= 450) {
      createHeroTitle();
      membersMobileSlider();
      stagesSlider();
      getMembersBtnGroup()
    } else {
      console.log('No action!!')
    }
  };

  cloneAnimate()
  membersSlider();

  checkScreenSize();
  window.addEventListener('resize', () => {checkScreenSize, membersMobileSlider, stagesSlider, getMembersBtnGroup});
})
