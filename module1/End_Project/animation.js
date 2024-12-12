



function animate(character,FrameStats) {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    character.draw(character.characterImg);

    if (gameFrame % FrameStats.staggerFrames=== 0){
        if (frameX < FrameStats.maxFrames) frameX++;
        else frameX = 0;
    }
    gameFrame++;// MOVE TO NEXT FRAME

    requestAnimationFrame(()=>{animate(character,FrameStats)});
}

const OFFSET_X = 0;
const OFFSET_Y = 395;

class Character {
    constructor(characterResource){
        this.x = OFFSET_X;
        this.y = OFFSET_Y;
        this.state = 'Start'
        this.spriteWidth = 128;
        this.spriteHeight = 128;
        this.width = 128*2;
        this.height = 128*2;
        this.speed = 5;
        this.FrameStats = {
            maxFrames: 5,
            staggerFrames: 8
        };
        this.characterImg = new Image();
        this.characterImg.src = characterResource;
        this.direction = "right";
        this.changeDirectionToken = 0;

        this.animationId = undefined;
        this.paddingRight = 60;
        this.paddingLeft = 80;
        this.jumpSpd = 10;
        this.gravity = 10;
        this.isRunning = false;
    }
    /* ------------------------------ HORIZONTAL MOVEMENT ------------------------------*/
    // Function to move the character
    run(units) {
        if (!this.isRunning) return; // Stop if not running
        this.x += units; // Update horizontal position

        if (this.x > CANVAS_WIDTH - this.width+this.paddingRight||this.x < 0 - this.paddingLeft) {
            this.x = this.x - units;
        } else {
            // Continue animation
            this.animationId = requestAnimationFrame(()=>{this.run(units)});
        }


    }

    // Function to start running
    moveRight(units) {
        if (!this.isRunning) {
            this.isRunning = true;
            this.run(units); // Start animation loop
        }
    }

    moveLeft(units) {
        if (!this.isRunning) {
            this.isRunning = true;
            this.run(-units); // Start animation loop
        }
    }

    // Function to stop running
    stopRunning() {
        this.isRunning = false;
        cancelAnimationFrame(this.animationId); // Stop animation loop
    }
    // changeDirection() {
    //     if (this.direction === "left") {
    //         this.characterImg.style.transform =  "scaleX(-1)";
    //         // "rotateY(180deg)";
    //     } else {
    //         this.characterImg.style.transform =  "none";
    //     }
    // }
    // changeDirection(direction) {
    //
    //     if (direction !== this.direction) {
    //         this.direction = direction;
    //         this.changeDirectionToken = 1;
    //     } else {
    //         this.changeDirectionToken = 0;
    //     }
    // }



    draw() {
        if (this.direction === 'left'){
            ctx.save();
            ctx.translate(CANVAS_WIDTH, 0); // Move the origin to the right edge
            ctx.scale(-1, 1); // Flip
            ctx.fillRect(CANVAS_WIDTH - this.width-this.x ,this.y ,this.width ,this.height)
            ctx.drawImage(this.characterImg, frameX*this.spriteWidth , frameY*this.spriteHeight ,this.spriteWidth ,this.spriteHeight,
                CANVAS_WIDTH - this.width- this.x ,this.y ,this.width ,this.height);
            ctx.restore();
        }else{
            ctx.fillRect(this.x ,this.y ,this.width ,this.height)
            ctx.drawImage(this.characterImg, frameX*this.spriteWidth , frameY*this.spriteHeight ,this.spriteWidth ,this.spriteHeight,
                this.x ,this.y ,this.width ,this.height);
        }



    }

    setAnimation() {
        if (this.state === 'start'){
            this.characterImg.src = 'resources/Idle.png';
            animate(this.characterImg,this.FrameStats);

        } else {
            this.characterImg.src = 'resources/' + this.state + '.png';
        }

        switch (this.state) {
            case 'Run':
            case 'Idle':
                this.FrameStats.maxFrames = 5;
                this.FrameStats.staggerFrames = 8;
                break;

            case 'Dead':
                this.FrameStats.maxFrames = 4;
                this.FrameStats.staggerFrames = 20;
                break;
            case 'Shoot':
                this.FrameStats.maxFrames = 3;
                this.FrameStats.staggerFrames = 8;
                break;
            case 'Jump':
                this.FrameStats.maxFrames = 9;
                this.FrameStats.staggerFrames = 20;
                break;
        }
    }

}





const GAME_CANVAS = document.getElementById('background');
const CANVAS_WIDTH = GAME_CANVAS.width;
const CANVAS_HEIGHT = GAME_CANVAS.height;
const BG_WIDTH = 1536;
let frameX  = 0 ;
let frameY = 0;
let gameFrame = 0;



const ctx = GAME_CANVAS.getContext('2d');

const gangsterImg = new Image();
gangsterImg.src = 'resources/Idle.png';

const PLAYER = new Character('resources/Idle.png');
// PLAYER.characterImg.src = 'resources/Run.png';
animate(PLAYER,PLAYER.FrameStats)

/*--------------------------- EVENTS --------------------------------*/
let bodyElement = document.getElementsByTagName("body")[0];
bodyElement.addEventListener("keydown", (event) => {

    switch (event.key) {
        case 'a':
            PLAYER.state = 'Run';
            PLAYER.direction = 'left';
            PLAYER.setAnimation();
            PLAYER.moveLeft(5);
            // PLAYER.changeDirection('left');
            break;
        case 'd':
            PLAYER.state = 'Run';
            PLAYER.direction = 'right';
            PLAYER.setAnimation();
            PLAYER.moveRight(5);
            // console.log(PLAYER.changeDirectionToken);
            // PLAYER.changeDirection('right');
            // console.log(PLAYER.changeDirectionToken);
            break;
        case 'w':
            if (event.key === 'w'){
                if(PLAYER.state !== 'Jump'){
                    PLAYER.state = 'Jump';
                    PLAYER.setAnimation();
                    // PLAYER.jump(event,200);
                    //
                }
            }
            break;
        case 'u':
            PLAYER.state = 'Shoot';
            PLAYER.setAnimation();

    }
});


bodyElement.addEventListener("keyup", (event) => {
    if (event.key === 'a'||event.key === 'd') {
        PLAYER.stopRunning();

    }
    if (PLAYER.state !== 'Jump'){
        // event.stopPropagation();
        PLAYER.state = 'Idle';
        PLAYER.setAnimation();
    }
})



























