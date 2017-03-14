document.addEventListener('DOMContentLoaded', function () {
	'use strict';
	
	// reference elements of interest
	const output = document.getElementById('output');
	const input = document.getElementById('input');
	const operations = document.querySelectorAll('.operation');
	const numbers = document.querySelectorAll('.number');
	
	
	// calc functions
	let task = {
		addition: (e) => {
			console.log(`clicked addition`);
		},
		subtract: (e) => {
			console.log(`clicked subtract`);
		},
		divide: (e) => {
			console.log(`clicked divide`);
		},
		multiply: (e) => {
			console.log(`clicked multiply`);
		},
		clear: (e) => {
			console.log(`clicked clear`);
		},
		equals: (e) => {
			console.log(`clicked equals`);
		},
		back: (e) => {
			console.log(`backspace`);
		}
	};
	
	// bind calc functions to btn elms
	function bindCalcOperation(elm) {
		let dataVal = elm.getAttribute('data-val');
		switch (dataVal) {
			case 'addition':
				elm.onclick = task.addition;
				break;
			case 'subtract':
				elm.onclick = task.subtract;
				break;
			case 'multiply':
				elm.onclick = task.multiply;
				break;
			case 'divide':
				elm.onclick = task.divide;
				break;
			case 'clear':
				elm.onclick = task.clear;
				break;
			case 'equals':
				elm.onclick = task.equals;
				break;
			case 'back':
				elm.onclick = task.back;
				break;
		}
	}
	
	// iterate over elm arrays and bind operations
	operations.forEach(function(elm) {
		bindCalcOperation(elm);
	});
	
	numbers.forEach(function (elm) {
		elm.addEventListener('click', numberClick);
	});
	
	function numberClick(e) {
		let val = e.target.getAttribute('data-val');
		input.textContent = val;
		output.textContent = val;
	}
	
});

