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
		4. load tasks from storage
		5. mark tasks as complete
		6. edit tasks
		7. delete tasks
	 */
	
	const TASKLIST = 'taskList';
	let taskList = document.getElementById('task-list');
	let inputField = document.getElementById('input-field');
	let checkboxes = document.querySelectorAll('.checkbox');
	let tasks = [];
	let add = document.querySelector('.fa-plus');
	add.addEventListener('click', addTask);
	
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
	}
	
	function buildListItem(str, state) {
		let item = document.createElement('li');
		item.classList.add('task-item');
		item.innerHTML = `<input class="checkbox" type="checkbox"><p>${str}</p>
				<i class="fa fa-pencil" aria-hidden="true"></i>
				<i class="fa fa-trash" aria-hidden="true"></i>`;
		return item;
	}
	
	
});