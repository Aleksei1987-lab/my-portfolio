
(()=>{
  //Создаём заголовок
  function createTitle (title) {
    const appTitle = document.createElement('h1');
    appTitle.classList.add('todo__title');
    appTitle.textContent = title;
    return appTitle;
  };

  //Создаём форму с полем для ввода и кнопкой создания дела
  function createForm () {
    const form = document.createElement('form');
    form.classList.add('todo__form');
    const input = document.createElement('input');
    input.classList.add('todo__input');
    input.placeholder = 'Enter your todo!'
    const btnGroup = document.createElement('div');
    btnGroup.classList.add('todo__btnGroup');
    const createBtn = document.createElement('button');
    createBtn.classList.add('todo__createBtn');
    createBtn.textContent = 'Create todo'

    btnGroup.append(createBtn);
    form.append(input);
    form.append(btnGroup);

    return {
      form,
      input,
      createBtn,
    };
  };

  //Создаём список дел
  function createList () {
    const list = document.createElement('ul');
    list.classList.add('todo__list');
    return list;
  };

  //Создаём элемент списка
  function createItem (name) {
    const item = document.createElement('li');
    const btnGroup = document.createElement('div');
    const doneBtn = document.createElement('button');
    const deleteBtn = document.createElement('button');

    item.classList.add('todo__item')
    item.textContent = name;

    doneBtn.textContent = 'Done case';
    deleteBtn.textContent = 'Delete case';

    btnGroup.append(doneBtn);
    btnGroup.append(deleteBtn);
    item.append(btnGroup);

    return {
      item,
      doneBtn,
      deleteBtn,
    }
  };

  function createTodoApp (container, title = 'Todo list') {
    const todoTitle = createTitle(title);
    const todoForm = createForm();
    const todoList = createList();

    container.append(todoTitle);
    container.append(todoForm.form);
    container.append(todoList);

    todoForm.form.addEventListener('submit', async event=> {
      event.preventDefault();
      if (!todoForm.input.value) {
        return
      }

      const response = await fetch('http://localhost:3000/api/todos', {
        method: "POST",
        body: JSON.stringify({
          name: todoForm.input.value.trim(),
          owner: 'Aleksei'
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const todoItem = await response.json();

      // const todoItem = createItem (todoForm.input.value);
      // todoItem.doneBtn.addEventListener('click', ()=> {
      //   todoItem.item.classList.toggle('done-item');
      // });
      // todoItem.deleteBtn.addEventListener('click', ()=> {
      //   if (confirm('you are sure?')) {
      //     todoItem.item.remove();
      //   }
      // });

      // todoList.append(todoItem.item);

      // todoForm.input.value = '';
    })
  };

  window.createTodoApp = createTodoApp;
})()
