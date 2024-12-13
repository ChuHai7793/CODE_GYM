
let health = 100;

function updateHealth(value) {


        health = Math.max(0, Math.min(100, health + value));
        const healthBar = document.getElementById('health-bar');
        healthBar.style.width = `${health}%`;

        if (health > 50) {
            healthBar.style.backgroundColor = '#4caf50';
        } else if (health > 20) {
            healthBar.style.backgroundColor = '#ffc107';
        } else {
            healthBar.style.backgroundColor = '#f44336';
        }

    // } else {
    //     setTimeout(()=>{invulnerableFLAG = false}, 2000);
    // }

}


function isColliding(obj1, obj2) {
    return (
        obj1.x_hitbox < obj2.x_hitbox + obj2.width_hitbox &&
        obj1.x_hitbox + obj1.width_hitbox > obj2.x_hitbox &&
        obj1.y_hitbox < obj2.y_hitbox + obj2.height_hitbox &&
        obj1.y_hitbox + obj1.height_hitbox > obj2.y_hitbox
    );
}


let invulnerableFLAG  = false;
let enemyRemoveList = [];
function animate(character,enemyList,FrameStats) {

    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    character.draw(character.characterImg);


    /*------------------ ENEMY ---------------------------*/
    if (enemyRemoveList.length === enemyList.length){
        enemyRemoveList = [];
        for ( let enemy of enemyList){
            enemy.reset();
        }
    }

    for ( let enemy of enemyList) {

        if (enemyRemoveList.indexOf(enemy) < 0){
            enemy.update();
            enemy.draw();
            if (enemy.y > CANVAS_HEIGHT - enemy.height||
                enemy.x < 0 ) {
                enemyRemoveList.push(enemy);

                // TEMPORARY SET HITBOX OF ENEMY TO PREVENT COLLISION
                enemy.x_hitbox = 0;
                enemy.y_hitbox = 0;
                enemy.width_hitbox = 0;
                enemy.height_hitbox = 0;
            }
        }
        if (isColliding(enemy,character)){
            // alert(enemy.x_hitbox + ','+enemy.y_hitbox+ ','+enemy.width_hitbox+ ','+enemy.height_hitbox
            //     + '\n'+character.x_hitbox + ','+character.y_hitbox+ ','+character.width_hitbox+ ','+character.height_hitbox );

            if (invulnerableFLAG === false) {
                updateHealth(-10);
                invulnerableFLAG = true;
            } else {
                setTimeout(()=>{invulnerableFLAG = false;},2000)
            }

            if (health <= 0) {
                character.state = 'Dead';
                character.setAnimation();
            }
        }
    }



    if (gameFrame % FrameStats.staggerFrames=== 0){

        if (frameX < FrameStats.maxFrames ) {
            frameX++;
        } else {
            if (character.state !== 'Dead'){
                frameX = 0;
            } else {

            }

        }
        gameFrame = 0;
    }


    gameFrame++;// MOVE TO NEXT FRAME



    requestAnimationFrame(()=>{animate(character,enemyList,FrameStats)});
}


class Enemy {
    constructor(EnemyImg,x,y,width,height,spriteWidth,spriteHeight,speed,angle) {

        this.EnemyImg = EnemyImg;
        // this.x = Math.random() * CANVAS_WIDTH;
        // this.y = Math.random() * CANVAS_HEIGHT;
        this.x_reset = x;
        this.y_reset = y;
        this.x = x; // Position x on the canvas
        this.y = y; // Position y on the canvas
        this.width = width; // size of enemy object
        this.height = height;
        this.spriteWidth = spriteWidth;
        this.spriteHeight = spriteHeight;


        this.speed = speed; // the magnitude of vector for enemy movement
        this.angle = angle* Math.PI / 180; // angle for the speed vector

        this.frame = 0; // used to slide through sprite for animation
    }

    reset(){
        this.x = this.x_reset;
        this.y = this.y_reset;
    }

