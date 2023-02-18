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
	cloudSpawnInterval: 3000,
};

let scene = {
	score: 0,
	lastCloudSpawn: 0,
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

	//* apply gravitation
	let isInAir = player.y + player.height <= gameArea.offsetHeight;
	if (isInAir) {
		player.y += game.speed;
	}

	let keyDownBoundary = player.y + player.height < gameArea.offsetHeight;
	let keyRightBoundary = player.x + player.width < gameArea.offsetWidth;

	//* register user input
	if ((keys.ArrowUp || keys.KeyW) && player.y > 0) {
		player.y -= game.speed * game.movingMultiplier;
	}
	if ((keys.ArrowDown || keys.KeyS) && keyDownBoundary && isInAir) {
		player.y += game.speed * game.movingMultiplier;
	}
	if ((keys.ArrowLeft || keys.KeyA) && player.x > 0) {
		player.x -= game.speed * game.movingMultiplier;
	}
	if ((keys.ArrowRight || keys.KeyD) && keyRightBoundary) {
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

	//* increment and apply score count
	scene.score++;
	gamePoints.textContent = scene.score;

	//* apply wizard's movement
	wizard.style.top = player.y + 'px';
	wizard.style.left = player.x + 'px';

	//* modify fireball position
	let fireballs = document.querySelectorAll('.fireball');
	fireballs.forEach(fball => {
		fball.x += game.speed * game.fireballMultiplier;
		fball.style.left = fball.x + 'px';

		if (fball.x + fball.offsetWidth > gameArea.offsetWidth) {
			fball.parentElement.removeChild(fball);
		}
	});

	//* add clouds
	if (timestamp - scene.lastCloudSpawn > game.cloudSpawnInterval + 20000 * Math.random()) {
		let cloud = document.createElement('div');
		cloud.classList.add('cloud');
		cloud.x = gameArea.offsetWidth - 200;
		cloud.style.left = cloud.x + 'px';
		cloud.style.top = (gameArea.offsetHeight - 200) * Math.random() + 'px';
		gameArea.appendChild(cloud);
		scene.lastCloudSpawn = timestamp;
	}

	//* modify cloud position
	let clouds = document.querySelectorAll('.cloud');
	clouds.forEach(cloud => {
		cloud.x -= game.speed;
		cloud.style.left = cloud.x + 'px';

		if (cloud.x + clouds.offsetWidth <= 0) {
			cloud.parentElement.removeChild(cloud);
		}
	});

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
