
// Этап 1. В HTML файле создайте верстку элементов, которые будут статичны(неизменны).
// Этап 2. Создайте массив объектов студентов.Добавьте в него объекты студентов, например 5 студентов.
const studentsList = [               // Добавьте сюда объекты студентов
  {
    lastName: 'Саблуков',
    firstName: 'Илья',
    patronymic: 'Михайлович',
    faculty: 'Электрика',
    birthDay: new Date(1993, 11, 31),
    startYear: 2017,
  },
  {
    lastName: 'Саблуков',
    firstName: 'Алексей',
    patronymic: 'Михайлович',
    faculty: 'Автомобили',
    birthDay: new Date(1987, 6, 26),
    startYear: 2013,
  },
  {
    lastName: 'Романов',
    firstName: 'Сергей',
    patronymic: 'Николаевич',
    faculty: 'Электрика',
    birthDay: new Date(1993, 6, 1),
    startYear: 2016,
  },
  {
    lastName: 'Михайлов',
    firstName: 'Михаил',
    patronymic: 'Сергеевич',
    faculty: 'Факультет',
    birthDay: new Date(1999, 1, 1),
    startYear: 2014,
  },
  {
    lastName: 'Лимонов',
    firstName: 'Григорий',
    patronymic: 'Николаевич',
    faculty: 'Медицина',
    birthDay: new Date(1999, 9, 1),
    startYear: 2021,
  },
  {
    lastName: 'Саров',
    firstName: 'Григорий',
    patronymic: 'Сергеевич',
    faculty: 'Медицина',
    birthDay: new Date(1987, 9, 1),
    startYear: 2022,
  },
];

// Этап 3. Создайте функцию вывода одного студента в таблицу, по аналогии с тем, как вы делали вывод одного дела в модуле 8. Функция должна вернуть html элемент с информацией o пользователе.У функции должен быть один аргумент - объект студента.
function createStudentRow(studentObj) {
  const studentRow = document.createElement('tr');
  const fullName = `${studentObj.lastName} ${studentObj.firstName} ${studentObj.patronymic}`;
  const age = new Date().getFullYear() - studentObj.birthDay.getFullYear();
  const curentYear = new Date().getFullYear();

  let learningStatus = (studentObj.startYear + 4 > curentYear) ? `(${(studentObj.startYear + 4) - curentYear} курс)` : '(Закончил)';

  studentRow.innerHTML = `
    <td>${fullName}</td>
    <td>${studentObj.faculty}</td>
    <td>${studentObj.birthDay.toLocaleDateString()} (${age} лет)</td>
    <td>${studentObj.startYear} - ${studentObj.startYear + 4} ${learningStatus}</td>
  `;

  return studentRow;
};

// Этап 4. Создайте функцию отрисовки всех студентов. Аргументом функции будет массив студентов.Функция должна использовать ранее созданную функцию создания одной записи для студента.Цикл поможет вам создать список студентов.Каждый раз при изменении списка студента вы будете вызывать эту функцию для отрисовки таблицы.
function renderStudentList(arr) {
  const studentsListContainer = document.getElementById('studentsList');
  studentsListContainer.innerHTML = '';
  arr.forEach(item=> {
    const studentRow = createStudentRow(item);
    studentsListContainer.appendChild(studentRow);
  })
};

// функция добавления текста ошибки ввода
function createErrorMessage(text) {
  const errorText = document.createElement('p');
  errorText.classList.add('error-text');
  errorText.textContent = text;

  return errorText;
};

// функция удаления текста ошибки ввода
function clearErrorMessages() {
  const errorMessages = document.querySelectorAll('.error-text');
  errorMessages.forEach(errorMessage=> {
    errorMessage.remove()
  })
};

//Функция сортировки списка студентов по заголовку в шапке таблицы



//К форме добавления студента добавьте слушатель события отправки формы, в котором будет проверка введенных данных.Если проверка пройдет успешно, добавляйте объект с данными студентов в массив студентов и запустите функцию отрисовки таблицы студентов, созданную на этапе 4.
document.addEventListener("DOMContentLoaded", ()=> {
  renderStudentList(studentsList)
  document.getElementById('studentsInputForm').addEventListener("submit", (e)=> {
    e.preventDefault();
    clearErrorMessages();

    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const patronymic = document.getElementById('patronymic').value.trim();
    const faculty = document.getElementById('faculty').value.trim();
    const birthDay = new Date(document.getElementById('birthDay').value);
    const startYear = parseInt(document.getElementById('startLearning').value);

    if(firstName && lastName && patronymic && faculty && birthDay &&startYear) {
      if((birthDay >= new Date(1900, 1, 1) && birthDay <= new Date()) && (startYear >= 2000 && startYear <= new Date().getFullYear())) {
        let newStudent = {
          firstName: firstName,
          lastName: lastName,
          patronymic: patronymic,
          faculty: faculty,
          birthDay: birthDay,
          startYear: startYear,
        };
        studentsList.push(newStudent)
        renderStudentList(studentsList)
        document.getElementById('firstName').value = '';
        document.getElementById('lastName').value = '';
        document.getElementById('patronymic').value = '';
        document.getElementById('faculty').value = '';
        document.getElementById('birthDay').value = '';
        document.getElementById('startLearning').value = '';
      } else {
        const errorTextContainer = document.getElementById('errorCase');
        errorTextContainer.innerHTML = '';
        errorTextContainer.appendChild(createErrorMessage('Укажите корректные даты'));

      }
    } else {
      const errorTextContainer = document.getElementById('errorCase');
      errorTextContainer.innerHTML = '';
      errorTextContainer.appendChild(createErrorMessage('Все поля должны быть заполнены'));
    }
  });

  let sortDirection = 1; // По умолчанию сортировка будет от меньшего к большему
  function sortByFullName() {   //Сортировка списка студентов по ФИО
    studentsList.sort((a, b) => {
      const fullNameA = `${a.lastName} ${a.firstName} ${a.patronymic}`.toLowerCase();
      const fullNameB = `${b.lastName} ${b.firstName} ${b.patronymic}`.toLowerCase();
      if (fullNameA < fullNameB) return -1 * sortDirection;
      if (fullNameA > fullNameB) return 1 * sortDirection;
      return 0;
    });
    renderStudentList(studentsList);
  };
  document.getElementById('fullNameHeader').addEventListener('click', ()=> {
    sortDirection *= -1;
    sortByFullName();
  })

  function sortByFaculty() {
    studentsList.sort((a, b)=> {
      if(a.faculty > b.faculty) return 1 * sortDirection;
      if(a.faculty < b.faculty) return -1 * sortDirection;
      return 0;
    });
    renderStudentList(studentsList)
  };
  document.getElementById('facultyHeader').addEventListener('click', ()=> {
    sortDirection *= -1;
    sortByFaculty();
  });

});


  // Этап 5.1. Создаем функцию сортировки массива студентов.
  // Функции сортировки массива студентов по выбранной колонке


  // Функция для сортировки массива студентов по факультету


  // Функция для сортировки массива студентов по дате рождения и возрасту


  // Функция для сортировки массива студентов по годам обучения


  // Обработчики событий клика на ячейки заголовка для сортировки


  // Этап 6. Создайте функцию фильтрации массива студентов и добавьте события для элементов формы.


    // Перерисовка таблицы с учетом фильтрации

  // Добавление события на кнопку "Найти совпадения"






