// Enemies our player must avoid
let Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'enemy-bug.png';
	this.x = 0;
	this.y = 0;
	this.speed = 0;
	
	this.update = function(dt) {
		// ------You should multiply any movement by the dt parameter
		// which will ensure the game runs at the same speed for
		// all computers.
		this.x = this.x + (this.speed * dt);
		if (this.x >= 500){
			this.x = -100;
			this.speed = randomSpeed(120, 270);
		}
	};
};

//----- Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// check Enemy and Player and/or objet are in the same place (Collision)

function checkCollisions(){
	for (let index = 0; index < allEnemies.length; index++) {
		const enemy = allEnemies[index];
		detectCollision(player, enemy);
	}
}

function detectCollision(object1, object2){
	var xDistance = Math.abs(object1.x - object2.x);
	var yDistance = Math.abs(object1.y - object2.y);
	if(xDistance <= 60 && yDistance <= 60){
		player.x=200;
		player.y=400;
	}
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function() {
    this.sprite = 'char-pink-girl.png';
    this.x = 200;
    this.y = 400;
};



Player.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the enemy on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(keyCode) {
    if(keyCode === 'right' && this.x < 400){
		this.x = this.x + 50;
	}
	else if(keyCode === 'left' && this.x > 0){
		this.x = this.x - 50;
	}
	else if(keyCode === 'up'){
		if(this.y > -50){
			this.y = this.y - 50;
		}
		else{
			alert('You won');
			player.x=200;
			player.y=400;
		}
	}
	else if(keyCode === 'down' && this.y < 400){
		this.y = this.y + 50;
	}
};

var player = new Player();
player.x=200;
player.y=400;

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];

var allEnemiesPosition = [60,150,230];

allEnemiesPosition.forEach(function(y){
    var newEnemy = new Enemy();
    newEnemy.x = -100;
    newEnemy.y = y;
	newEnemy.speed = randomSpeed(120, 270);
	allEnemies.push(newEnemy);
})

var extraEnemies =[60, 150, 230];

extraEnemies.forEach(function(y){
	var extraEnemy = new Enemy();
	extraEnemy.x =-300;
	extraEnemy.y = y;
	extraEnemy.speed = randomSpeed(100, 300);
	allEnemies.push(extraEnemy);
})

function randomSpeed(min, max) {
    return Math.random() * (max - min) + min;
}

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
