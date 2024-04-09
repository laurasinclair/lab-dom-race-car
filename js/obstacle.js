class Obstacle {
    constructor(gameScreen) {
        this.gameScreen = gameScreen;
        this.left = Math.floor(Math.random() * 300 + 70);
        this.top = 0;
        this.width = 70;
        this.height = 110;
        
        this.element = document.createElement('img');
        this.element.src = './images/redCar.png';

        this.element.style.position = 'absolute';
        this.element.style.left = `${this.left}px`;
        this.element.style.top = `${this.top}px`;
        this.element.style.border = `10px solid red`;
        this.element.style.width = `${this.width}px`;
        this.element.style.height = `${this.height}px`;

        this.gameScreen.appendChild(this.element);
    }

    updatePosition() {
        this.element.style.left = `${this.left}px`;
        this.element.style.top = `${this.top}px`;
    }

    move() {
        this.top += 3;
        this.updatePosition();
    }
}