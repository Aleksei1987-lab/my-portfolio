
(()=>{
// создаём и возвращаем заголовок
function createTitle(title) {
  const appTitle = document.createElement('h2');
  appTitle.classList.add('todo__title');
  appTitle.innerHTML = title;

  return appTitle;
};

//создаём и возвращаем форму и её элементы
function createForm() {
  const form = document.createElement('form');
  form.classList.add('todo__form');

  const input = document.createElement('input');
  input.classList.add('todo__input');
  input.placeholder = 'Enter todo name';

  const btnWrapper = document.createElement('div');
  btnWrapper.classList.add('todo__formwrapper');

  const button = document.createElement('button');
  button.classList.add('todo__btn');
  button.textContent = 'New case'

  function checkInputStatus() {
    if (!input.value) {
      button.setAttribute('disabled', true)
    } else {
      button.removeAttribute('disabled')
    };
  }

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
  }
};

//создаём и возвращаем список дел
function createList() {
  const list = document.createElement('ul');
  list.classList.add('todo__list');

  return list;
};

//создаём и возвращаем элемент списка с его элементами
function createItem(name, done) {
  const item = document.createElement('li');
  item.classList.add('todo__item');
  item.textContent = name;

  const btnWrapper = document.createElement('div');
  btnWrapper.classList.add('todo__itemwrapper');

  const doneButton = document.createElement('button');
  doneButton.classList.add('todo__donebtn');
  doneButton.textContent = 'Finished';

  const deleteButton = document.createElement('button');
  deleteButton.classList.add('todo__deletebtn');
  deleteButton.textContent = 'Delete';

  btnWrapper.append(doneButton);
  btnWrapper.append(deleteButton);
  item.append(btnWrapper);

  return {
    item,
    doneButton,
    deleteButton,
    done,
  }
};

//отправляем данные в хранилище
function setCartData(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
};
//достам и преобразовываем данные из храгилища в js объект
function getCartData(key) {
  return parseData = JSON.parse(localStorage.getItem(key));
};

//функция поиска id
function findMaxId(arr) {
  const maxId = Math.max(...arr.map(item=> item.id), 0);
  return maxId + 1
};

//создание общей структуры приложения
function createTodoApp(container, title = 'Список дел', key) {
  let todoTitle = createTitle(title);
  let todoForm = createForm();
  let todoList = createList();

  //создание массива для хранения элементов списка
  let arrOfTodoItems = [];

  container.append(todoTitle);
  container.append(todoForm.form);
  container.append(todoList);

  let getTodoList = getCartData(key);
  if(getTodoList) {
    getTodoList.forEach(elem => {
      let todoItem = createItem(elem.name, elem.done);
      if(elem.done) {
        todoItem.item.classList.add('case-done');
      } else {
        todoItem.item.classList.remove('case-done');
      };
      todoItem.doneButton.addEventListener('click', ()=> {
        todoItem.item.classList.toggle('case-done');
        elem.done = !elem.done;
        setCartData(key, getTodoList);
      });
      todoItem.deleteButton.addEventListener('click', ()=> {
        if(confirm('You are sure?')) {
          todoItem.item.remove();
          getTodoList = getTodoList.filter(item => item.id !== elem.id);
          setCartData(key, getTodoList);
        }
      });
      todoList.append(todoItem.item);
    });
    todoForm.button.addEventListener('click', ()=> {
      let id = findMaxId(getTodoList);
      let newItem = {
        id:id,
        name: todoForm.input.value,
        done: false,
      };
      getTodoList.push(newItem);
      setCartData(key, getTodoList);
      let todoItem = createItem(newItem.name, newItem.done);

      todoItem.doneButton.addEventListener('click', ()=> {
        todoItem.item.classList.toggle('case-done');
        newItem.done = !newItem.done;
        setCartData(key, getTodoList);
      });
      todoItem.deleteButton.addEventListener('click', ()=> {
        if(confirm('You are sure?')) {
          todoItem.item.remove();
          getTodoList = getTodoList.filter(item=> item.id !== newItem.id);
          setCartData(key, getTodoList);
        }
      });
      todoList.append(todoItem.item);
      todoForm.input.value = '';
      todoForm.checkInputStatus();
    });
  } else {
    todoForm.button.addEventListener('click', ()=> {
      let id = findMaxId(arrOfTodoItems);
      let newItem = {
        id: id,
        name: todoForm.input.value,
        done: false,
      };
      arrOfTodoItems.push(newItem);
      setCartData(key, arrOfTodoItems);
      let todoItem = createItem(todoForm.input.value);
      todoItem.doneButton.addEventListener('click', ()=> {
        let todoItemIndex = arrOfTodoItems.findIndex(item=> item.id === newItem.id);
        if(todoItemIndex !== -1) {
          arrOfTodoItems[todoItemIndex].done = !arrOfTodoItems[todoItemIndex].done;
        }
        todoItem.item.classList.add('case-done');
        setCartData(key, arrOfTodoItems);
      });
      todoItem.deleteButton.addEventListener('click', ()=> {
        if(confirm('You are sure?')) {
          todoItem.item.remove();
          arrOfTodoItems = arrOfTodoItems.filter(item=> item.id !== newItem.id);
          setCartData(key, arrOfTodoItems);
        }
      });
      todoList.append(todoItem.item);
      todoForm.input.value = '';
      todoForm.checkInputStatus();
    });
  };
};

window.createTodoApp = createTodoApp;

})();
