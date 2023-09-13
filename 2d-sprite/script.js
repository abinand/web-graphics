const canvas = document.querySelector("#canvas1");
const ctx = canvas.getContext("2d");

const CANVAS_WIDTH = canvas.width = 600;
const CANVAS_HEIGHT = canvas.height = 600;

const playerImage = new Image();
playerImage.src = "./shadow_dog.png";
const spriteWidth = 575;
const spriteHeight = 523;
const staggerFrames = 5;


/*
* ***** Iteration 1 *********
function animate() {
    ctx.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);

    //ctx.drawImage(playerImage, 0, 0); -- usage 1
    //ctx.drawImage(playerImage, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT); -- usage 2
    //ctx.drawImage(playerImage, sx, sy, sw, sh, dy, dy, dw, dh); // -- usage 3 s = source to clip from image and d = destination in canvas

    ctx.drawImage(playerImage, 0, 0, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight);
    requestAnimationFrame(animate);
}
animate();
*/

/*
 ***** Iteration 2 *********
let frameX = 0;
let frameY = 0;
let gameFrame = 0;
function animate() {
    ctx.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
    ctx.drawImage(playerImage, frameX * spriteWidth, frameY * spriteHeight, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight);

    if(gameFrame % staggerFrames === 0) 
    {
        frameX = (frameX + 1) % 6; // cycle the number of sprites in first row
    }
    gameFrame++;
    requestAnimationFrame(animate);
}
animate();
*/

/*
 ****** Iteration 3 ******/
let frameX = 0;
let frameY = 0;
let gameFrame = 0;
function animate() {
    ctx.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);

    let position = Math.floor(gameFrame / staggerFrames) % 6;
    frameX = spriteWidth * position;
    ctx.drawImage(playerImage, frameX, frameY * spriteHeight, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight);

    gameFrame++;
    requestAnimationFrame(animate);
}

animate();