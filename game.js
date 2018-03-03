var columns = document.querySelectorAll('.column');
var cats = [];
var headers = document.querySelectorAll('.header');
var doubleJeopardy = false;
var subtractMode = false;

columns.forEach(function(column) {
	cats.push(column.querySelectorAll('.cat'));
});

console.log(cats);

// Add a click event listener to each cell.
cats.forEach(function(group) {
	group.forEach(function(cat) {
		cat.addEventListener('click', function() {
			var column = cat.parentElement;
			adjustScore(column, parseInt(cat.textContent));
		})
	})
});

// Listen for key press events.
// D Key: Toggle Double Jeopardy
// S Key: Toggle Subtract mode
document.addEventListener('keydown', function(e) {
	if (e.keyCode === 68) {
		toggleDoubleJeopardy();
	} else if (e.keyCode === 83) {
		toggleSubtract();
	}
});

// Add a click event listener to each header.
// This will be used for manual score updates.
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

// Add the score to the proper player
function adjustScore(column, adjustmnet) {
	// Grab the score cell from this column of the board, and parse the current score.
	var scoreDisplay = column.querySelector('.header').querySelector('h1');
	var score = parseInt(scoreDisplay.textContent);

	// Handle the arithmetic.
	if (subtractMode) {
		score -= adjustmnet;
	} else {
		score += adjustmnet;
	}

	// Update the score display.
	scoreDisplay.textContent = score.toString();
}

// Switch between single and double jeopardy.
function toggleDoubleJeopardy() {
	// Determine the factor depending on if we are switching from double
	// to single jeopardy, or single to double jeopardy.
	var factor = doubleJeopardy ? 0.5 : 2;

	// Multiply every point value in the table by the factor.
	cats.forEach(function(group) {
		group.forEach(function(cat) {
			var display = cat.querySelector('h3');
			var score = parseInt(display.textContent) * factor;
			display.textContent = score.toString();
		});
	});

	// Invert the double jeopardy flag.
	doubleJeopardy = !doubleJeopardy;
}

// Switch between normal and subtract mode.
function toggleSubtract() {
	// Invert the subtract mode flag.
	subtractMode = !subtractMode;

	// Swap the subtract id to give text the proper color.
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