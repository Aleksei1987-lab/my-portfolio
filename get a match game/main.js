
(()=>{
  // функция, генерирующая массив парных чисел. Пример массива, который должна возвратить функция: [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8].count - количество пар.
  function createNumbersArray(count) {
    if(count <= 2) {
      return [];
    };

    let numberArray = [];
    for(let i = 1; i <= count; i++) {
      numberArray.push(i, i);
    };
    return numberArray;
  };


  // функция перемешивания массива.Функция принимает в аргументе исходный массив и возвращает перемешанный массив. arr - массив чисел
  function shuffle(arr) {
    for(let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  //создаём заголовок приложения
  function createTitle(name) {
    const title = document.createElement('h2');
    title.textContent = name;
    title.classList.add('game__title');

    return title;
  };

  //создаём форму с полем для ввода колличества карточек и кнопкой для старта игры
  function createForm() {
    let form = document.createElement('form');
    form.classList.add('game__form');

    let input = document.createElement('input');
    input.classList.add('game__input');
    input.placeholder = 'Количество пар от 2 до 10';

    let btnWrapper = document.createElement('div');
    btnWrapper.classList.add('game__box');
    let button = document.createElement('button');
    button.classList.add('game__btn');
    button.textContent = 'Start the game';

    function checkInputStatus(){
      if(!input.value) {
        button.setAttribute('disabled', true);
      } else {
        button.removeAttribute('disabled');
      }
    };
    input.addEventListener('input', checkInputStatus);
    checkInputStatus();

    btnWrapper.append(button);
    form.append(input);
    form.append(btnWrapper);

    return {
      form,
      input,
      button,
      checkInputStatus,
    };
  };

  //создаём поле карточек
  function createField() {
    const field = document.createElement('div');
    field.classList.add('game__field');

    return field;
  };

  //создаём карточку
  function createCard(name, status) {
    const card = document.createElement('div');
    card.classList.add('game__card');
    card.dataset.value = name;
    card.textContent = '?';

    return {
      card,
      status,
    };
  };

  function createArrOfObj(array) {
    let objArr = [];
    let id = 1;

    array.forEach(item => {
      const obj = {
        name: item,
        id: id++,
        status: false,
      };
      objArr.push(obj);
    });

    return objArr
  };

  function createGame(container, title) {
    let gameTitle = createTitle(title)
    let gameField = createField();
    let gameForm = createForm();

    container.append(gameTitle);
    container.append(gameForm.form);
    container.append(gameField);

    gameForm.button.addEventListener('click', function(e) {
      e.preventDefault();

      let digitPairs = parseInt(gameForm.input.value);
      if((digitPairs >= 3) && (digitPairs <= 10)) {
        const mixedArray = shuffle(createNumbersArray(digitPairs ));
        const arrOfMixedObj = createArrOfObj(mixedArray);
        arrOfMixedObj.forEach(item=> {
          const gameCard = createCard(item.name, item.status);
          gameField.append(gameCard.card);
          gameForm.form.classList.add('hidden');
        })
      }
      if((digitPairs <= 3)) {
        alert('Слишком мало пар!');
      }
      if((digitPairs >= 10)) {
        alert('Слишком много пар!');
      };
      gameForm.input.value = '';
      gameForm.checkInputStatus();

      let firstCard = '';
      let secondCard = '';
      let isСhecking = false;

      const cards = document.querySelectorAll('.game__card');
      cards.forEach(card=> {
        card.addEventListener('click', ()=>{
          if(!isСhecking && !card.classList.contains('selected')) {
            card.classList.add('selected');
            card.textContent = card.dataset.value;
            if(!firstCard){
              firstCard = card;
            } else {
              secondCard = card;
              isСhecking = true;
              checkMatch();
            };
          }
        });
      });

      function checkMatch() {
        if (firstCard.dataset.value === secondCard.dataset.value) {
          setTimeout(()=> {
            firstCard.classList.remove('selected');
            firstCard.classList.add('matched');
            firstCard = null;
            secondCard.classList.remove('selected');
            secondCard.classList.add('matched');
            secondCard = null;
            isСhecking = false;
            if(document.querySelectorAll('.matched').length === (digitPairs * 2)){
              gameField.textContent = '';
              let newGameBtn = document.createElement('button');
              newGameBtn.textContent = 'Start new game';
              newGameBtn.classList.add('game__reset');
              container.append(newGameBtn);
              newGameBtn.addEventListener('click', function(){
                container.removeChild(newGameBtn);
                gameForm.form.classList.remove('hidden');
              });
            }
          }, 500)
        } else {
          setTimeout(()=>{
            firstCard.classList.remove('selected');
            firstCard.textContent = '?';
            firstCard = null;
            secondCard.classList.remove('selected');
            secondCard.textContent = '?';
            secondCard = null;
            isСhecking = false;
          }, 500)
        }
      };
    });
  };

  window.createGame = createGame;
})();
