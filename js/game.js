class Game {
	constructor() {
		this.startScreen = document.querySelector('#game-intro')
		this.gameScreen = document.querySelector('#game-screen')
		this.gameEndScreen = document.querySelector('#game-end')
		// this.player = new Player(this.gameScreen, this.left, this.top, './images/car.png');
		this.player = new Player(this.gameScreen, 200, 500, 70, 110, './images/car.png')
		this.height = 600
		this.width = 600
		this.obstacles = []
		this.score = 0
		this.lives = 3
		this.gameIsOver = false
		this.gameIntervalId = null
		this.gameLoopFrequency = Math.round(1000 / 60)
		// this.gameLoopFrequency = 1000
	}

	start() {
		console.log('game has started!')
		this.gameScreen.style.height = `${this.height}px`
		this.gameScreen.style.width = `${this.width}px`
		this.gameScreen.style.display = 'block'
		this.startScreen.style.display = 'none'
		this.gameIntervalId = setInterval(() => {
			this.gameLoop()
		}, this.gameLoopFrequency)

		// let obstacle = new Obstacle(this.gameScreen)
	}

	gameLoop() {
		this.update()

		if (this.gameIsOver) {
			clearInterval(this.gameIntervalId)
		}
	}

	update() {
		this.player.move()

		// Check for collision and if an obstacle is still on the screen
		for (let i = 0; i < this.obstacles.length; i++) {
			const obstacle = this.obstacles[i]
			obstacle.move()

			// If the player's car collides with an obstacle
			if (this.player.didCollide(obstacle)) {
				// Remove the obstacle element from the DOM
				obstacle.element.remove()
				// Remove obstacle object from the array
				this.obstacles.splice(i, 1)
				// Reduce player's lives by 1
				this.lives--
				// Update the counter variable to account for the removed obstacle
				i--
			} // If the obstacle is off the screen (at the bottom)
			else if (obstacle.top > this.height) {
				// Increase the score by 1
				this.score++
				// Remove the obstacle from the DOM
				obstacle.element.remove()
				// Remove obstacle object from the array
				this.obstacles.splice(i, 1)
				// Update the counter variable to account for the removed obstacle
				i--
			}
		}

        document.querySelector('#score').innerHTML = this.score;
        document.querySelector('#lives').innerHTML = this.lives;

		// If the lives are 0, end the game
		if (this.lives === 0) {
			this.endGame()
		}

		// Create a new obstacle based on a random probability
		// when there is no other obstacles on the screen
		if (Math.random() > 0.98 && this.obstacles.length < 1) {
			this.obstacles.push(new Obstacle(this.gameScreen))
		}
	}

	// Create a new method responsible for ending the game
	endGame() {
		this.player.element.remove()
		this.obstacles.forEach((obstacle) => obstacle.element.remove())

		this.gameIsOver = true

		// Hide game screen
		this.gameScreen.style.display = 'none'
		// Show end game screen
		this.gameEndScreen.style.display = 'block'
	}
}
