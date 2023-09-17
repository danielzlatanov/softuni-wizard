# SoftUni Wizard Game

**Play the game online:** [SoftUni Wizard Game](https://danielzlatanov.github.io/softuni-wizard/)

## Description

"SoftUni Wizard" is an engaging JavaScript web-based game that invites you to embark on an adventure as a wizard. In this world, you'll shoot fireballs, tackle challenges, conquer creatures, and earn points. Plus, it's a fantastic opportunity to enhance your coding skills as you play!

## Table of Contents

-   [How to Play](#how-to-play)
-   [Key Features](#key-features)
-   [Game Mechanics](#game-mechanics)
-   [Game Screens](#game-screens-and-elements)

## How to Play

-   Use the `arrow keys` or `WASD` to control the wizard's movement.
-   Press the `spacebar` to shoot fireballs at bugs.
-   Avoid colliding with bugs to stay alive.
-   Earn extra points by shooting bugs with fireballs.
-   The game ends when you collide with a bug, and your score will be displayed.

## Key Features

-   Detailed graphics and animations.
-   Realistic sky background with moving clouds.
-   Challenging bug enemies with collision detection.
-   Score tracking and display.
-   Smooth character movement and fireball shooting.

### Player and Game Settings

Key variables define player and game settings:

-   `player`: Contains properties like position and fireball cooldown.
-   `game`: Includes parameters like speed, multipliers, intervals, and bonuses.
-   `scene`: Tracks the game's score and other scene-related details.

## Game Mechanics

The game logic is written in JavaScript and controls various aspects of the game, including player movement, fireball shooting, scoring, enemy generation, and collision detection.

-   **Game Loop:** The project utilizes a game loop to handle game logic and rendering. This loop continuously updates and renders game elements, providing dynamic gameplay.

-   **Player Control:** Players control a wizard character using keyboard input. They can move the wizard up, down, left, and right using the Arrow keys or WASD.

-   **Fireball Shooting:** Pressing the Spacebar enables the wizard to shoot fireballs, which travel horizontally across the screen. Fireballs play a crucial role in the game.

-   **Obstacle Spawning:** Throughout gameplay, clouds and bugs are periodically spawned. These objects act as obstacles that players must navigate or interact with.

-   **Collision Detection:** The game incorporates collision detection to determine when game elements interact. For example:
    -   When the wizard collides with a bug, the game registers a collision event, triggering specific actions.
    -   Fireballs hitting bugs also trigger collision events, resulting in points awarded to the player and the removal of the bug from the screen.

**These game mechanics combine to create an engaging and challenging experience.**

### Game Screens and Elements

The game logic identifies different game screens and elements using DOM selectors. These include:

-   `gameControlsInfo`: Information about game controls.
-   `gameStart`: The initial game start screen.
-   `gameArea`: The main game area.
-   `gameScore`: Display for the player's score.
-   `gamePoints`: Display for the player's points.
-   `gameOver`: The game over screen.
-   `gameStartOver`: The option to start over.

### Key Event Listeners

-   Event listeners are set up for keydown and keyup events to handle player input. These events control player movement and fireball shooting.

### Game Start Function

-   The `onGameStart` function initializes the game when the player clicks the start button. It renders the wizard character and sets up the game loop.

### Game Loop Function

-   The `gameAction` function serves as the game's main loop. It manages player movement, fireball shooting, scoring, and various game elements like clouds and bugs. The game continuously updates based on player input and the passage of time.

### Fireball Shooting

-   The `addFireball` function is responsible for creating and launching fireballs when the player presses the spacebar. Fireballs move across the screen and can be used to interact with game elements.

### Game Over Function

-   The `gameOverAction` function is triggered when the game ends. It stops the game loop and displays the game over screen, allowing the player to start over.

**For more details on each component of the game logic and how they work together, refer to the corresponding sections in the code.**
