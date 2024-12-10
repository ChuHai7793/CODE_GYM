// console.log(typeof  BigInt(213213))
function Cell(x,y,size) {

    this.left = (1+y)*size;
    this.top = (1+x)*size;
    this.size = size;
    this.value = '';


    this.getCell = function(){
        return `<div class = "cell" id=${x+'-'+y} 
                    style = "width:${this.size}px;height:${this.size}px;
                            font-size:2px;
                            text-align:center;
                            position: absolute;
                            top:${this.top}px;left:${this.left}px;"> </div>`;
    }

    this.draw = function(){
        document.getElementsByTagName('section')[0].innerHTML+=this.getCell();

    }
    this.draw();
}


function Board(rows,cols){
    this.cells =[];
    this.marker = 'X';
    this.cols = cols;
    this.rows = rows;
    this.draw = ()=>{
        for (let i = 0; i < this.rows; i++){
            this.cells[i]=[];
            for (let j = 0; j < this.cols; j++){
                this.cells[i].push(new Cell(i,j,10));
            }
        }
    }

    this.fillCell = function(x,y){

        if (document.getElementById(x+'-'+y).innerHTML !==' '){
            alert("CELL IS NOT EMPTY");
        }else {
            document.getElementById(x + '-' + y).innerHTML = this.marker;
            this.cells[x][y].value = this.marker;
            if (this.marker === 'O') {
                this.marker = 'X';
            } else {
                this.marker = 'O';
            }
        }
    }

    this.checkWin = function(x,y){
        let cell = this.cells[x][y];
        // console.log(cell.value);

        //HORIZONTAL
        let count = 1;
        let i = 1;
        while((y + i < this.cols) && this.cells[x][y + i].value ===  cell.value){
            count++;
            i++;
        }
        i = 1;
        while((y - i >= 0) && this.cells[x][y - i].value ===  cell.value){
            count++;
            i++;
        }
        // console.log(count);
        this.endGame(count);
        //VERTICAL
        count = 1;
        i = 1;
        while((x + i < this.rows) &&this.cells[x + i][y].value ===  cell.value){
            count++;
            i++;
        }
        i = 1;
        while((x - i >= 0) &&this.cells[x - i][y].value ===  cell.value){
            count++;
            i++;
        }
        this.endGame(count);
        //LEFT DIAGONAL
        count = 1;
        i = 1;
        let j = 1;
        while((y + i < this.cols) && (x + i < this.rows) && this.cells[x + i][y + j].value ===  cell.value){
            count++;
            i++;
            j++;
        }
        i = 1;
        j = 1;
        while((x - i >= 0) && (y - j >= 0) && this.cells[x - i][y - j].value ===  cell.value){
            count++;
            i++;
            j++;
        }
        this.endGame(count);
        //RIGHT DIAGONAL
        count = 1;
        i = 1;
        j = 1;
        while((y + j < this.cols) && (x - i >= 0) && this.cells[x - i][y + j].value ===  cell.value){
            count++;
            i++;
            j++;
        }
        i = 1;
        j = 1;
        while((y - j >= 0) && (x + i < this.rows) &&this.cells[x + i][y - j].value ===  cell.value){
            count++;
            i++;
            j++;
        }
        this.endGame(count);
    }

    this.endGame = function(count){
        if (count===5){
            alert('PLAYER '+this.marker+" LOSE");
            this.clear();
        }
    }

    this.clear = function(){
        for (let i = 0; i < this.rows; i++){
            for (let j = 0; j < this.cols; j++){
                this.cells[i][j]='';
                document.getElementById(i + '-' + j).innerHTML=' ';
            }
        }
    }
}


let board = new Board(20,20);
board.draw();

// ADD ONCLICK EVENT FOR EACH CELL
for (let i = 0; i < 20; i++) {
    for (let j = 0; j < 20; j++){
        document.getElementById(i + '-' + j).onclick = () => {
            board.fillCell(i, j);
            board.checkWin(i, j);
        }
    }
}



// document.getElementById(this.x+'-'+this.y).onclick = ()=>{
//     this.fillCell(this.x,this.y,'X');

// b.fillCell (0,1,'X')
// DRAW GAME BOARD


//
// // EVENT WHEN CLICK ON A CELL
// let mark = 'X';
// document.getElementById('CARO_BOARD').addEventListener('click', function(event){
//     // FILL X TO THE CELL
//     console.log(event.target);
//     if (event.target!== document.getElementsByTagName('section')[0]){
//         event.target.innerHTML=mark;
//         if (mark==='X'){
//             mark = 'O';
//         }else{
//             mark = 'X';
//         }
//     }
//
//     for (let i = 0; i < 20; i++){
//         for (let j = 0; j < 20; j++){
//             let coordinates = arr[i][j].getArrayCoordinates(event.clientX,event.clientY)
//             if (coordinates){
//                 console.log(coordinates)
//                 console.log(arr[i][j]);
//             }
//         }
//     }
// })
