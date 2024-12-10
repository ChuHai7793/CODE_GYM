import {animate} from "./animation.js";


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
gangsterImg.src = 'Gangsters_1/Idle.png';
animate(gangsterImg,5,8)

// gangsterImg.src = 'Gangsters_1/Dead.png';
// animate(gangsterImg,4,20)

// gangsterImg.src = 'Gangsters_1/Shot.png';
// animate(gangsterImg,3,8)















// class Character {
//     constructor(characterId,x,y,status) {
//         this.x = x;
//         this.y = y;
//         this.character = document.getElementById(characterId);
//         this.status = status;
//         this.direction = "right"
//
//         this.character.style.top = y+"px";
//         this.character.style.left = x+ "px";
//     }
//
//     setAnimation(){
//         this.character.src = "Gangsters_1/gif/"+this.status+".gif";
//         console.log(this.character.src);
//     }
//
//     moveRight(units) {
//         this.x += units;
//         this.character.style.left = this.x+ "px";
//
//     }
//
//     moveLeft(units) {
//         this.x -= units;
//         this.character.style.left = this.x+ "px";
//
//     }
//
//     changeDirection() {
//         if (this.direction === "left") {
//             this.character.style.transform =  "rotateY(180deg)";
//         } else {
//             this.character.style.transform =  "none";
//         }
//     }
//
// }
// const SCREEN_HEIGHT = 600;
// let player = new Character('player',0,SCREEN_HEIGHT,'Idle');
//
// player.status = 'Idle';
// player.setAnimation();
// console.log(player.character);
// console.log(player.x);
//
// // player.moveRight(700);
//
// let bodyElement = document.getElementsByTagName("body")[0];
// bodyElement.addEventListener("keypress", (event) => {
//     console.log(event.key);
//     if (event.key === 'a') {
//         player.status = 'Run';
//         player.setAnimation();
//         player.direction = 'left';
//         player.changeDirection();
//
//
//         player.moveLeft(1);
//     } else if (event.key === 'd') {
//         player.status = 'Run';
//         player.setAnimation();
//         player.moveRight(1);
//         player.direction = 'right';
//         player.changeDirection();
//     }
// });
// console.log(player.character);
// console.log(bodyElement);



//
// player.style.left = "0px";

























