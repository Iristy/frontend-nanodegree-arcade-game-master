// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = 101 * x;
    this.y = 83 * y;
    this.speed = 10 + Math.random()*100;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + dt * this.speed;
    if (this.hasCollidedWith(player)) {
        resetGame();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.hasCollidedWith = function(player) {
    if (Math.abs(this.x - player.x) < 42 && this.y == player.y) {
        return true;
    }
    return false;
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(x, y) {
    this.sprite = 'images/char-boy.png';
    this.x = 101 * x;
    this.y = 83 * y;
};

Player.prototype.update = function(dt) {
    if (this.isWin()) {
        alert("You Won!");
        resetGame();
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(direction) {
    switch (direction) {
        case 'left':
            if (this.x > 0) {
                this.x -= 101;
            }
            break;
        case 'up':
            if (this.y > 0) {
                this.y -= 83;
            }
            break;
        case 'right':
            if (this.x < 404) {
                this.x += 101;
            }
            break;
        case 'down':
            if (this.y < 350) {
                this.y += 83;
            }
            break;
    }
}

Player.prototype.isWin = function() {
    if (this.y < 40) {
        return true;
    }
    return false;
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [];

var player;
window.setInterval((evt) => {
    const y = Math.floor(Math.random() * 3) + 0.5;
    allEnemies.push(new Enemy(0, y));
}, 3000);

function resetGame() {
    allEnemies = [];
    allEnemies.push(new Enemy(0, 0.5));
    allEnemies.push(new Enemy(0, 1.5));
    allEnemies.push(new Enemy(0, 2.5));
    player = new Player(2, 4.5);
}

resetGame();

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
