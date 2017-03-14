document.addEventListener('DOMContentLoaded', function () {
	'use strict';
	
	// reference elements of interest
	const output = document.getElementById('output');
	const input = document.getElementById('input');
	const operations = document.querySelectorAll('.operation');
	const numbers = document.querySelectorAll('.number');
	let display = '';
	
	// calc functions
	let task = {
		addition: (e) => {
			display += '+';
			updateDisplay(display);
		},
		subtract: (e) => {
			display += '-';
			updateDisplay(display);
		},
		divide: (e) => {
			display += '/';
			updateDisplay(display);
		},
		multiply: (e) => {
			display += '*';
			updateDisplay(display);
		},
		clear: (e) => {
			display = '';
			updateDisplay(display);
		},
		equals: (e) => {
			// TODO execute the operation
		},
		back: (e) => {
			display = display.substring(0, display.length - 1);
			updateDisplay(display);
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
		display += e.target.getAttribute('data-val');
		updateDisplay(display);
	}
	
	function updateDisplay(val) {
		input.textContent = output.textContent = val;
	}
	
	function displayResult(val) {
		output.textContent = val;
	}
	
});

