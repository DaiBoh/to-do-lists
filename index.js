let defaultTasks = [
	"Сделать проектную работу",
	"Полить цветы",
	"Пройти туториал по Реакту",
	"Сделать фронт для своего проекта",
	"Прогуляться по улице в солнечный день",
	"Помыть посуду",
];

const todoList = document.querySelector(".to-do__list");
const todoForm = document.querySelector(".to-do__form");
const todoInput = document.querySelector(".to-do__input");

function getSavedTasks() {
	const storedData = localStorage.getItem('tasks');

	if (storedData) {
		return JSON.parse(storedData);
	} else {
		return defaultTasks;
	}
}

function syncTasks() {
	const currentTasks = readTasksFromPage();
	storeTasks(currentTasks);
}

function createTaskElement(taskName) {
	const taskTemplate = document.getElementById("to-do__item-template");
	const taskNode = taskTemplate.content.querySelector(".to-do__item").cloneNode(true);

	const taskLabel = taskNode.querySelector(".to-do__item-text");
	const btnDelete = taskNode.querySelector(".to-do__item-button_type_delete");
	const btnDuplicate = taskNode.querySelector(".to-do__item-button_type_duplicate");
	const btnEdit = taskNode.querySelector(".to-do__item-button_type_edit");

	taskLabel.textContent = taskName;

	// Удаление
	btnDelete.addEventListener('click', function() {
		taskNode.remove();
		syncTasks();
	});

	// Копирование
	btnDuplicate.addEventListener('click', function() {
		const copyText = taskLabel.textContent;
		const taskCopy = createTaskElement(copyText);

		todoList.prepend(taskCopy);
		syncTasks();
	});

	// Редактирование
	btnEdit.addEventListener('click', function() {
		taskLabel.setAttribute('contenteditable', 'true');
		taskLabel.focus();
	});

	taskLabel.addEventListener('blur', function() {
		taskLabel.setAttribute('contenteditable', 'false');
		syncTasks();
	});

	return taskNode;
}

function readTasksFromPage() {
	const taskLabels = document.querySelectorAll(".to-do__item-text");
	const taskList = [];

	taskLabels.forEach(element => {
		taskList.push(element.textContent);
	});

	return taskList;
}

function storeTasks(taskList) {
	localStorage.setItem('tasks', JSON.stringify(taskList));
}

// Инициализация
defaultTasks = getSavedTasks();

defaultTasks.forEach(taskName => {
	const newTask = createTaskElement(taskName);
	todoList.append(newTask);
});

todoForm.addEventListener('submit', function(event) {
	event.preventDefault();

	const inputValue = todoInput.value.trim();

	if (inputValue) {
		const newTask = createTaskElement(inputValue);
		todoList.prepend(newTask);

		syncTasks();
		todoInput.value = '';
	}
});
