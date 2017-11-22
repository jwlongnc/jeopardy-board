var columns = document.querySelectorAll('.column');
var cats = [];
var headers = document.querySelectorAll('.header');
var doubleJeopardy = false;
var subtractMode = false;

columns.forEach(function(column) {
	cats.push(column.querySelectorAll('.cat'));
});

console.log(cats);

cats.forEach(function(group) {
	group.forEach(function(cat) {
		cat.addEventListener('click', function() {
			var column = cat.parentElement;
			adjustScore(column, parseInt(cat.textContent));
		})
	})
});

document.addEventListener('keydown', function(e) {
	if (e.keyCode === 68) {
		toggleDoubleJeopardy();
	} else if (e.keyCode === 83) {
		toggleSubtract();
	}
});

headers.forEach(function(header) {
	header.addEventListener('click', function() {
		var how;
		while (how !== "add" && how !== "subtract") {
			how = prompt("add or subtract?");
		}
		var amount = parseInt(prompt("how much"));
		var display = this.querySelector('h1');
		var score = parseInt(display.textContent);
		if (how === "add") {
			score += amount;
		} else {
			score -= amount;
		}
		display.textContent = score.toString();
	});
});

function adjustScore(column, adjustmnet) {
	var scoreDisplay = column.querySelector('.header').querySelector('h1');
	var score = parseInt(scoreDisplay.textContent);
	if (subtractMode) {
		score -= adjustmnet;
	} else {
		score += adjustmnet;
	}
	scoreDisplay.textContent = score.toString();
}

function toggleDoubleJeopardy() {
	var factor = doubleJeopardy ? 0.5 : 2;
	cats.forEach(function(group) {
		group.forEach(function(cat) {
			var display = cat.querySelector('h3');
			var score = parseInt(display.textContent) * factor;
			display.textContent = score.toString();
		});
	});
	doubleJeopardy = !doubleJeopardy;
}

function toggleSubtract() {
	subtractMode = !subtractMode;
	cats.forEach(function(group) {
		group.forEach(function(cat) {
			var display = cat.querySelector('h3');
			if (subtractMode) {
				display.setAttribute('id', 'subtract');
			} else {
				display.removeAttribute('id');
			}
		});
	});
}