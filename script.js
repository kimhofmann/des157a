(function(){

    'use strict';
    console.log('js running')

    const startGame= document.getElementById('startgame')
    const gameControl= document.getElementById('gamecontrol')
    const game = document.getElementById('game')
    const score = document.getElementById('score')
    const actionArea = document.getElementById('actions')

    const gameData = {
        dice: ['1die.jpg', '2die.jpg', '3die.jpg', '4die.jpg', '5die.jpg','6die.jpg' ],
        players: ['player 1', 'player 2'],
        score: [0,0],
        roll1:0,
        roll2:0,
        rollSum:0,
        index:0,
        gameEnd: 29

    }

    startGame.addEventListener('click', function(){
        gameData.index= Math.round(Math.random());
        gameControl.innerHTML='<h2>the game has started</h2>'
        gameControl.innerHTML += '<button id="quit">Wanna quit?</button>'
        document.getElementById('quit').addEventListener('click', function(){
            location.reload();
        });
        //console.log(gameData.index)
        //console.log('set up the turn');
        setUpTurn();
    });

    function setUpTurn(){
        game.innerHTML= `<p>roll the dice for the ${gameData.players[gameData.index]}</p>`;
        actionArea.innerHTML = '<button id="roll">roll the dice</button>';
        document.getElementById('roll').addEventListener('click', function(){
            //console.log('roll the dice!')
            throwDice();
        });
    }

    function throwDice() {
        actionArea.innerHTML = '';
        gameData.roll1= Math.floor(Math.random() * 6 )+ 1;
        gameData.roll2= Math.floor(Math.random() * 6 )+ 1;
        game.innerHTML = `<p>roll the dice for the ${gameData.players[gameData.index]}</p>`
        game.innerHTML += `<img src="${gameData.dice[gameData.roll1-1]}"</img>`
        game.innerHTML += `<img src="${gameData.dice[gameData.roll2-1]}"</img>`
        gameData.rollSum = gameData.roll1 + gameData.roll2;

        if (gameData.rollSum == 2) {
           // console.log('snake eyes')
           game.innerHTML += '<p>oh snap, snake eyes!</p>'
           gameData.score[gameData.index] = 0;
           gameData.index ? (gameData.index = 0) : (gameData.index = 1)
           setTimeout(setUpTurn, 2000);
           showCurrentScore();
        }
        else if (gameData.roll1 == 1 || gameData.roll2 == 1) {
            //console.log('your turn is over')
            gameData.index ? (gameData.index = 0) : (gameData.index = 1)
            game.InnerHTML += `<p>sorry, one of your rolls was a one, switching to ${gameData.players[gameData.index]}</p>`
            setTimeout(setUpTurn, 2000)
        }
        else{
            //console.log('game continues')
            gameData.score[gameData.index] = gameData.score[gameData.index] + gameData.rollSum;
            actionArea.innerHTML = '<button id="rollagain">Roll Again</button> <button id="pass">Pass</button>'

            document.getElementById('rollagain').addEventListener('click', function(){
                setUpTurn();
            })

            document.getElementById('pass').addEventListener('click', function(){
                gameData.index ? (gameData.index = 0) : (gameData.index = 1);
                setUpTurn();
            })

            checkWinningCondition();

        }
    }

    function checkWinningCondition (){
        if (gameData.score[gameData.index] > gameData.gameEnd) {
            score.innerHTML = `<h2>${gameData.players[gameData.index]} wins with ${gameData.score[gameData.index]} points!</h2>`;

            actionArea.innerHTML = '';
            document.getElementById('quit').innerHTML = "Start a new game"
        }

        else {
            // show current score
           showCurrentScore();
        }

    }

    function showCurrentScore () {
        score.innerHTML = `<p> the score is currently <strong>${gameData.players[0]} ${gameData.score[0]}</strong> and <strong>${gameData.players[1]} ${gameData.score[1]}</strong></p>`
    }

})();