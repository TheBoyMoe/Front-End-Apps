document.addEventListener('DOMContentLoaded', function () {
	'use strict';
	
	// reference elements of interest
	const output = document.getElementById('output');
	const input = document.getElementById('input');
	const operations = document.querySelectorAll('.operation');
	const numbers = document.querySelectorAll('.number');
	let display = '';
	
	// calc operation functions
	let calc = {
		addition: () => {
			display += '+';
			updateDisplay(display);
		},
		subtract: () => {
			display += '-';
			updateDisplay(display);
		},
		divide: () => {
			display += '/';
			updateDisplay(display);
		},
		multiply: () => {
			display += '*';
			updateDisplay(display);
		},
		clear: () => {
			display = '';
			updateDisplay(display);
		},
		equals: () => {
			// TODO execute the operation
			console.log(math.eval(display).toPrecision(2));
			// output.textContent = math.eval(display).toPrecision(2);
		},
		back: () => {
			display = display.substring(0, display.length - 1);
			updateDisplay(display);
		}
	};
	
	// bind calc functions to btn elms
	function bindCalcOperation(elm) {
		let dataVal = elm.getAttribute('data-val');
		switch (dataVal) {
			case 'addition':
				elm.onclick = calc.addition;
				break;
			case 'subtract':
				elm.onclick = calc.subtract;
				break;
			case 'multiply':
				elm.onclick = calc.multiply;
				break;
			case 'divide':
				elm.onclick = calc.divide;
				break;
			case 'clear':
				elm.onclick = calc.clear;
				break;
			case 'equals':
				elm.onclick = calc.equals;
				break;
			case 'back':
				elm.onclick = calc.back;
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

