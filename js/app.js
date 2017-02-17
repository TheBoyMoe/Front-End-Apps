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
		1. add tasks
		2. display tasks as a list
		3. save tasks to local storage
		4. mark tasks as complete
		5. edit tasks
		6. delete tasks
	 */
	
	let taskList = document.getElementById('task-list');
	let inputField = document.getElementById('input-field');
	let add = document.querySelector('.fa-plus');
	add.addEventListener('click', addTask);
	
	function addTask() {
		let task = inputField.value;
		if(task) {
			console.log(`${task}`);
			inputField.value = '';
			displayTask(task);
		}
	}
	
	function displayTask(str) {
		let item = document.createElement('li');
		item.classList.add('task-item');
		//item.innerText = str;
		item.innerHTML = `<input type="checkbox"><p>${str}</p>
				<i class="fa fa-pencil" aria-hidden="true"></i>
				<i class="fa fa-trash" aria-hidden="true"></i>`;
		taskList.appendChild(item);
	}
	
});