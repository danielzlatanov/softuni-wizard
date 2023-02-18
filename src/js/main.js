const gameStart = document.querySelector('.game-start');
const gameScore = document.querySelector('.game-score');
const gameArea = document.querySelector('.game-area');
const gameOver = document.querySelector('.game-over');

gameStart.addEventListener('click', onGameStart);
document.addEventListener('keydown', onKeyDown);
document.addEventListener('keyup', onKeyUp);

let keys = {};

function onKeyDown(e) {
	keys[e.code] = true;
	console.log(keys);
}
function onKeyUp(e) {
	keys[e.code] = false;
	console.log(keys);
}

function gameAction() {
	console.log('loop');
	window.requestAnimationFrame(gameAction);
}

function onGameStart() {
    gameStart.classList.add('hide');
    
	const wizard = document.createElement('div');
	wizard.classList.add('wizard');
	wizard.style.top = '200px';
	wizard.style.left = '200px';
    gameArea.appendChild(wizard);
    
	window.requestAnimationFrame(gameAction);
}
