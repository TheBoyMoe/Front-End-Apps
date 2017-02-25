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
			let inputText = inputField.value;
			if(inputText) {
				// TODO
				// 1. create a new task item
				// 2. append to incomplete tasks list
				// 3. bind taskAction events
				// 4. save to localStorage
				
				
				inputField.value = '';
			}
		},
		edit: (e) => {
			console.log('edit task...');
		},
		remove: (e) => {
			console.log('delete task...');
			// 1. remove from list
			let li = e.target.parentNode;
			let ul = li.parentNode;
			ul.removeChild(li);
			
			// TODO 2. remove from storage
			
		},
		incomplete: (e) => {
			console.log('incomplete task...');
			
		},
		complete: (e) => {
			console.log('mark task complete...');
		},
		save: (e) => {
			console.log('save task to storage...');
		},
		load: (e) => {
			console.log('load tasks from storage...');
		}
	};
	
	// add eventListeners
	addTaskBtn.addEventListener('click', taskActions.add);
	
	function bindTaskEvents(listItem, checkBoxEventHandler) {
		let checkbox = listItem.querySelector('input[type=checkbox]');
		let editBtn = listItem.querySelector('i.edit');
		let deleteBtn = listItem.querySelector('i.delete');
		
		// bind task actions to list item events
		checkbox.onchange = checkBoxEventHandler;
		editBtn.onclick = taskActions.edit;
		deleteBtn.onclick = taskActions.remove;
	}
	
	// iterate over the incomplete tasks list binding events to each item in turn
	for(let i = 0; i < incompleteTasksList.children.length; i++) {
		bindTaskEvents(incompleteTasksList.children[i], taskActions.complete);
	}
	
	// iterate over the complete tasks list binding events to each item in turn
	for(let i = 0; i < completeTasksList.children.length; i++) {
		bindTaskEvents(completeTasksList.children[i], taskActions.incomplete);
	}
	
	
	
	
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