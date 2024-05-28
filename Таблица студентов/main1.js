

// Этап 1. В HTML файле создайте верстку элементов, которые будут статичны(неизменны).
// Этап 2. Создайте массив объектов студентов.Добавьте в него объекты студентов, например 5 студентов.
const studentsList = [               // Добавьте сюда объекты студентов
  {
    firstName: 'Илья',
    lastName: 'Саблуков',
    patronymic: 'Михайлович',
    faculty: 'Електрика',
    birthDay: new Date(1993, 11, 31),
    startYear: 2017,
  },
  {
    firstName: 'Алексей',
    lastName: 'Саблуков',
    patronymic: 'Михайлович',
    faculty: 'Автомобили',
    birthDay: new Date(1987, 6, 26),
    startYear: 2013,
  },
  {
    firstName: 'Имяч',
    lastName: 'Аброков',
    patronymic: 'Булкович',
    faculty: 'Факультет',
    birthDay: new Date(1993, 6, 1),
    startYear: 2016,
  },
  {
    firstName: 'Михаил',
    lastName: 'Михайлов',
    patronymic: 'Тумбович',
    faculty: 'Факультет',
    birthDay: new Date(1999, 1, 1),
    startYear: 2014,
  },
  {
    firstName: 'Григорий',
    lastName: 'Парень',
    patronymic: 'Тумбович',
    faculty: 'Куртка',
    birthDay: new Date(1999, 9, 1),
    startYear: 2013,
  },
];

// Этап 3. Создайте функцию вывода одного студента в таблицу, по аналогии с тем, как вы делали вывод одного дела в модуле 8. Функция должна вернуть html элемент с информацией o пользователе.У функции должен быть один аргумент - объект студента.
function getStudentItem(studentObj) {
  const row = document.createElement('tr');
  const age = new Date().getFullYear() - studentObj.birthDay.getFullYear();
  const educationYears = studentObj.startYear + '-' + (studentObj.startYear + 4);
  let educationStatus;
  if (new Date().getFullYear() > studentObj.startYear + 4) {
    educationStatus = 'закончил';
  } else {
    educationStatus = (new Date().getFullYear() - studentObj.startYear) + ' курс';
  }
  row.innerHTML = `
    <td>${studentObj.firstName} ${studentObj.lastName} ${studentObj.patronymic}</td>
    <td>${studentObj.faculty}</td>
    <td>${studentObj.birthDay.toLocaleDateString()} (${age} лет)</td>
    <td>${educationYears} (${educationStatus})</td>
  `;
  return row;
};

// Этап 4. Создайте функцию отрисовки всех студентов. Аргументом функции будет массив студентов.Функция должна использовать ранее созданную функцию создания одной записи для студента.Цикл поможет вам создать список студентов.Каждый раз при изменении списка студента вы будете вызывать эту функцию для отрисовки таблицы.
function renderStudentsTable(studentsArray) {
  const tableBody = document.getElementById('student-list');
  // tableBody.innerHTML = '';
  studentsArray.forEach(studentObj => {
    tableBody.appendChild(getStudentItem(studentObj));
  });
};

renderStudentsTable(studentsList)

// Этап 5. К форме добавления студента добавьте слушатель события отправки формы, в котором будет проверка введенных данных.Если проверка пройдет успешно, добавляйте объект с данными студентов в массив студентов и запустите функцию отрисовки таблицы студентов, созданную на этапе 4.

// Этап 5.1 Создайте функцию сортировки массива студентов и добавьте события кликов на соответствующие колонки.

// Этап 6. Создайте функцию фильтрации массива студентов и добавьте события для элементов формы.


  // Этап 5.1. Создаем функцию сортировки массива студентов.
// Функция для сортировки массива студентов по выбранной колонке
// Весь предоставленный код до этого остается неизменным

// Функция для сортировки массива студентов по Ф.И.О.




