const gangsterCanvas = document.getElementById('gangsterCanvas');
const ctx = gangsterCanvas.getContext('2d');
const CANVAS_WIDTH = gangsterCanvas.width = 128;
const CANVAS_HEIGHT = gangsterCanvas.height = 128;



const spriteWidth = 128;
const spriteHeight = 128;
let frameX  = 0 ;
let frameY = 0;
let gameFrame = 0;




export function animate(img,maxFrames,staggerFrames) {
    // maxFrames = 5: if there are 6 frames in 1 sprite => FIX BLINKING ISSUE DUE TO SHOWING EMPTY FRAMES
    // maxFrames is changed to suit each sprite

    // staggerFrames = 8;// To slow down animation

    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    ctx.drawImage(img, frameX*spriteWidth, frameY*spriteHeight,spriteWidth,spriteHeight,
        0,0,spriteWidth,spriteHeight);


    if (gameFrame % staggerFrames=== 0){
        if (frameX < maxFrames) frameX++;
        else frameX = 0;
    }


    gameFrame++;// MOVE TO NEXT FRAME
    requestAnimationFrame(()=>{animate(img,maxFrames,staggerFrames)});
}


////////////////////////// TEST /////////////////////////////////
const gangsterImg = new Image();
// gangsterImg.src = 'Gangsters_1/Idle.png';
// animate(gangsterImg,5,8)

// gangsterImg.src = 'Gangsters_1/Dead.png';
// animate(gangsterImg,4,20)

// gangsterImg.src = 'Gangsters_1/Shot.png';
// animate(gangsterImg,3,8)
