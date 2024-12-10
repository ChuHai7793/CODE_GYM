//
// function GameBoard(width, height){
//     this.width = width;
//     this.height = height;
// }
//



function Bar(canvas,width,height,x,y){
    this.canvas = canvas;
    this.x = x; // TOP LEFT POINT
    this.y = y;



    this.canvas.style.width = width+'px';
    this.canvas.style.height = height+'px';
    this.canvas.style.left = x+'px';
    this.canvas.style.top = y+'px';


    this.moveLeft = function(units){
        this.x -= units
        this.canvas.style.left = this.x +'px';
    };

    this.moveRight = function(units){
        this.x += units;
        this.canvas.style.left = this.x +'px';
    };
}

function Ball(canvas,radius){
    this.canvas = canvas;
    this.x = 10;
    this.y = (window.innerWidth)/2-this.canvas.width/2;
    // this.canvas.style.left = this.origin[0]+'px';
    // this.canvas.style.top = this.origin[1]+'px';

    this.canvas.style.top = 10+'px';
    this.canvas.style.left = (window.innerWidth)/2-this.canvas.width/2+'px';

    // this.canvas.style.border = x+'px';

    this.radius = radius;
    this.canvas.width = radius*2;
    this.canvas.height = radius*2;
    this.ctx = this.canvas.getContext("2d");
    // this.canvas.style.width = radius*2+'px';

    this.draw = function() {

        this.ctx.beginPath();
        this.ctx.arc(this.canvas.width/2,radius,radius,0,2*Math.PI);
        this.ctx.stroke();
        this.ctx.fillStyle = "red";
        this.ctx.fill();


    }

    this.move = function(rate,angle){
        let intervalBall = setInterval( () =>{
            this.x= parseInt(this.canvas.style.left)+rate*Math.cos(angle);
            this.y= parseInt(this.canvas.style.top)+rate*Math.sin(angle);
            this.canvas.style.left = this.x+'px' ;
            this.canvas.style.top = this.y +'px' ;


        }, 200)
        setTimeout(() => {
            this.x= parseInt(this.canvas.style.left)+rate*Math.cos(-angle);
            this.y= parseInt(this.canvas.style.top)+rate*Math.sin(-angle);
            this.canvas.style.left = this.x+'px' ;
            this.canvas.style.top = this.y +'px' ;
            clearInterval(intervalBall);
            // console.log('Interval stopped after 5 seconds.');
        }, 3000);

    }

    this.areRectanglesColliding = function(rect1, rect2) {
        return (
            rect1.x < rect2.x + rect2.width &&
            rect1.x + rect1.width > rect2.x &&
            rect1.y < rect2.y + rect2.height &&
            rect1.y + rect1.height > rect2.y
        );
    }


}

let ballCanvas = document.getElementById("ballCanvas");
// let ballOrigin = [10+'px',]
let ball = new Ball(ballCanvas,30);
ball.draw()
let degrees = 30;
let radians = degrees * Math.PI/180;
ball.move(15,radians)




let barCanvas = document.getElementById("barCanvas");
let bar = new Bar(barCanvas, 400, 10, window.innerWidth / 2, window.innerHeight / 8 * 7);
bar.moveRight(100);




let bodyElement = document.getElementsByTagName("body")[0];
bodyElement.addEventListener("keypress", (event) => {
    if (event.key === 'a') {
        bar.moveLeft(10);
    } else if (event.key === 'd') {
        bar.moveRight(10);
    }
});


// var centerPointWidth = 10;
// var centerPointHeight = 10;
// var canvas = document.getElementById("myCanvas");
// var ctx = canvas.getContext("2d");
//
// ctx.fillStyle = "#FF0000";
// ctx.fillRect(0, 0, canvas.width, canvas.height);
// ctx.fillStyle = "#000000";
// ctx.fillRect((canvas.width / 2) - (centerPointWidth / 2), (canvas.height / 2) - (centerPointHeight / 2), centerPointWidth, centerPointHeight);