    update() {
        this.x += this.speed*Math.cos(this.angle);
        this.y += this.speed*Math.sin(this.angle);
        this.x_hitbox = this.x;
        this.y_hitbox = this.y;
        this.width_hitbox = this.width;
        this.height_hitbox = this.height;
        // SLOW DOWN ANIMATION
        if (gameFrame % 4=== 0){
            this.frame > 4 ? this.frame = 0 : this.frame++ ;
        }
    }

    draw(){

        ctx.strokeRect(this.x_hitbox,this.y_hitbox,this.width_hitbox,this.height_hitbox);
        ctx.drawImage(this.EnemyImg,this.frame *this.spriteWidth,0,this.spriteWidth,this.spriteHeight,this.x,this.y,this.width,this.height);
    }
}

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
        this.maxJumpHeight = 200;

        this.animationId = undefined;
        this.paddingRight = 60;
        this.paddingLeft = 80;
        this.jumpSpd = 10;
        this.gravity = 10;
        this.isRunning = false;

        // Initialize hit box
        // this.x_hitbox;
        // this.y_hitbox ;
        // this.width_hitbox = this.width;
        // this.height_hitbox = this.height;
    }
    /* ------------------------------ HORIZONTAL MOVEMENT ------------------------------*/
    // Function to move the character
    run(units) {
        if (!this.isRunning) return; // Stop if not running
        this.x += units; // Update horizontal position

        if (this.x > CANVAS_WIDTH - this.width + this.paddingRight||this.x < 0 - this.paddingLeft) {
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

    /* ------------------------------ VERTICAL MOVEMENT ------------------------------*/
    onAirCheck(){
        return this.y < OFFSET_Y
    }

    moveUp(units) {
        this.y -= units;

    }

    jump(event){
        if (this.onAirCheck()===false){
            const interval = setInterval(() => {
                if (this.y > this.maxJumpHeight) {
                    this.moveUp(this.jumpSpd);
                } else {
                    clearInterval(interval);
                    this.fall()
                }
            }, 20);
        }

    }

    fall() {
        const interval = setInterval(() => {
            if (this.onAirCheck()) {
                this.moveUp(-this.gravity);
            } else {
                clearInterval(interval);

                // When there is no other events then set to idle
                if (this.isRunning){
                    this.state = 'Run';
                } else {
                    this.state = 'Idle';
                }

                this.setAnimation();
            }
        },20)
    }


    /* -----------------------*/
    draw() {
        if (this.direction === 'left'){
            ctx.save();
            ctx.translate(CANVAS_WIDTH, 0); // Move the origin to the right edge
            ctx.scale(-1, 1); // Flip

            this.x_hitbox = CANVAS_WIDTH - this.width-this.x + 100;
            this.y_hitbox = this.y + 130;
            this.width_hitbox = this.width - 200;
            this.height_hitbox = this.height - 100;
            ctx.strokeRect(this.x_hitbox  ,this.y_hitbox  ,this.width_hitbox ,this.height_hitbox)

            ctx.drawImage(this.characterImg, frameX*this.spriteWidth , frameY*this.spriteHeight ,this.spriteWidth ,this.spriteHeight,
                CANVAS_WIDTH - this.width- this.x ,this.y ,this.width ,this.height);

            // RESTORE HITBOX COORDINATE
            ctx.restore();
            this.x_hitbox = this.x + 100;
            this.y_hitbox = this.y +130;
            this.width_hitbox = this.width - 200;
            this.height_hitbox = this.height -100;

        }else{

            this.x_hitbox = this.x + 100;
            this.y_hitbox = this.y +130;
            this.width_hitbox = this.width - 200;
            this.height_hitbox = this.height -100;
            ctx.strokeRect(this.x_hitbox ,this.y_hitbox , this.width_hitbox,this.height_hitbox)


            ctx.drawImage(this.characterImg, frameX*this.spriteWidth , frameY*this.spriteHeight ,
                        this.spriteWidth ,this.spriteHeight,
                        this.x ,this.y ,this.width ,this.height);
        }
    }

    setAnimation() {
        if (this.state === 'start'){
            this.characterImg.src = 'resources/Idle.png';

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




/*---------------- MAIN INITIALIZATION --------------------*/

const OFFSET_X = 0;
const OFFSET_Y = 425;
const GAME_CANVAS = document.getElementById('background');
const ctx = GAME_CANVAS.getContext('2d');
const CANVAS_WIDTH = GAME_CANVAS.width;
const CANVAS_HEIGHT = GAME_CANVAS.height;


let frameX  = 0 ;
let frameY = 0;
let gameFrame = 0;


/*---------------- ENEMY INITIALIZATION --------------------*/


function generateEnemy(){
    let enemyList = []

    const Enemy1_Img = new Image();
    Enemy1_Img.src = 'resources/enemy/enemy1.png';
    const ENEMY1_NUMBER = 3;
    for (let i=1; i<= ENEMY1_NUMBER;i++){
        enemyList.push(new Enemy(Enemy1_Img,0,0,100,80,
            293,155,Math.random()*4+3,Math.random()*90));
    }


    const Enemy2_Img = new Image();
    Enemy2_Img.src = 'resources/enemy/enemy2.png';
    const ENEMY2_NUMBER = 3;
    for (let i=1; i<= ENEMY2_NUMBER;i++){
        enemyList.push(new Enemy(Enemy2_Img,CANVAS_WIDTH,0,100,80,
            266,160,Math.random()*3+3,90+Math.random()*90));
    }

    return enemyList
}

let enemyList = generateEnemy();





/*---------------- PLAYER INITIALIZATION --------------------*/
const gangsterImg = new Image();
gangsterImg.src = 'resources/Idle.png';

const PLAYER = new Character('resources/Idle.png');
// PLAYER.characterImg.src = 'resources/Run.png';
animate(PLAYER,enemyList,PLAYER.FrameStats)

// const PLAYER2 = new Character('resources/Idle.png');
// animate(PLAYER2,PLAYER2.FrameStats)






/*--------------------------- EVENTS --------------------------------*/
// let isEventInProgress = false;
//
//
// async function handleEvent(event,func) {
//     if (isEventInProgress) {
//         console.log('Event ignored: already in progress');
//         return;
//     }
//
//     isEventInProgress = true; // Set flag to indicate the event is in progress
//     console.log('Event started');
//
//     try {
//         // Simulate async operation
//         await new Promise((resolve) => {
//             setTimeout(resolve, 2000)
//         }); // Wait 2 seconds
//         console.log('Event completed');
//     } catch (error) {
//         console.error('Error during event handling:', error);
//     } finally {
//         isEventInProgress = false; // Reset flag
//     }
// }

let bodyElement = document.getElementsByTagName("body")[0];
bodyElement.addEventListener("keydown", (event) => {

    switch (event.key) {
        case 'z':
            PLAYER.state = 'Run';
            PLAYER.direction = 'left';
            PLAYER.setAnimation();
            PLAYER.moveLeft(5);
            break;
        case 'c':
            PLAYER.state = 'Run';
            PLAYER.direction = 'right';
            PLAYER.setAnimation();
            PLAYER.moveRight(5);
            break;
        case 's':
            if (event.key === 's'){
                if(PLAYER.state !== 'Jump'){
                    PLAYER.state = 'Jump';
                    PLAYER.setAnimation();
                    PLAYER.jump(event);
                }
            }
            break;
        case 'u':
            PLAYER.state = 'Shoot';
            PLAYER.setAnimation();
    }
});


bodyElement.addEventListener("keyup", (event) => {


    if ((event.key === 'z'||event.key === 'c')){
        // if (currentKey!=='s' && currentKey !== event.key){
        //
        // }
        // console.log(currentKey);
        // console.log(event.key );
        // console.log(PLAYER.state);
        // if (event.key === currentKey){
        //     PLAYER.stopRunning();
        // }
        PLAYER.stopRunning();


    }

    if (PLAYER.state !== 'Jump'){
        // event.stopPropagation();
        PLAYER.state = 'Idle';
        PLAYER.setAnimation();
    }
})


























