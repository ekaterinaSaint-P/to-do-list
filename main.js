let form = document.getElementById("addForm");
let itemList = document.getElementById("items");
let filter = document.getElementById("filter");

let tasks = [];

//если в локал сторедж что- то есть и это не null тогда мы это парсим
if (localStorage.getItem("keyTasks")) {
  tasks = JSON.parse(localStorage.getItem("keyTasks"));
}

tasks.forEach(function (item) {
  renderTask(item);
});

// добавление новой задачи
form.addEventListener("submit", addItem);
// удаление элемента
itemList.addEventListener("click", removeItem);
//  поиск по списку
filter.addEventListener("keyup", filterItems);

function renderTask(taskText) {
  //  создаем виртуальный тег Li
  let newTagLi = document.createElement("li");

  //  добавляем класс
  newTagLi.className = "list-group-item";

  //   создаем текст
  let newTextNode = document.createTextNode(taskText);

  //   помещаем текст в тег
  newTagLi.appendChild(newTextNode);

  //   создаем кнопку
  let newBtn = document.createElement("button");
  let newBtnNode = document.createTextNode("Удалить");
  newBtn.appendChild(newBtnNode);

  //  добавляем класс
  newBtn.className = "btn btn-light btn-sm float-right";

  newBtn.dataset.action = "delete";

  // помещаем кнопку в тег
  newTagLi.appendChild(newBtn);

  //   находим список и помещаем в него виртуальнй тег LI

  itemList.prepend(newTagLi);
}

function addItem(event) {
  event.preventDefault();

  let newItemInput = document.getElementById("newItemText");
  let newItemText = newItemInput.value; // текст новой задачи

  renderTask(newItemText);

  // ====== добавляем задачу в массив tasks

  tasks.push(newItemText);
  console.log(tasks);
  // ====== добавляем в localStorage
  localStorage.setItem("keyTasks", JSON.stringify(tasks));

  //   очистить инпут
  newItemInput.value = "";
}

function removeItem(event) {
  if (
    event.target.hasAttribute("data-action") &&
    event.target.getAttribute("data-action") == "delete"
  ) {
    if (confirm("Удалить задачу?")) {
      event.target.parentNode.remove();

      //  если нажал отмена то дальше проверка не идет,
      // если нажали ок= true тогда,
      // данные проходят проверку далее по коду и удаляют из массива

      // Получаем текст задачи которую надо удалить
      const taskText =
        event.target.closest(".list-group-item").firstChild.textContent;

      // Находим индекс задачи в массиве tasks
      const index = tasks.findIndex(function (item) {
        if (taskText === item) {
          return true;
        }
      });

      // Удаляем задачу из массива tasks
      if (index !== -1) {
        tasks.splice(index, 1);
      }

      // Обновляем localStorage
      localStorage.setItem("keyTasks", JSON.stringify(tasks));
    }
  }
}

function filterItems(event) {
  // находим обьект(фразу для поиска) и переводим в нижний регистp toLowerCase
  let searchedText = event.target.value.toLowerCase();

  // получаем список всех задач
  let items = itemList.querySelectorAll("li");

  // перебираем циклом все теги Li с задачами

  items.forEach(function (item) {
    // получаем текст задачи из списка и переводим в нижний регистр
    let itemText = item.firstChild.textContent.toLowerCase();

    // провряем наличие строки- поиску в задаче
    if (itemText.indexOf(searchedText) != -1) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
}
