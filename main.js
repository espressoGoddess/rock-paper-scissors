var currentGame = new Game;

var astroName = document.querySelector('#astro-name');
var compName = document.querySelector('#comp-name');
var astroWins = document.querySelector('#astro-wins');
var compWins = document.querySelector('#comp-wins');
var astroToken = document.querySelector('#astro-icon');
var compToken = document.querySelector('#comp-icon');
var changeGameButton = document.querySelector('#change-game-button');
var classicGame = document.querySelector('#classic-game');
var spaceGame = document.querySelector('#space-game');
var chooseGame = document.querySelector('#choose-game-section');
var chooseFighterSection = document.querySelector('#choose-fighter-section')
var classicFighters = document.querySelector('#classic-fighter-section');
var spaceFighters = document.querySelector('#space-fighter-section');
var chooseFighterHeader = document.querySelector('#choose-fighter-header');
var choiceIcons = document.querySelectorAll('.choice');
var resultSection = document.querySelector('#result-section');


window.addEventListener('load', function () {
    displayPlayerInfo(currentGame);
})

classicGame.addEventListener('click', function() {
    currentGame.startNewGame('classic');
    hideElement(chooseGame);
    showElement(chooseFighterSection);
    showElement(classicFighters);
    hideElement(spaceFighters);
    showElement(changeGameButton);
    renderPlayerFighterToken();
})

spaceGame.addEventListener('click', function() {
    currentGame.startNewGame('space');
    hideElement(chooseGame);
    showElement(chooseFighterSection);
    showElement(spaceFighters);
    hideElement(classicFighters);
    showElement(changeGameButton);
    renderPlayerFighterToken();
})

changeGameButton.addEventListener('click', function() {
    currentGame.startNewGame(null);
    hideElement(chooseFighterSection);
    showElement(chooseGame);
    hideElement(resultSection);
})

classicFighters.addEventListener('click', function(event) {
    var fighterName = event.target.dataset.classicFighter;
    if(!fighterName) {
        return;
    }
    currentGame.players[0].takeTurn(fighterName, currentGame.classicFighters);
    currentGame.players[1].takeTurn(null, currentGame.classicFighters);
    renderPlayerFighterToken();
    setTimeout(hideElement, 400, chooseFighterSection);
    currentGame.determineWinner();
    displayPlayerInfo(currentGame);
    setTimeout(renderResultsSection, 400);
    setTimeout(hideElement, 2000, resultSection);
    console.log(currentGame)
    setTimeout(function() {
        currentGame.startNewGame("classic")
    }, 1500);
    console.log(currentGame)
    setTimeout(renderPlayerFighterToken, 2000);
    setTimeout(showElement, 2000, chooseFighterSection);
})
function resetGame() {
    currentGame.startNewGame("classic")
}

spaceFighters.addEventListener('click', function(event) {
    var fighterName = event.target.dataset.spaceFighter;
    if(!fighterName) {
        return;
    }
    currentGame.players[0].takeTurn(fighterName, currentGame.spaceFighters);
    currentGame.players[1].takeTurn(null, currentGame.spaceFighters);
    renderPlayerFighterToken();
    setTimeout(hideElement, 400, chooseFighterSection);
    currentGame.determineWinner();
    displayPlayerInfo(currentGame);
    setTimeout(renderResultsSection, 400);
    setTimeout(hideElement, 2000, resultSection);
    setTimeout(function() {
        currentGame.startNewGame("space")
    }, 1500);
    setTimeout(renderPlayerFighterToken, 2000);
    setTimeout(showElement, 2000, chooseFighterSection);
})

function displayPlayerInfo(currentGame) {
    astroName.innerText = currentGame.players[0].name;
    astroWins.innerText = currentGame.players[0].wins;
    astroToken.src = currentGame.players[0].tokenSource;
    astroToken.alt = currentGame.players[0].altText;
    compName.innerText = currentGame.players[1].name;
    compWins.innerText = currentGame.players[1].wins;
    compToken.src = currentGame.players[1].tokenSource;
    compToken.alt = currentGame.players[1].altText;
}

function hideElement(element) {
    element.classList.add('hidden');
}

function showElement(element) {
    element.classList.remove('hidden');
}


function renderPlayerFighterToken() {
    for (var i = 0; i < choiceIcons.length; i++) {
        if (currentGame.players[0].currentFighter) {
            var currentFighter = currentGame.players[0].currentFighter.name;
            var isClassicChoice = choiceIcons[i].dataset.classicChoiceIcon === currentFighter;
            var isSpaceChoice = choiceIcons[i].dataset.spaceChoiceIcon === currentFighter;
            if (currentFighter && (isClassicChoice || isSpaceChoice)) {
                choiceIcons[i].src = currentGame.players[0].tokenSource
                choiceIcons[i].style.opacity = "100";
            }   
        }
        else {
            choiceIcons[i].style.opacity = '0'
        }
    }
}

function renderResultsSection() {
    resultSection.innerHTML ='';
    var winnerTitle;
    if (currentGame.winner === 'draw') {
        winnerTitle = 'Draw!'
    } else {
        winnerTitle = `${currentGame.winner} wins this round!`;
    }
    var player0 = currentGame.players[0]
    var player1 = currentGame.players[1]
    resultSection.innerHTML = `
    <h2 id="won-this-round">${winnerTitle}</h2>
      <div class="fighter-result">
        <img class="large-icon" alt="${player0.currentFighter.altText}" src="${player0.currentFighter.imageSource}">
        <img class="large-icon" alt="${player1.currentFighter.altText}" src="${player1.currentFighter.imageSource}">
      </div>
      <div class="choice-icon-container-2">
        <img class="small-icon" alt="${player0.altText}" src="${player0.tokenSource}">
        <img class="small-icon" alt="${player1.altText}" src="${player1.tokenSource}">
      </div>
          `
      showElement(resultSection);
}