/*
	References:
	
	examples:
	[1] http://codepen.io/dishantsoni/pen/pgVeQW *
	[2] http://codepen.io/mortyyy/pen/woOQKz
	[3] http://codepen.io/samphree/pen/YNVOxe (show hide complete)
	[4] http://codepen.io/franklynroth/pen/ZYeaBd *
	[5] http://codepen.io/szyszak/pen/pNPXVP
	[6] http://codepen.io/mehra_as/pen/WrMKKr *
	
	articles:
	[1] https://toddmotto.com/attaching-event-handlers-to-dynamically-created-javascript-elements/
	
 */

document.addEventListener('DOMContentLoaded', function () {
	/*
		Features:
		(1. add tasks)
		(2. display tasks as a list)
		(3. save tasks to local storage)
		(4. load tasks from storage)
		5. update task state - checkbox and text strikethrough ?dom traversal
		6. update task text - edit icon
		7. delete tasks - bin icon
	 */
	"use strict";
	const TASKLIST = 'taskList';
	const completeTasksList = document.getElementById('complete-tasks');
	const incompleteTasksList = document.getElementById('incomplete-tasks');
	const inputField = document.getElementById('input-field');
	const addTaskBtn = document.querySelector('.fa-plus');
	
	let tasks = [];
	
	let taskActions = {
		add: (e) => {
			console.log('add task...');
		},
		edit: (e) => {
			console.log('edit task...');
		},
		save: (e) => {
			console.log('save task...');
		},
		remove: (e) => {
			console.log('delete task...');
		},
		load: (e) => {
			console.log('load tasks from storage...');
		},
		incomplete: (e) => {
			console.log('mark task incomplete...');
		},
		complete: (e) => {
			console.log('mark task complete...');
		}
	};
	
	// add eventListeners
	addTaskBtn.addEventListener('click', taskActions.add);
	
	function addTask() {
		let task = inputField.value;
		if(task) {
			console.log(`${task}`);
			inputField.value = '';
			displayTask(buildListItem, task);
			saveTask(task, false);
		}
	}
	
	function displayTask(fn, str) {
		taskList.appendChild(fn(str, false));
	}
	
	function saveTask(str, state) {
		let task = {
			task: str,
			state: state
		};
		tasks.push(task);
		localStorage.setItem(TASKLIST, JSON.stringify(tasks));
	}
	
	function loadTasks(fn) {
		tasks = JSON.parse(localStorage.getItem(TASKLIST));
		if(tasks.length > 0) {
			tasks.forEach(function (obj) {
				taskList.appendChild(fn(obj.task, obj.state));
			})
		}
	}
	
	function buildListItem(str, state) {
		let p = buildText(str);
		let checkbox = buildCheckbox();
		let edit = buildIcon('fa-pencil', editTask);
		let trash = buildIcon('fa-trash', deleteTask);
		let item = document.createElement('li');
		item.classList.add('task-item');
		item.appendChild(checkbox);
		item.appendChild(p);
		item.appendChild(edit);
		item.appendChild(trash);
		return item;
	}
	
	function updateState(e) {
		// grab checkbox state
		let checkbox = e.target;
		if(checkbox.checked) console.log('clicked checkbox');
		
		// TODO update localStorage
		// TODO strikethrough text
		
	}
	
	function buildCheckbox() {
		let checkbox = document.createElement('input');
		checkbox.setAttribute('type', 'checkbox');
		checkbox.classList.add('checkbox');
		checkbox.addEventListener('change', updateState);
		return checkbox;
	}
	
	function buildIcon(type, callback) {
		let icon = document.createElement('i');
		icon.classList.add(['fa'], [type]);
		icon.setAttribute('aria-hidden', 'true');
		icon.addEventListener('click', callback);
		return icon;
	}
	
	function buildText(str) {
		let p = document.createElement('p');
		p.innerText = str;
		return p;
	}

	
});