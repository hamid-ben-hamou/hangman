// crate score
let score = document.getElementById('score');

// stutus of gamer
let status = "";

function countDown() {
	score.innerHTML++;

	if (score.innerHTML === "60") {
		endGame();
		clearInterval(counter);
	}

	// status
	if (score.innerHTML > "10") {
		status = "Very Good";
	}
	if (score.innerHTML > "40"){
		status = "Good";
	} 
	if (score.innerHTML === "59"){
		status = "Bad";
	}
}

let counter = setInterval(countDown, 1000);


if (score.innerHTML > "10") {
	status = "Very Good";
	console.log(status);
} else if (score.innerHTML > "40"){
	status = "Good";
} else if (score.innerHTML === "60"){
	status = "Bad";
}

// all letters
const letters = "abcdefghijklmnopqrstuvwxyz";

// array of letters
let arrletters = Array.from(letters);

// select letters container
let lettersContainer = document.querySelector('.letters');

// generate Letters
arrletters.forEach((letter) => {
	// create span element 
	let span = document.createElement('span');

	// add class to span
	span.className = "letter-box";

	// add text node to span 
	let theLetter = document.createTextNode(letter);

	// append text to span
	span.appendChild(theLetter);

	// append sapn to lettersContainer
	lettersContainer.appendChild(span);
});

// object of words + categories
const words = {
	programming: ["PHP", "Javascript", "go", "scala", "fortran", "r", "mysql", "python"],
	peopel: ["Albert Einstein", "Hitchcock", "Alexander", "Cleopatra", "Mahata Ghandi"],
	countries: ["Syria", "Plaestaine", "Yemen", "Egypt", "Bahrain", "Qatar"],
	jobs: ["Programming", "Architector", "Designer", "Translator"]
}

// Get Random Property
let allKeys = Object.keys(words);

// Randon number Depond on keys length
let randomPropNumber = Math.floor(Math.random() * allKeys.length);

// category
let randomPropName = allKeys[randomPropNumber];

// category words
let randomPropValue = words[randomPropName];

// random Number depend on Words
let randomValueNumber = Math.floor(Math.random() * randomPropValue.length);

// the chosen word
let randomValueIndexes =  randomPropValue[randomValueNumber];

// set category info
document.querySelector('.category span').innerHTML = `${randomPropName}`;

// select letters guess Element
let lettersGuessContainer = document.querySelector('.letters-guess');

// convert the Cheson Word to Array
let lettersAndSpaces = Array.from(randomValueIndexes);

lettersAndSpaces.forEach((lettre) => {
	// create Empty span 
	let emptySpan = document.createElement('span');

	// if the Word has space add class
	if (lettre === " ") {
		emptySpan.className = "has-space";
	}

	// append span to letters Guess Container
	lettersGuessContainer.appendChild(emptySpan);
});

// select guess spans
let guessSpans = document.querySelectorAll('.letters-guess span');

// set Wron Attempts
let wrongAttempts = 0;

// the draw Element
let theDraw = document.querySelector('.the-draw');

// texts of spans
let textSpans = [];

// Handle Clicking on Letters
document.addEventListener("click", (e) => {
	// set The Choose Status
	let theStatus = false;

	if (e.target.className === "letter-box") {
		// add class to letters box
		e.target.classList.add("clicked");

		// get The Clicked Letter 
		let theClickedLetter = e.target.innerHTML.toLowerCase();

		// the cheson word 
		let theChesonWord = Array.from(randomValueIndexes.toLowerCase());

		// compaire the Cheson letter with the Clicked Letter
		theChesonWord.forEach((wordLetter, wordIndex) => {
			if (theClickedLetter === wordLetter) {
				// set Status To Correct
				theStatus = true;

				// loop on All Guess Spans
				guessSpans.forEach((span, spanIndex) => {					
					if (wordIndex === spanIndex) {
						span.innerHTML = wordLetter;
					}

					if (span.innerHTML.length === 1) {
						textSpans.push(span.innerHTML);
					}
				});
			}
		});

		// if letters is wrong
		if (theStatus !== true) {
			// increase The Wrong Attempts
			wrongAttempts++;

			// add class Wrong On the Draw Element
			theDraw.classList.add(`wrong-${wrongAttempts}`);

			// add sound fail
			document.getElementById('fail').play();

			// game over
			if (wrongAttempts === 8) {
				endGame();

				lettersContainer.classList.add("fineshed");
			}
		} else {
			document.getElementById('success').play();
		}

		guessSpans.forEach((e) => {
			if (e.innerHTML.length === 1) {
				textSpans.push(e.innerHTML);
			}
		});

		if (textSpans.slice(-randomValueIndexes.length).join("") === randomValueIndexes.toLowerCase()) {
			youWine();

			lettersContainer.classList.add("fineshed");
		}

	}

});

// function win game
function youWine() {
	// create div
	let div = document.createElement('div');

	// add class to this div
	div.className = "end-game";

	// add box to this div 
	let box = document.createElement('div');

	// add class to box
	box.className = "box";

	// add texts
	let h1 = document.createElement('h1');
	let p = document.createElement('p');
	p.innerHTML = `your Scor is ${score.innerHTML}  and Yor Are ${status}`;
	let textH1 = document.createTextNode('Yoy Wine');

	// add Button repeat agian
	let btn = document.createElement('button');

	// add text to button 
	btn.textContent = "Repeat Again";

	// append all elments
	div.appendChild(box);
	box.append(h1, p,btn);
	h1.appendChild(textH1);
	// p.appendChild(textP);
	document.body.appendChild(div);

	// add event to button

	btn.onclick = function () {
		location.reload();
	}

	// stope score
	clearInterval(counter);
}

// function end Game
function endGame() {
	// create div
	let div = document.createElement('div');

	// add class to this div
	div.className = "end-game";

	// add box to this div 
	let box = document.createElement('div');

	// add class to box
	box.className = "box";

	// add texts
	let h1 = document.createElement('h1');
	let p = document.createElement('p');
	p.innerHTML = `The Word is <span>${randomValueIndexes} </br> your Score: ${score.innerHTML}, and Yor Are ${status}</span>`;
	let textH1 = document.createTextNode('Game Is Over');

	// add Button repeat agian
	let btn = document.createElement('button');

	// add text to button 
	btn.textContent = "Repeat Again";

	// append all elments
	div.appendChild(box);
	box.append(h1, p,btn);
	h1.appendChild(textH1);
	// p.appendChild(textP);
	document.body.appendChild(div);

	// add event to button

	btn.onclick = function () {
		location.reload();
	}
}
