import { animateLoop} from "./animation.js";

console.log(window.innerWidth);
// const gangsterCanvas = document.getElementById('gangsterCanvas');
// const ctx = gangsterCanvas.getContext('2d');
// const CANVAS_WIDTH = gangsterCanvas.width = 128;
// const CANVAS_HEIGHT = gangsterCanvas.height = 128;
//
//
//
// const spriteWidth = 128;
// const spriteHeight = 128;
// let frameX  = 0 ;
// let frameY = 0;
// let gameFrame = 0;

const gangsterImg = new Image();
// gangsterImg.src = 'resources/Idle.png';
// animate(gangsterImg,5,8)

// gangsterImg.src = 'Gangsters_1/Dead.png';
// animate(gangsterImg,4,20)

// gangsterImg.src = 'Gangsters_1/Shot.png';
// animate(gangsterImg,3,8)

// gangsterImg.src = 'resources/Run.png';
// animate(gangsterImg,5,8)


const GANGSTER_WIDTH = 128;
const GANGSTER_HEIGHT = 128;
class Character {
    constructor(characterId, x, y, state) {
        this.x = x;
        this.y = y;
        this.character = document.getElementById(characterId);
        this.state = state;
        this.direction = "right";
        this.characterImg = new Image();
        this.FrameStats = {
            maxFrames: 5,
            staggerFrames: 8
        };
        this.jumpSpd = 10;
        this.gravity = 10;
        this.paddingX = 140;
        this.animationId = undefined;
        this.isRunning = false;

        this.character.style.top = y + "px";
        this.character.style.left = x + "px";
    }

    /* ------------------------------ HORIZONTAL MOVEMENT ------------------------------*/
    // Function to move the character
     run(units) {
        if (!this.isRunning) return; // Stop if not running
        this.x += units; // Update horizontal position

         if (this.x > window.innerWidth - this.character.width - this.paddingX) {
             this.x = this.x - units ;
             this.character.style.left = this.x + "px"; // Apply new position
         }else{
             this.character.style.left = this.x + "px"; // Apply new position
             this.animationId = requestAnimationFrame(()=>{this.run(units)}); // Continue animation
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



    /* ------------------------------ VERTICAL MOVEMENT ------------------------------*/

    moveUp(units) {
        this.y -= units;
        this.character.style.top = this.y+ "px";
    }

    jump(event,maxHeight,originalHeight){
        const interval = setInterval(() => {
            if (this.y > maxHeight) {
                this.moveUp(this.jumpSpd);
            } else {
                clearInterval(interval);
                this.fall(originalHeight)
            }
        }, 20);
    }

    fall(originalHeight) {
        const interval = setInterval(() => {
            if (this.y < originalHeight) {
                this.moveUp(-this.gravity);
            } else {
                clearInterval(interval);
                this.state = 'Idle';
                this.setAnimation();
            }
        },20)
    }

    changeDirection() {
        if (this.direction === "left") {
            this.character.style.transform =  "rotateY(180deg)";
        } else {
            this.character.style.transform =  "none";
        }
    }

    setAnimation() {
        if (this.state === 'start'){
            this.characterImg.src = 'resources/Idle.png';
            animateLoop(this.characterImg,this.FrameStats);
        // } else if (this.state === 'jump'){
        //     this.characterImg.src = 'resources/' + this.state + '.png';
        //     drawFrame(this.characterImg,frameX)
        } else {
            this.characterImg.src = 'resources/' + this.state + '.png';
        }
        // console.log(this.FrameStats);
        switch (this.state) {
            case 'Idle':
                this.FrameStats.maxFrames = 5;
                this.FrameStats.staggerFrames = 8;
                // cancelAnimationFrame(this.animationId);
                // this.animationId = requestAnimationFrame(()=>{animateLoop(this.characterImg,5,8)});
                // animateLoop(this.characterImg,5,8);
                break;
            case 'Run':

                break;
            case 'Dead':
                this.FrameStats.maxFrames = 4;
                this.FrameStats.staggerFrames = 20;
                break;
            case 'Shot':
                this.FrameStats.maxFrames = 3;
                this.FrameStats.staggerFrames = 8;
                break;
            case 'Jump':
                PLAYER.FrameStats.maxFrames = 9;
                PLAYER.FrameStats.staggerFrames = 20;

                break;
        }
    }

}



const OFFSET_X = 0;
const OFFSET_Y = 435;
let PLAYER = new Character('gangsterCanvas',OFFSET_X,OFFSET_Y,'Idle');
console.log(PLAYER.character.width )
PLAYER.state = 'start';
PLAYER.setAnimation();



/*--------------------------- EVENTS --------------------------------*/
let bodyElement = document.getElementsByTagName("body")[0];
bodyElement.addEventListener("keydown", (event) => {
    console.log(event.key);

    switch (event.key) {
        case 'a':
            PLAYER.state = 'Run';
            PLAYER.setAnimation();
            PLAYER.moveLeft(5);
            PLAYER.direction = 'left';
            PLAYER.changeDirection();
            break;
        case 'd':
            PLAYER.state = 'Run';
            PLAYER.setAnimation();
            PLAYER.moveRight(5);
            PLAYER.direction = 'right';
            PLAYER.changeDirection();
            break;
        case 'w':
            if (event.key === 'w'){
                if(PLAYER.state !== 'Jump'){
                    PLAYER.state = 'Jump';
                    PLAYER.setAnimation();
                    PLAYER.jump(event,200,OFFSET_Y);
                }
            }

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

































