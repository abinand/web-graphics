const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext('2d');

const CANVAS_WIDTH = canvas.width = 500
const CANVAS_HEIGHT = canvas.height = 1000;

const numEnemies = 20;
let gameFrame = 0;

const animationData = {
    "jitter" : {
        src: './enemies/enemy1.png',
        totalFrames: 6,
        spriteWidth: 293,
        spriteHeight: 155
    },
    "wave": {
        src: './enemies/enemy2.png',
        totalFrames: 6,
        spriteWidth: 266,
        spriteHeight: 188
    },
    "circular": {
        src: './enemies/enemy3.png',
        totalFrames: 6,
        spriteWidth: 218,
        spriteHeight: 177
    },
    "figure8": {
        src: './enemies/enemy3.png',
        totalFrames: 6,
        spriteWidth: 218,
        spriteHeight: 177
    },
    "patrol": {
        src: './enemies/enemy4.png',
        totalFrames: 9,
        spriteWidth: 213,
        spriteHeight: 213
    }
}

class Utility {
    static RandomBetween(minInclusive, maxInclusive) {
        return Math.floor(Math.random() * (maxInclusive - minInclusive + 1) + minInclusive);
    }
}


class Enemy {
    constructor(animationType) {
        this.image = new Image();
        this.animationType = animationType;
        this.image.src = animationData[this.animationType].src;
        this.spriteWidth = animationData[this.animationType].spriteWidth;
        this.spriteHeight = animationData[this.animationType].spriteHeight;
        //this.x = 0;
        //this.y = 100;
        //this.sizeMultiplier = 1;
        this.sizeMultiplier = 1 / (Math.floor(Math.random() * 5) + 2);
        this.width = this.spriteWidth * this.sizeMultiplier;
        this.height = this.spriteHeight * this.sizeMultiplier;
        this.x = Utility.RandomBetween(0, CANVAS_WIDTH  - this.width);
        this.y = Utility.RandomBetween(0, CANVAS_HEIGHT - this.height);
        this.speed = Utility.RandomBetween(1,3);

        this.waveAngle = Math.random() * 2;

        this.curveSpeed = Math.random() + 1;
        
        this.curveAngle = 0;
        this.curveOffset = Math.random() * 200;
       
        this.middleX = (CANVAS_WIDTH - this.width)/2;
        this.middleY = (CANVAS_HEIGHT - this.height)/2;

        this.newX = Utility.RandomBetween(0, CANVAS_WIDTH - this.width);
        this.newY = Utility.RandomBetween(0, CANVAS_HEIGHT - this.height);
        this.animFrame = 1;
        this.animSpeed = Utility.RandomBetween(2,4);
        this.refreshInterval = Utility.RandomBetween(50, 200);
    }

    update() {
        switch (this.animationType) {
            case 'jitter':
                this.x += Math.random() * 5 - 2.5;
                this.y += Math.random() * 5 - 2.5;
                break;
            case 'wave': 
                this.x -=  this.speed;
                if (this.x < - this.width) {
                    this.x = CANVAS_WIDTH + this.width;
                }
                this.y +=  4 * Math.sin(this.waveAngle);
                this.waveAngle += 0.05;
                break;
            case 'circular':
                this.x = this.curveOffset * Math.sin(this.curveAngle * Math.PI/180) + (CANVAS_WIDTH - this.width)/2
                this.y = this.curveOffset * Math.cos(this.curveAngle * Math.PI/180) + (CANVAS_HEIGHT - this.height)/2;
                this.curveAngle += this.curveSpeed;
                break;
            case 'figure8': 
                this.x = this.middleX * Math.sin(this.curveAngle * Math.PI/90) + this.middleX;
                this.y = this.middleY * Math.cos(this.curveAngle * Math.PI/270) + this.middleY;
                this.curveAngle += this.curveSpeed;
                break;
            case 'patrol':
                if(gameFrame % this.refreshInterval === 0) {
                   this.newX = Utility.RandomBetween(0, CANVAS_WIDTH - this.width);
                   this.newY = Utility.RandomBetween(0, CANVAS_HEIGHT - this.height);
                }
                let dx = this.newX - this.x;
                let dy = this.newY - this.y;
                this.x += dx/70;
                this.y += dy/70;
                break;
        }
        if (gameFrame % this.animSpeed === 0) {
            this.animFrame = (this.animFrame + 1) % animationData[this.animationType].totalFrames;
        }
    }

    draw() {
        ctx.drawImage(this.image, this.animFrame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight,
             this.x, this.y, this.spriteWidth * this.sizeMultiplier, this.spriteHeight * this.sizeMultiplier);
    }
}


const enemies = [];
function resetEnemies(animationType) {
    enemies.length = 0;
    for(let i=0; i<numEnemies; i++) {
        enemies.push(new Enemy(animationType));
    }
}

function animate() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    enemies.forEach(enemy => {
        enemy.update();
        enemy.draw();
    });
    gameFrame = (gameFrame + 1) % 1000000;
    requestAnimationFrame(animate)
}

window.addEventListener("load", function(){
    const animationSelection = this.document.getElementById("anim");
    let animationType = animationSelection.value;

    resetEnemies(animationType);
    animationSelection.addEventListener("change", (event) => {
        let animationType = event.target.value;
        resetEnemies(animationType);
    })
    animate();
})