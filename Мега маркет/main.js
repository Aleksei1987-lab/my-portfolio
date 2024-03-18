
document.addEventListener("DOMContentLoaded", function(){
  function showBanner() {
    setTimeout(function(){
      document.querySelector('.banner').classList.add('visible')
    }, 1000);
    setTimeout(function(){
      document.querySelector('.bottom__title').classList.add('visible')
    }, 2000);
    setTimeout(function(){
      document.querySelector('.bonuses__percent').classList.add('visible')
    }, 3000);
    setTimeout(function(){
      document.querySelector('.bonuses__plus1').classList.add('visible')
    }, 4000);
    setTimeout(function(){
      document.querySelector('.bonuses__plus2').classList.add('visible')
    }, 5000);
    setTimeout(function(){
      document.querySelector('.banner').classList.remove('visible')
    }, 15000);

    setTimeout(function(){
      document.querySelector('.descriptor').classList.add('visible')
    }, 16000);
    setTimeout(function(){
      document.querySelector('.descriptor').classList.remove('visible')
    }, 25000);
  }
  showBanner()


})
