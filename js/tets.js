var list = document.querySelector('.todo-list'); // ul из разметки
// var items = list.querySelectorAll('.todo-list-item'); // li из разметки (статичная коллекция)
var items = list.children; // LI  из DOM (живая коллекция)
var emptyListMessage = document.querySelector('.empty-tasks'); // сообщение с пустым списком
var newItemForm = document.querySelector('.add-form'); // Нашли форму, записали в переменную
var newItemTitle = newItemForm.querySelector('.add-form-input'); // Находим input (поле ввода)
var taskTemplate = document.querySelector('#task-template').content; // находим шаблон в файле
var newItemTemplate = taskTemplate.querySelector('.todo-list-item'); // находим элемент списка в шаблоне, который будем добавлять

var toggleEmptyListMessage = function () {
  if (items.length === 0) {
    // если длина коллекции элементов равна 0, то
    emptyListMessage.classList.remove('hidden'); // удаляем у сообщения класс для скрытия
  } else {
    emptyListMessage.classList.add('hidden'); // Иначе добавляем класс, скрывающий сообщение
  }
};
var addCheckHandler = function (item) {
  // передаем из цикла ниже один из элементов списка
  var checkbox = item.querySelector('.todo-list-input'); // находим переменную чекбокс
  checkbox.addEventListener('change', function () {
    // ставим обработчик на событие "изменение состояния"
    item.remove(); // удаляем элемент
    toggleEmptyListMessage(); // проверка на длину коллекции для вывода сообщения о пустом списке
  });
};

for (var i = 0; i < items.length; i++) {
  // перебираем в цикле все элементы списка
  addCheckHandler(items[i]); // для каждого элемента списка вызываем функцию, которая следит за изменением состояния чекбокса
}
// на форму повесили событие, отслеживающее "отправку", при нажатии кнопки
newItemForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  console.log('Форма отправилась');
  var taskText = newItemTitle.value; // Записываем в новую переменную содержимое поля ввода
  var task = newItemTemplate.cloneNode(true); // клонируем шаблон и все содержимое(все теги внутри)
  var taskDescription = task.querySelector('span'); // поиск внутри клонированного шаблона span (описание)
  taskDescription.textContent = taskText; // Вставляем значение поля ввода в span, найденный ранее
  addCheckHandler(task); // добавляем вызов функции, чтобы новый элемент мог быть так же удален из списка.
  list.appendChild(task); // вставляем на страницу новый элемент, клон шаблона с информацией введенной в поле ввода ( input)
  toggleEmptyListMessage();
  newItemTitle.value = '';
});
