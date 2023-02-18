//* select game screens
const gameStart = document.querySelector('.game-start');
const gameScore = document.querySelector('.game-score');
const gameArea = document.querySelector('.game-area');
const gameOver = document.querySelector('.game-over');
const gameStartOver = document.querySelector('.game-start-over');
const gamePoints = document.querySelector('.points');

//* game start listener
gameStart.addEventListener('click', onGameStart);

//* start over listener
gameStartOver.addEventListener('click', () => {
	location.reload();
});

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
	fireInterval: 500,
	cloudSpawnInterval: 3000,
	bugSpawnInterval: 800,
	bugKillBonus: 2000,
};

let scene = {
	score: 0,
	lastCloudSpawn: 0,
	lastBugSpawn: 0,
	isActiveGame: true,
};

//* key handlers
function onKeyDown(e) {
	keys[e.code] = true;
}
function onKeyUp(e) {
	keys[e.code] = false;
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

	//* apply gravitation to wizard
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

	//* register wizard fireball key
	if (keys.Space && timestamp - player.lastTimeFiredFireball > game.fireInterval) {
		wizard.classList.add('wizard-fire');
		addFireball(player);
		player.lastTimeFiredFireball = timestamp;

		isCollision(wizard, wizard);
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

	//* modify clouds position
	let clouds = document.querySelectorAll('.cloud');
	clouds.forEach(cloud => {
		cloud.x -= game.speed;
		cloud.style.left = cloud.x + 'px';

		if (cloud.x + clouds.offsetWidth <= 0) {
			cloud.parentElement.removeChild(cloud);
		}
	});

	//* add bugs
	if (timestamp - scene.lastBugSpawn > game.bugSpawnInterval + 5000 * Math.random()) {
		let bug = document.createElement('div');
		bug.classList.add('bug');
		bug.x = gameArea.offsetWidth - 60;
		bug.style.left = bug.x + 'px';
		bug.style.top = (gameArea.offsetHeight - 60) * Math.random() + 'px';

		gameArea.appendChild(bug);
		scene.lastBugSpawn = timestamp;
	}

	//* modify bugs position
	let bugs = document.querySelectorAll('.bug');
	bugs.forEach(bug => {
		bug.x -= game.speed * 3;
		bug.style.left = bug.x + 'px';

		if (bug.x + bugs.offsetWidth <= 0) {
			bug.parentElement.removeChild(bug);
		}
	});

	//* detect collision - (wizard-bug), (fireball-bug)
	bugs.forEach(bug => {
		if (isCollision(wizard, bug)) {
			gameOverAction();
		}

		fireballs.forEach(fball => {
			if (isCollision(fball, bug)) {
				scene.score += game.bugKillBonus;
				bug.parentElement.removeChild(bug);
				fball.parentElement.removeChild(fball);
			}
		});
	});

	if (scene.isActiveGame) {
		window.requestAnimationFrame(gameAction);
	}
}

//* shoot fireball function
function addFireball(player) {
	let fireball = document.createElement('div');

	fireball.classList.add('fireball');
	fireball.style.top = player.y + player.height / 3 - 5 + 'px';
	fireball.x = player.x + player.width;
	fireball.style.left = fireball.x + 'px';

	gameArea.appendChild(fireball);
}

//* collision detection function
function isCollision(firstElement, secondElement) {
	let firstRect = firstElement.getBoundingClientRect();
	let secondRect = secondElement.getBoundingClientRect();

	return !(
		firstRect.top > secondRect.bottom ||
		firstRect.bottom < secondRect.top ||
		firstRect.right < secondRect.left ||
		firstRect.left > secondRect.right
	);
}

//* game over function
function gameOverAction() {
	scene.isActiveGame = false;
	gameOver.classList.remove('hide');
	gameStartOver.classList.remove('hide');
}
