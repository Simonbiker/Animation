const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
CANVAS_WIDTH = canvas.width = 500;
CANVAS_HEIGHT = canvas.height = 1000;
const numberOfEnemies = 100
const enemiesArray = [];


let gameFrame = 0;

class Enemy {
    constructor() {
        this.image = new Image();
        this.image.src = '/img/enemy1.png'
        // this.speed = Math.random() * 4 - 2;
        this.spriteWidth = 293;
        this.spriteHeiht = 155;
        this.width = this.spriteHeiht / 2.5;
        this.height = this.spriteHeiht / 2.5;
        this.x = Math.random() * (canvas.width - this.width);
        this.y = Math.random() * (canvas.height - this.height);
        this.frame = 0;
        //Math floor is so gameFrame can be divisable by the result
        this.flapSpeed = Math.floor(Math.random() * 3 + 1); 
    }

    update() {
        // Randomising the movement of each sprite
        this.x += Math.random() * 5 - 2.5;
        this.y += Math.random() * 3 - 1.5;
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