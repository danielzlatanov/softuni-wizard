const gameStart = document.querySelector('.game-start');
const gameScore = document.querySelector('.game-score');
const gameArea = document.querySelector('.game-area');
const gameOver = document.querySelector('.game-over');
const gamePoints = document.querySelector('.points');

gameStart.addEventListener('click', onGameStart);
document.addEventListener('keydown', onKeyDown);
document.addEventListener('keyup', onKeyUp);

let keys = {};

let player = {
	x: 150,
	y: 100,
	width: 0,
	height: 0,
};

let game = {
	speed: 3,
	movingMultiplier: 4,
};

let scene = {
	score: 0,
};

function onKeyDown(e) {
	keys[e.code] = true;
	console.log(keys);
}

function onKeyUp(e) {
	keys[e.code] = false;
	console.log(keys);
}

function onGameStart() {
	gameStart.classList.add('hide');

	const wizard = document.createElement('div');
	wizard.classList.add('wizard');
	wizard.style.top = player.y + 'px';
	wizard.style.left = player.x + 'px';
	gameArea.appendChild(wizard);

	player.width = wizard.offsetWidth;
	player.height = wizard.offsetHeight;

	window.requestAnimationFrame(gameAction);
}

function gameAction() {
	const wizard = document.querySelector('.wizard');

	let isInAir = player.y + player.height <= gameArea.offsetHeight;
	if (isInAir) {
		player.y += game.speed;
	}

	if ((keys.ArrowUp || keys.KeyW) && player.y > 0) {
		player.y -= game.speed * game.movingMultiplier;
	}
	if (
		(keys.ArrowDown || keys.KeyS) &&
		player.y + player.height < gameArea.offsetHeight &&
		isInAir
	) {
		player.y += game.speed * game.movingMultiplier;
	}
	if ((keys.ArrowLeft || keys.KeyA) && player.x > 0) {
		player.x -= game.speed * game.movingMultiplier;
	}
	if ((keys.ArrowRight || keys.KeyD) && player.x + player.width < gameArea.offsetWidth) {
		player.x += game.speed * game.movingMultiplier;
	}

	wizard.style.top = player.y + 'px';
	wizard.style.left = player.x + 'px';

	scene.score++;
	gamePoints.textContent = scene.score;

	window.requestAnimationFrame(gameAction);
}
