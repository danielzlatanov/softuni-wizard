const gameStart = document.querySelector('.game-start');
const gameScore = document.querySelector('.game-score');
const gameArea = document.querySelector('.game-area');
const gameOver = document.querySelector('.game-over');

gameStart.addEventListener('click', onGameStart);
document.addEventListener('keydown', onKeyDown);
document.addEventListener('keyup', onKeyUp);

let keys = {};
let player = {
	x: 150,
	y: 100,
};
let game = {
	speed: 5,
};

function onKeyDown(e) {
	keys[e.code] = true;
	console.log(keys);
}

function onKeyUp(e) {
	keys[e.code] = false;
	console.log(keys);
}

function gameAction() {
	const wizard = document.querySelector('.wizard');

	if (keys.ArrowUp || keys.KeyW) {
		player.y -= game.speed;
	}
	if (keys.ArrowDown || keys.KeyS) {
		player.y += game.speed;
	}
	if (keys.ArrowLeft || keys.KeyA) {
		player.x -= game.speed;
	}
	if (keys.ArrowRight || keys.KeyD) {
		player.x += game.speed;
	}

	wizard.style.top = player.y + 'px';
	wizard.style.left = player.x + 'px';

	window.requestAnimationFrame(gameAction);
}

function onGameStart() {
	gameStart.classList.add('hide');

	const wizard = document.createElement('div');
	wizard.classList.add('wizard');
	wizard.style.top = player.y + 'px';
	wizard.style.left = player.x + 'px';
	gameArea.appendChild(wizard);

	window.requestAnimationFrame(gameAction);
}
