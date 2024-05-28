// <!DOCTYPE html>
// <html lang="en">
// <head>
// <meta charset="UTF-8">
// <meta name="viewport" content="width=device-width, initial-scale=1.0">
// <title>Управление студентами</title>
// <style>
//     /* Стили CSS */
// </style>
// </head>
// <body>
//     <h1>Управление студентами</h1>
//     <form id="studentForm">
//         <!-- Форма добавления нового студента -->
//         <label for="firstName">Имя:</label>
//         <input type="text" id="firstName" required><br>
//         <label for="lastName">Фамилия:</label>
//         <input type="text" id="lastName" required><br>
//         <label for="patronymic">Отчество:</label>
//         <input type="text" id="patronymic"><br>
//         <label for="dob">Дата рождения:</label>
//         <input type="date" id="dob" required><br>
//         <label for="startYear">Год начала обучения:</label>
//         <input type="number" id="startYear" min="2000" max="2024" required><br>
//         <label for="faculty">Факультет:</label>
//         <input type="text" id="faculty" required><br>
//         <button type="submit">Добавить студента</button>
//     </form>
//     <div id="filters">
//         <!-- Фильтры -->
//         <label for="filterName">Ф. И. О.:</label>
//         <input type="text" id="filterName"><br>
//         <label for="filterFaculty">Факультет:</label>
//         <input type="text" id="filterFaculty"><br>
//         <label for="filterStartYear">Год начала обучения:</label>
//         <input type="number" id="filterStartYear" min="2000" max="2024"><br>
//         <label for="filterEndYear">Год окончания обучения:</label>
//         <input type="number" id="filterEndYear" min="2000" max="2024"><br>
//     </div>
//     <table id="studentTable">
//         <!-- Таблица со студентами -->
//         <thead>
//             <tr>
//                 <th onclick="sortTable(0)">Ф. И. О.</th>
//                 <th onclick="sortTable(1)">Факультет</th>
//                 <th onclick="sortTable(2)">Дата рождения и возраст</th>
//                 <th onclick="sortTable(3)">Годы обучения и курс</th>
//             </tr>
//         </thead>
//         <tbody id="studentData">
//             <!-- Здесь будет генерироваться содержимое таблицы -->
//         </tbody>
//     </table>

//     <script>
//         // JavaScript код для управления студентами
//         let students = []; // Массив студентов

//         // Функция добавления студента
//         function addStudent(event) {
//             event.preventDefault(); // Отменить действие по умолчанию
//             // Получение значений из формы
//             const firstName = document.getElementById('firstName').value.trim();
//             const lastName = document.getElementById('lastName').value.trim();
//             const patronymic = document.getElementById('patronymic').value.trim();
//             const dob = new Date(document.getElementById('dob').value);
//             const startYear = parseInt(document.getElementById('startYear').value);
//             const faculty = document.getElementById('faculty').value.trim();

//             // Валидация данных
//             // Ваш код валидации

//             // Создание объекта студента
//             const student = {
//                 firstName,
//                 lastName,
//                 patronymic,
//                 dob,
//                 startYear,
//                 faculty
//             };

//             // Добавление студента в массив
//             students.push(student);

//             // Обновление таблицы
//             updateTable();
//         }

//         // Функция обновления таблицы
//         function updateTable() {
//             const tableBody = document.getElementById('studentData');
//             tableBody.innerHTML = ''; // Очистить содержимое таблицы

//             // Генерация строк таблицы
//             students.forEach(student => {
//                 const row = document.createElement('tr');
//                 const fullName = `${student.lastName} ${student.firstName} ${student.patronymic}`;
//                 const age = new Date().getFullYear() - student.dob.getFullYear();
//                 const course = new Date().getFullYear() - student.startYear + 1;
//                 const studyYears = `${student.startYear}-${student.startYear + 4}`;

//                 row.innerHTML = `
//                     <td>${fullName}</td>
//                     <td>${student.faculty}</td>
//                     <td>${student.dob.toLocaleDateString()} (${age} лет)</td>
//                     <td>${studyYears} (${course} курс)</td>
//                 `;
//                 tableBody.appendChild(row);
//             });
//         }

//         // Функция сортировки таблицы
//         function sortTable(columnIndex) {
//             // Ваш код сортировки
//         }

//         // Назначение обработчика события отправки формы
//         document.getElementById('studentForm').addEventListener('submit', addStudent);

//         // Первоначальное обновление таблицы
//         updateTable();
//     </script>
// </body>
// </html>
