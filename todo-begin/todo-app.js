(function(){

  // Отправляем данные в localStorage
  function setData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  };
  //Извлекаем данные из localStorage
  function getData(key) {
    return JSON.parse(localStorage.getItem(key));
  };

  //создать и вернуть заголовок приложения
  function createTitle(title) {
    const todoTitle = document.createElement('h2');
    todoTitle.innerHTML = title;
    return todoTitle;
  }


  //создать и вернуть форму для создания дела
  function createForm() {
    const todoForm = document.createElement('form');
    todoForm.classList.add('todo-form');

    const formInput = document.createElement('input');
    formInput.classList.add('todo-form__input')
    formInput.placeholder = 'Enter your todo';

    const formBtn = document.createElement('button');
    formBtn.textContent = 'Create Todo';
    formBtn.setAttribute('type', 'submit');
    formBtn.classList.add('todo-form__btn');

    function checkInputStatus() {
      if (!formInput.value) {
        formBtn.setAttribute('disabled', true);
        formBtn.classList.add('todo-form__btn-disabled')
      } else {
        formBtn.removeAttribute('disabled')
      }
    };
    formInput.addEventListener('input', checkInputStatus);
    checkInputStatus();

    todoForm.append(formInput);
    todoForm.append(formBtn);

    return {
      todoForm,
      formInput,
      formBtn,
      checkInputStatus,
    }
  }

  //Создать и вернуть список элементов
  function createList () {
    const todoList = document.createElement('ul');
    todoList.classList.add('todo-list', 'list-reset');
    return todoList;
  }

  //Создать и вернуть элемент списка
  function createListItem( { id, name, done }, array, key) {
    const todoItem = document.createElement('li');
    todoItem.textContent = name;
    todoItem.classList.add('todo-item');

    const todoItemBtnGroup = document.createElement('div');
    todoItemBtnGroup.classList.add('todo-item__btn-group');
    const todoItemDoneBtn = document.createElement('button');
    todoItemDoneBtn.classList.add('todo-item__done-btn');
    todoItemDoneBtn.textContent = 'Done';
    const todoItemDeleteBtn = document.createElement('button');
    todoItemDeleteBtn.classList.add('todo-item__delete-btn')
    todoItemDeleteBtn.textContent = 'Delete';

    todoItemBtnGroup.append(todoItemDoneBtn);
    todoItemBtnGroup.append(todoItemDeleteBtn);
    todoItem.append(todoItemBtnGroup);

    todoItemDoneBtn.addEventListener('click', (e) => {
      e.stopPropagation();

      let itemIndex = array.findIndex(item => item.id === id);
      if ( itemIndex !== -1 && array[itemIndex].done ) {
        return
      }

      todoItem.classList.toggle('todo-item__done');
      if ( itemIndex !== -1 ) {
        array[itemIndex].done = !array[itemIndex].done;
      }
      setData(key, array);
    })
    todoItemDeleteBtn.addEventListener('click', () => {
      todoItem.remove();
      let itemIndex = array.findIndex(item => item.id === id);
      if ( itemIndex !== -1 ) {
        array.splice(itemIndex, 1);
      }
      setData(key, array)
    })

    if ( todoItem.done ) {

    }
    todoItem.addEventListener('click', () => {

      let itemIndex = array.findIndex(item => item.id === id);
      if ( itemIndex !== -1 && array[itemIndex].done ) {
        return
      }

      todoItem.textContent = '';
      const newTodoItemWrapper = document.createElement('div');
      const newTodoItemInput = document.createElement('input');
      newTodoItemInput.value = name;
      const newTodoItemClosedBtn = document.createElement('button');
      newTodoItemClosedBtn.textContent = 'Cancel';
      const newTodoItemReplacedBtn = document.createElement('button');
      newTodoItemReplacedBtn.textContent = 'Replace';
      newTodoItemWrapper.append(newTodoItemInput);
      newTodoItemWrapper.append(newTodoItemClosedBtn);
      newTodoItemWrapper.append(newTodoItemReplacedBtn);
      todoItem.append(newTodoItemWrapper);
      newTodoItemInput.focus();

      newTodoItemClosedBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        todoItem.textContent = name;
        todoItem.append(todoItemBtnGroup);
      })

      newTodoItemInput.addEventListener('keydown', (e) => {
        if (e.key == 'Enter') {
          let newTodoItem = newTodoItemInput.value;
          let itemIndex = array.findIndex(item => item.id === id);
          if ( itemIndex !== -1 ) {
            array[itemIndex].name = newTodoItem;
            setData(key, array);
          }
          todoItem.textContent = newTodoItem;
          todoItem.append(todoItemBtnGroup);
        }
      });

      newTodoItemReplacedBtn.addEventListener('click', (e)=> {
        e.stopPropagation();
        let newTodoItem = newTodoItemInput.value;
        let itemIndex = array.findIndex(item => item.id === id);
        if ( itemIndex !== -1 ) {
          array[itemIndex].name = newTodoItem;
          setData(key, array);
        }
        todoItem.textContent = newTodoItem;
        todoItem.append(todoItemBtnGroup);
      })

    })

    return todoItem;
  };

  //Отрисовка елементов списка на экране
  function renderTodoList(container, array, key) {
    array.forEach(item => {
      let appItem = createListItem(item, array, key);
      if ( item.done ) {
        appItem.classList.add('todo-item__done');
      } else {
        appItem.classList.remove('todo-item__done')
      }
      container.append(appItem);
    })
  };

  //Функция поиска наибольшего id в списке дел и его увеличение на 1
  function findMaxId(array) {
    let maxId = Math.max(...array.map(item => item.id), 0);
    return maxId + 1;
  };

  //Инициализация всего приложения
  function createTodoApp(container, key, title) {

    const appTitle = createTitle(title);
    const appForm = createForm();
    const appList = createList();

    container.append(appTitle);
    container.append(appForm.todoForm);
    container.append(appList);

    let arrOfTodos = getData(key);
    if (!arrOfTodos) {
      arrOfTodos = [];
      appForm.formBtn.addEventListener('click', (e) => {
        e.preventDefault();
        let newId = findMaxId(arrOfTodos);

        let newTodoEl = {
          id: newId,
          name: appForm.formInput.value,
          done: false,
        };

        appForm.formInput.value = '';
        appForm.checkInputStatus();
        appList.textContent = '';
        arrOfTodos.push(newTodoEl);
        setData(key, arrOfTodos);
        renderTodoList(appList, arrOfTodos, key);
      });
    } else {
      renderTodoList(appList, arrOfTodos, key);

      appForm.formBtn.addEventListener('click', (e) => {
        e.preventDefault();
        let newId = findMaxId(arrOfTodos);

        let newTodoEl = {
          id: newId,
          name: appForm.formInput.value,
          done: false,
        };

        appForm.formInput.value = '';
        appForm.checkInputStatus();
        appList.textContent = '';
        arrOfTodos.push(newTodoEl);
        setData(key, arrOfTodos);
        renderTodoList(appList, arrOfTodos, key);
      });
    }
  };

  window.createTodoApp = createTodoApp;
})();
