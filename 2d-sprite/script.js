const canvas = document.querySelector("#canvas1");
const ctx = canvas.getContext("2d");

const CANVAS_WIDTH = canvas.width = 600;
const CANVAS_HEIGHT = canvas.height = 600;

const playerImage = new Image();
playerImage.src = "./shadow_dog.png";
const spriteWidth = 575;
const spriteHeight = 523;

const staggerFrames = 4;
let gameFrame = 0;

/* ***** Iteration 1 *********/
/*
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

/********  Iteration 2 ********/
/* 
let frameX = 0;
let frameY = 0;
function animate() {
    ctx.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);

    let position = Math.floor(gameFrame / staggerFrames) % 6;
    frameX = spriteWidth * position;
    ctx.drawImage(playerImage, frameX, frameY * spriteHeight, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight);

    gameFrame++;
    requestAnimationFrame(animate);
}

animate();
*/

const animationStates = [
    {
        name: "idle",
        frames: 7
    },
    {
        name: "jump",
        frames: 7
    },
    {
        name: "fall",
        frames: 7
    },
    {
        name: "run",
        frames: 9
    },
    {
        name: "dizzy",
        frames: 11
    },
    {
        name: "sit",
        frames: 5
    },
    {
        name: "roll",
        frames: 7
    },
    {
        name: "bite",
        frames: 7
    },
    {
        name: "ko",
        frames: 12
    },
    {
        name: "getHit",
        frames: 4
    }

];
const spriteAnimations = [];
animationStates.forEach((state, index) => {
    let frameLocations = {
        loc: []
    }
    for(let j=0; j<state.frames; j++) {
        let positionX = j * spriteWidth;
        let positionY = index * spriteHeight;
        frameLocations.loc.push({x: positionX, y: positionY});
    }

    spriteAnimations[state.name] = frameLocations;
});

let playerState = "idle";
document.getElementById("animations").addEventListener("change", (e) => {
    playerState = e.target.value;
})

function animate() {
    ctx.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
    let position = Math.floor(gameFrame/staggerFrames) % spriteAnimations[playerState].loc.length;
    let frameX = spriteAnimations[playerState].loc[position].x;
    let frameY = spriteAnimations[playerState].loc[position].y;
    ctx.drawImage(playerImage, frameX, frameY, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight);
    gameFrame = (gameFrame + 1) % 1000000;

    requestAnimationFrame(animate);
}
animate();
