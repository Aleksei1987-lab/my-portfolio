document.addEventListener('DOMContentLoaded', () => {
  const productsSlider = document.querySelector('.products__swiper-container');
  let productsSwiper = new Swiper(productsSlider, {
    slidesPerView: 3,
    spaceBetween: 20,
    loop: true,
    centeredSlides: true,
    slideClass: 'products__swiper-slide',
    wrapperClass: 'products__swiper-wrapper',
    pagination: {
      el: '.products__pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.products__button-next',
      prevEl: '.products__button-prev',
    },
  })

  const growupSlider = document.querySelector('.growup__swiper-container');
  let growupSwiper = new Swiper(growupSlider, {
    slidesPerView: 1,
    spaceBetween: 10,
    loop: true,
    slideClass: 'growup__slide',
    wrapperClass: 'growup__swiper-wrapper',
    navigation: {
      nextEl: '.growup__button-next',
      prevEl: '.growup__button-prev',
    },
  })
});
