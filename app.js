var colors = ["green", "yellow", "red", "blue"]
var gameLogArray = [];
var playerInputArray = [];
var levelNo = 0;

//Anykey listener
var gameStarted;

$(document).keydown(function (e) {
    if (gameStarted === true) {
        //TODO: Implement game already running.
    } else {
        $(document).off("keydown")
        startGame();
    }
    //console.log(e.originalEvent)
})

function startGame() {
    $('body').removeClass('game-over');
    $('.container').removeClass('hidden');
    $('button').addClass('hidden');
    $('#gotext').remove();
    gameStarted = true;
    gameLogArray = [];
    playerInputArray = [];
    levelNo = 1;
    levelDeploy(levelNo);
}

function levelDeploy(levelNo) {
    titleChange("Level " + levelNo);
    gameArrayGenerator();
    buttonAnimator(gameLogArray[gameLogArray.length - 1]);
    buttonListener();
    arraysLog();

}

function gameArrayGenerator() {
    var random4 = Math.floor(Math.random() * 4);
    gameLogArray.push(random4);
    arraysLog();
}

function buttonListener() {
    $(".btn").click(function (e) {
        e = e.target.id
        if (playerInputArray < gameLogArray) {
            playerInputArray.push(colors.indexOf(e))
            buttonAnimator(e);
            arrayChecker();
        }
    })

}

function arrayChecker() {
    if (playerInputArray[playerInputArray.length - 1] !== gameLogArray[playerInputArray.length - 1]) {
        $(".btn").off("click")
        killTheGame();
    } else if (playerInputArray < gameLogArray) {
        arraysLog();
    } else {
        $(".btn").off("click")
        nextLevel();
    }
}

function playerInput(e) {
    if (playerInputArray < gameLogArray) {
        playerInputArray.push(colors.indexOf(e))
        buttonAnimator(e);
    }

}

function killTheGame() {
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    $('#level-title').after('<h1 id="gotext">Game Over</h1>')
    $('body').addClass('game-over');
    $('.container').addClass('hidden');
    $('button').removeClass('hidden');
    //alert("Game Killed");
}

function nextLevel() {
    setTimeout(function () {
        playerInputArray = [];
        levelNo++;
        levelDeploy(levelNo);
    }, 250);

    //alert("Next Level")
}


//Shortcuts
function titleChange(title) {
    $("#level-title").text(title)
}


function buttonAnimator(color) {
    if (color === 0 || color === 1 || color === 2 || color === 3) {
        switch (color) {
            case 0:
                color = "green";
                break;
            case 1:
                color = "yellow";
                break;
            case 2:
                color = "red";
                break;
            case 3:
                color = "blue";
                break;
        }
    }
    $(".btn." + color).addClass("pressed");
    var audio = new Audio("sounds/" + color + ".mp3");
    audio.play();
    setTimeout(function () {
        $(".btn." + color).removeClass("pressed")
    }, 100);
}

function arraysLog() {
    console.log("gameArray: " + gameLogArray + "||| playerArray: " + playerInputArray);
}