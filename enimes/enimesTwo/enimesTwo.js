const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
CANVAS_WIDTH = canvas.width = 500;
CANVAS_HEIGHT = canvas.height = 1000;
const numberOfEnemies = 20
const enemiesArray = [];


let gameFrame = 0;

class Enemy {
    constructor() {
        this.image = new Image();
        this.image.src = '../../img/enemy2.png'
        this.speed = Math.random() * 4 + 1;
        this.spriteWidth = 266;
        this.spriteHeiht = 188;
        this.width = this.spriteHeiht / 2;
        this.height = this.spriteHeiht / 2;
        this.x = Math.random() * (canvas.width - this.width);
        this.y = Math.random() * (canvas.height - this.height);
        this.frame = 0;
        //Math floor is so gameFrame can be divisable by the result
        this.flapSpeed = Math.floor(Math.random() * 3 + 1); 
        this.angle = 0;
        this.angleSpeed = Math.random() * 0.2;
        this.curve = Math.random() * 7;
    }

    update() {
        // Randomising the movement of each sprite
        this.x -= this.speed;
        this.y += this.curve * Math.sin(this.angle);
        this.angle += 0.05;
        if (this.x + this.width < 0) this.x = canvas.width;
        // Animate sprites
        if (gameFrame % this.flapSpeed === 0) {
         this.frame > 4 ? this.frame = 0 : this.frame++;   
        }
        
    }
    draw() {
        // ctx.strokeRect(this.x, this.y, this.width, this.height)
        ctx.drawImage(this.image, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeiht, this.x, this.y, this.width, this.height)
    }
}

for(let i = 0; i < numberOfEnemies; i++){
    enemiesArray.push(new Enemy())
}



function animate() {
    ctx.clearRect(0,0,CANVAS_WIDTH, CANVAS_HEIGHT);
    enemiesArray.forEach(enemy => {
        enemy.update()
        enemy.draw()
    });
    gameFrame++;
    requestAnimationFrame(animate)
}

animate()