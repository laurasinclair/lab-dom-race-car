window.onload = function () {
	const startButton = document.getElementById('start-button')
	const restartButton = document.getElementById('restart-button')

	startButton.addEventListener('click', function () {
		startGame()
	})



	function startGame() {
		console.log('start game')
   
    const game = new Game();
		game.start();

    document.querySelector('#score').innerHTML = game.score;
    document.querySelector('#lives').innerHTML = game.lives;

    function handleKeydown(event) {
      // console.log('keydown')
      const key = event.key
      const possibleKeystrokes = ['ArrowLeft', 'ArrowUp', 'ArrowRight', 'ArrowDown']
  
      // Check if the pressed key is in the possibleKeystrokes array
      if (possibleKeystrokes.includes(key)) {
        event.preventDefault()
  
        // Update player's directionX and directionY based on the key pressed
        switch (key) {
          case 'ArrowLeft':
            game.player.directionX = -1
            break
          case 'ArrowUp':
            game.player.directionY = -1
            break
          case 'ArrowRight':
            game.player.directionX = 1
            break
          case 'ArrowDown':
            game.player.directionY = 1
            break
        }
      }
    }
  
    // Add the handleKeydown function as an event listener for the keydown event
    window.addEventListener('keydown', handleKeydown)
  }
}