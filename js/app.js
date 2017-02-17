/*
	References:
	
	examples:
	[1] http://codepen.io/dishantsoni/pen/pgVeQW *
	[2] http://codepen.io/mortyyy/pen/woOQKz
	[3] http://codepen.io/samphree/pen/YNVOxe (show hide complete)
	[4] http://codepen.io/franklynroth/pen/ZYeaBd *
	[5] http://codepen.io/szyszak/pen/pNPXVP
	[6] http://codepen.io/mehra_as/pen/WrMKKr *
	
	
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
	
	const TASKLIST = 'taskList';
	let taskList = document.getElementById('task-list');
	let inputField = document.getElementById('input-field');
	let tasks = [];
	let add = document.querySelector('.fa-plus');
	add.addEventListener('click', addTask);
	//let checkboxes;
	
	
	// load any tasks already in local storage
	loadTasks(buildListItem);
	
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
		// checkboxes = document.querySelectorAll('.checkbox');
		// console.log(`number checkboxes ${checkboxes.length}`);
		// checkboxes.forEach(function (checkbox, i) {
		// 	checkbox.addEventListener('change', updateState);
		// 	// update text - dom traversal
		// });
		
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
	
	function deleteTask(e) {
		// TODO update storage and display
		console.log('Clicked on trash');
	}
	
	function editTask(e) {
		// TODO update storage and display
		console.log('Clicked on edit');
	}
	
	
});