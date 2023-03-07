(function(){
	
	"use strict";
	/* 
	This gets the player: gameData.players[gameData.index]
	This gets the first die: gameData.dice[gameData.roll1-1]
	This gets the second die: gameData.dice[gameData.roll2-1]
	This gets the score of the current player: gameData.score[gameData.index]
	*/
	
	const startGame = document.getElementById('startgame');
	const gameControl = document.getElementById('gamecontrol');
	const game = document.getElementById('game');
	const warning = document.getElementById('warnings')
	const score = document.getElementById('score');
	const actionArea = document.getElementById('actions');
	const instructions = document.getElementById('instructions')
	const button = document.querySelectorAll('button')	
	const audio = new Audio("sounds/high-tec.wav")

	const gameData = {
		dice: ['images/dice1.png', 'images/dice2.png', 'images/dice3.png', 
			   'images/dice4.png', 'images/dice5.png', 'images/dice6.png'],
		players: ['P1', 'P2'],
		score: [0, 0],
		roll1: 0,
		roll2: 0,
		rollSum: 0,
		index: 0,
		gameEnd: 29
	};

	//bg audio
	var audioElement = document.getElementById('bgMusic')

	audioElement.addEventListener("canplay", function(evt) {
		audioElement.volume = ".1";
	}, false);


	//game start
	startGame.addEventListener('click', function () {
		gameData.index = Math.round(Math.random());
		console.log(gameData.index);
		gameControl.innerHTML = '<button id="quit">DISCONNECT</button>';
		instructions.className = 'hidden'
		instructions.innerHTML = ''
		instructions.style.backgroundColor = 'rgba(255, 255, 255, 0)'

		document
			.getElementById('quit').addEventListener('click', function () {
				location.reload();
			});

		setUpTurn();
	});


	// turn setup
	function setUpTurn() {
		game.innerHTML = `<p>${gameData.players[gameData.index]} START</p>`;
		actionArea.innerHTML = '<button id="roll">ROLL</button>';
		instructions.className = 'hidden'
		instructions.innerHTML = ''
		document.getElementById('roll').addEventListener('click', function(){

			throwDice();

		});
	}
	// roll dice
	function throwDice(){
		actionArea.innerHTML = '';
		gameData.roll1 = Math.floor(Math.random() * 6) + 1; //using ceil could result in a zero
		gameData.roll2 = Math.floor(Math.random() * 6) + 1;
		game.innerHTML = `<p>${gameData.players[gameData.index]}</p>`;
		game.innerHTML += `<img src="${gameData.dice[gameData.roll1-1]}"> 
							<img src="${gameData.dice[gameData.roll2-1]}">`;
		gameData.rollSum = gameData.roll1 + gameData.roll2;
		instructions.className = 'hidden'
		instructions.innerHTML = ''


		// if two 1's are rolled...
		if( gameData.rollSum === 2 ){ 
			actionArea.innerHTML += '<p id="warning">ERROR! TWO ONES DETECTED! SHUTTING DOWN!</p>';
			gameData.score[gameData.index] = 0;
			gameData.index ? (gameData.index = 0) : (gameData.index = 1);
			showCurrentScore();
			setTimeout(setUpTurn, 3000);
		}

		// if two 6's are rolled...
		if( gameData.rollSum === 12 ){ 
			actionArea.innerHTML += `<p id="warning">ERROR! TOO MUCH DATA! SWAPPING TO ${
				gameData.players[gameData.index]} </p>`;
			gameData.score[gameData.index] = 0;
			gameData.index ? (gameData.index = 0) : (gameData.index = 1);
			showCurrentScore();
			setTimeout(setUpTurn, 3000);
			}

		// if either die is a 1...
		else if(gameData.roll1 === 1 || gameData.roll2 === 1){ 
			gameData.index ? (gameData.index = 0) : (gameData.index = 1);
			actionArea.innerHTML += `<p id= "warning">WARNING ONE DETECTED, SWAPPING TO ${
				gameData.players[gameData.index]}</p>`;
			setTimeout(setUpTurn, 3000);
		}

		// if neither die is a 1...
		else { 
			gameData.score[gameData.index] = gameData.score[gameData.index] + gameData.rollSum;
			actionArea.innerHTML = '<button id="rollagain">Roll again</button>  <button id="pass">Give Up</button>';

			document.getElementById('rollagain').addEventListener('click', function () {
				//setUpTurn();
				throwDice();
			});

			document.getElementById('pass').addEventListener('click', function () {
				gameData.index ? (gameData.index = 0) : (gameData.index = 1);
				setUpTurn();
			});

			checkWinningCondition();
		}

	}
	// winner check
	function checkWinningCondition() {
		if (gameData.score[gameData.index] > gameData.gameEnd) {
			score.innerHTML = `<h2 id="success">${gameData.players[gameData.index]} 
			SUCCEEDS WITH ${gameData.score[gameData.index]} UNITS</h2>`;
			instructions.className = 'hidden'
			instructions.innerHTML = ''
			actionArea.innerHTML = '';
			document.getElementById('quit').innerHTML = 'NEW GAME';
		} else {
			// show current score...
			showCurrentScore();
		}
	}
	// score
	function showCurrentScore() {
		instructions.className = 'hidden'
		instructions.innerHTML = ''
		score.innerHTML = `<p>${gameData.players[0]}
		<span class="green">${gameData.score[0]}</span><p>`
		score.innerHTML += `<p>${gameData.players[1]} 
		<span class= "green">${gameData.score[1]}</span></p>`
	}
	// button sound
	button.forEach(button => {
		button.addEventListener("click", () => {
		  audio.play();
		});
	  });
}());