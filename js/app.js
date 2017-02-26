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
	const completedTasksList = document.getElementById('completed-tasks');
	const incompleteTasksList = document.getElementById('incomplete-tasks');
	const inputField = document.getElementById('input-field');
	const addTaskBtn = document.querySelector('.fa-plus');
	
	let tasks = [];
	
	let taskActions = {
		add: (e) => {
			console.log('add task...');
			let inputText = inputField.value;
			if(inputText) {
				// create task, append to incompleteTask list and bind task actions
				let li = createNewTaskItem(inputText);
				incompleteTasksList.appendChild(li);
				bindTaskEvents(li, taskActions.complete);
				inputField.value = '';
				
				// TODO save to localStorage
				
			}
		},
		edit: (e) => {
			console.log('edit task...');
			let btn = e.target;
			let li = btn.parentNode;
			let input = li.querySelector('input[type=text]');
			let label = li.querySelector('label');
			if(li.classList.contains('edit-mode')) {
				label.textContent = input.value;
				btn.classList.remove('fa-save');
				btn.classList.add('fa-pencil');
			} else {
				input.value = label.textContent;
				btn.classList.remove('fa-pencil');
				btn.classList.add('fa-save');
			}
			li.classList.toggle('edit-mode');
			
			// TODO update localStorage
		},
		remove: (e) => {
			console.log('delete task...');
			// 1. remove from list
			let li = e.target.parentNode;
			let ul = li.parentNode;
			ul.removeChild(li);
			
			// TODO remove from storage
			
		},
		incomplete: (e) => {
			console.log('incomplete task...');
			// grab the checkbox's parent, append it to the incomplete list and
			// bind the action to be performed is onchange is called
			let li = e.target.parentNode;
			incompleteTasksList.appendChild(li);
			bindTaskEvents(li, taskActions.complete);
			
			// TODO update item status in storage
			
		},
		complete: (e) => {
			console.log('mark task complete...');
			let li = e.target.parentNode;
			completedTasksList.appendChild(li);
			bindTaskEvents(li, taskActions.incomplete)
			
			// TODO update item status in storage
		},
		save: (e) => {
			console.log('save task to storage...');
			// create obj - task & state
			// save to localStorage
		},
		load: (e) => {
			console.log('load tasks from storage...');
			
			// read localStorage
			// iterate through obj list
			// populate complete/incomplete lists based on task state
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
	for(let i = 0; i < completedTasksList.children.length; i++) {
		bindTaskEvents(completedTasksList.children[i], taskActions.incomplete);
	}
	
	function createNewTaskItem(text) {
		let li = document.createElement('li');
		let checkbox = document.createElement('input');
		let span = document.createElement('span');
		let editBtn = createButton('fa-pencil', 'edit');
		let deleteBtn = createButton('fa-trash', 'delete');
		
		checkbox.type = 'checkbox';
		span.textContent = text;
		
		li.appendChild(checkbox);
		li.appendChild(span);
		li.appendChild(editBtn);
		li.appendChild(deleteBtn);
		
		return li;
	}
	
	function createButton(className, role) {
		let icon = document.createElement('i');
		icon.classList.add(['fa'], [className], [role]);
		icon.setAttribute('aria-hiddden', 'type');
		return icon;
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
	
	// function buildIcon(type, callback) {
	// 	let icon = document.createElement('i');
	// 	icon.classList.add(['fa'], [type]);
	// 	icon.setAttribute('aria-hidden', 'true');
	// 	icon.addEventListener('click', callback);
	// 	return icon;
	// }
	
	function buildText(str) {
		let p = document.createElement('p');
		p.innerText = str;
		return p;
	}

	
});