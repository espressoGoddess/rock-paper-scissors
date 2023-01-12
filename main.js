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

window.addEventListener('load', function () {
    displayPlayerInfo(currentGame)
})

classicGame.addEventListener('click', function() {
    currentGame.startNewGame('classic');
    hideElement(chooseGame);
    showElement(chooseFighterSection);
    showElement(classicFighters);
    hideElement(spaceFighters);
    showElement(changeGameButton);
})

spaceGame.addEventListener('click', function() {
    currentGame.startNewGame('space');
    hideElement(chooseGame);
    showElement(chooseFighterSection);
    showElement(spaceFighters);
    hideElement(classicFighters);
    showElement(changeGameButton);

})

changeGameButton.addEventListener('click', function() {
    currentGame.startNewGame();
    console.log(currentGame)
    hideElement(chooseFighterSection);
    showElement(chooseGame);
})

classicFighters.addEventListener('click', function(event) {
    var currentFighter = event.target.dataset.classicFighter;
    currentGame.players[0].fighter = currentFighter;
    setTimeout(hideElement, 200, classicFighters);
})

spaceFighters.addEventListener('click', function(event) {
    var currentFighter = event.target.dataset.spaceFighter;
    currentGame.players[0].fighter = currentFighter;
    console.log(currentGame.players[0].fighter)
    setTimeout(hideElement, 200, spaceFighters);
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
