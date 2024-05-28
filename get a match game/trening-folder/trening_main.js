
(()=> {
  function createArrOfPairs(count) {
    let arrOfPairs = [];
    for(let i = 1; i <= count; i++) {
      arrOfPairs.push(i, i);
    };
    return arrOfPairs;
  }

  let arrOfPairs = createArrOfPairs(3);
  console.log(arrOfPairs);

  document.addEventListener("DOMContentLoaded", ()=> {

  })
})();


