//* select game screens
const gameStart = document.querySelector('.game-start');
const gameScore = document.querySelector('.game-score');
const gameArea = document.querySelector('.game-area');
const gameOver = document.querySelector('.game-over');
const gamePoints = document.querySelector('.points');

//* game start listener
gameStart.addEventListener('click', onGameStart);

//* global key listeners
document.addEventListener('keydown', onKeyDown);
document.addEventListener('keyup', onKeyUp);

let keys = {};

let player = {
	x: 150,
	y: 100,
	width: 0,
	height: 0,
	lastTimeFiredFireball: 0,
};

let game = {
	speed: 3,
	movingMultiplier: 4,
	fireballMultiplier: 5,
	fireInterval: 300,
};

let scene = {
	score: 0,
};

//* key handlers
function onKeyDown(e) {
	keys[e.code] = true;
	console.log(keys);
}
function onKeyUp(e) {
	keys[e.code] = false;
	console.log(keys);
}

//* game start function
function onGameStart() {
	gameStart.classList.add('hide');

	//* render wizard
	const wizard = document.createElement('div');
	wizard.classList.add('wizard');
	wizard.style.top = player.y + 'px';
	wizard.style.left = player.x + 'px';
	gameArea.appendChild(wizard);

	player.width = wizard.offsetWidth;
	player.height = wizard.offsetHeight;

	//* game infinite loop
	window.requestAnimationFrame(gameAction);
}

//* game loop function
function gameAction(timestamp) {
	const wizard = document.querySelector('.wizard');

	console.log(timestamp);
	//* apply gravitation
	let isInAir = player.y + player.height <= gameArea.offsetHeight;
	if (isInAir) {
		player.y += game.speed;
	}

	//* register user input
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

	//* wizard fireball key
	if (keys.Space && timestamp - player.lastTimeFiredFireball > game.fireInterval) {
		wizard.classList.add('wizard-fire');
		addFireball(player);
		player.lastTimeFiredFireball = timestamp;
	} else {
		wizard.classList.remove('wizard-fire');
	}

	//* modify fireball position
	let fireballs = document.querySelectorAll('.fireball');
	fireballs.forEach(fball => {
		fball.x += game.speed * game.fireballMultiplier;
		fball.style.left = fball.x + 'px';

		if (fball.x + fball.offsetWidth > gameArea.offsetWidth) {
			fball.parentElement.removeChild(fball);
		}
	});

	//* apply wizard's movement
	wizard.style.top = player.y + 'px';
	wizard.style.left = player.x + 'px';

	//* increment and apply score count
	scene.score++;
	gamePoints.textContent = scene.score;

	window.requestAnimationFrame(gameAction);
}

function addFireball(player) {
	let fireball = document.createElement('div');

	fireball.classList.add('fireball');
	fireball.style.top = player.y + player.height / 3 - 5 + 'px';
	fireball.x = player.x + player.width;
	fireball.style.left = fireball.x + 'px';

	gameArea.appendChild(fireball);
}
