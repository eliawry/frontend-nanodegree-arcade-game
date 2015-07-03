// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = (this.x + dt * this.speed) % ctx.canvas.width;
    // If the player is too close to the insect, reset the player location
    if (Math.abs(player.x - this.x) <= 50 && Math.abs(player.y - this.y) <= 50) {
        player.reset();
    }
    this.render();
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = 'images/char-cat-girl.png';
    this.x = 0;
    this.y = 83 * 5 - 42;
};

// Update my position, required method for game
// Parameter: dt, a time delta between ticks
Player.prototype.update = function(dt) {
    this.x = this.x;
    this.y = this.y;
};

// Draw the enemy on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(input) {
    if (input == 'up') {
        this.y = this.y < 83 ? 0: this.y - 83; 
    }     if (input == 'down') {
        this.y = this.y > 291 ? 373: this.y + 83; 
    }     if (input == 'left') {
        this.x = this.x < 101 ? 0: this.x - 101 ; 
    }     if (input == 'right') {
        this.x = this.x > 303 ? 404: this.x + 101; 
    } 
    if (this.y === 0) {
        this.reset();
    }
    this.render();
};

Player.prototype.reset = function() {
    this.x = 0;
    this.y = 83 * 5 - 42;
    this.render();
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [new Enemy(500, 50, 10),
                  new Enemy(400, 150, 20),
                  new Enemy(300, 250, 30)];
var player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});