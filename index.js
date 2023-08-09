//Variables
var counter = 0;
var score = 0;
var gridNums = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
var grid = [[document.getElementById('00'), document.getElementById('01'), document.getElementById('02'), document.getElementById('03')], [document.getElementById('10'), document.getElementById('11'), document.getElementById('12'), document.getElementById('13')], [document.getElementById('20'), document.getElementById('21'), document.getElementById('22'), document.getElementById('23')], [document.getElementById('30'), document.getElementById('31'), document.getElementById('32'), document.getElementById('33')]];

function drawGrid(){
    randomAddition();
    for(var i = 0; i<grid.length; i++){
        for(var n = 0; n<grid[i].length; n++){
            if(gridNums[i][n] != 0){
                grid[i][n].innerHTML = gridNums[i][n];
                grid[i][n].style.color = 'black';
            }
            else{
                grid[i][n].style.color = 'rgb(204, 192, 179)';
                grid[i][n].innerHTML = "0"; 
            }
        }
    }
    document.getElementById('score').innerHTML = score;
}

function flipGridHoriz(){
    for(var i = 0; i<gridNums.length; i++){
        for(var n = 0; n<2; n++){
            var temp = gridNums[i][n];
            gridNums[i][n] = gridNums[i][3-n];
            gridNums[i][3-n] = temp;
        }
    }
}
function flipGridVert(){
    for(var n = 0; n<gridNums[0].length; n++){
        for(var i = 0; i<2; i++){
            var temp = gridNums[i][n];
            gridNums[i][n] = gridNums[3-i][n];
            gridNums[3-i][n] = temp;
        }
    }
}

function moveRight(){
    flipGridHoriz();
    moveLeft();
    flipGridHoriz();
}
function moveLeft(){
    //Moving everything from right to left
    for(var i = 0; i<gridNums.length; i++){
        for(var n = gridNums[i].length-1; n>0; n--){
            if(gridNums[i][n] != 0 && gridNums[i][n-1] == 0){
                gridNums[i][n-1] = gridNums[i][n];
                gridNums[i][n] = 0;
                n = gridNums[i].length;
            }
        }
    }
    //Merging
    for(var i = 0; i<gridNums.length; i++){
        for(var n = 0; n<gridNums[i].length-1; n++){
            if(gridNums[i][n] == gridNums[i][n+1]){
                score += gridNums[i][n]*2;
                gridNums[i][n] = gridNums[i][n]*2;
                gridNums[i][n+1] = 0;
            }
        }
    }
    //Moving everything from right to left
    for(var i = 0; i<gridNums.length; i++){
        for(var n = gridNums[i].length-1; n>0; n--){
            if(gridNums[i][n] != 0 && gridNums[i][n-1] == 0){
                gridNums[i][n-1] = gridNums[i][n];
                gridNums[i][n] = 0;
                n = gridNums[i].length;
            }
        }
    }
}
function moveUp(){
    flipGridVert();
    moveDown();
    flipGridVert();
}
function moveDown(){
    //shifting everything down
    for(var n = 0; n<gridNums[0].length; n++){
        for(var i = 0; i<gridNums.length-1; i++){
            if(gridNums[i][n] != 0 && gridNums[i+1][n] == 0){
                gridNums[i+1][n] = gridNums[i][n];
                gridNums[i][n] = 0;
                i = -1;
            }
        }
    }
    //Merging
    for(var n = 0; n<4; n++){
        for(var i = 3; i>0; i--){
            if(gridNums[i][n] == gridNums[i-1][n]){
                score += gridNums[i][n]*2;
                gridNums[i][n] = gridNums[i][n]*2;
                gridNums[i-1][n] = 0;
            }
        }
    }
    //shifting everything down
    for(var n = 0; n<gridNums[0].length; n++){
        for(var i = 0; i<gridNums.length-1; i++){
            if(gridNums[i][n] != 0 && gridNums[i+1][n] == 0){
                gridNums[i+1][n] = gridNums[i][n];
                gridNums[i][n] = 0;
                i = -1;
            }
        }
    }
}

function randomAddition(){
    var randomNum = Math.floor(Math.random() * 10); //choosing whether the new spawned number is 2 or 4 (80%-20% split)
    if(hasSpace()){
        while(true){
            //Generating random position on the grid
            var x = Math.floor(Math.random() * 4);
            var y = Math.floor(Math.random() * 4);
            if(gridNums[x][y] == 0){ //ensuring that space is not already occupied
                if(randomNum < 8){
                    gridNums[x][y] = 2;
                } 
                else{
                    gridNums[x][y] = 4;
                }
                break;
            }
        }
    }
}

function hasSpace(){
    for(var i = 0; i<gridNums.length; i++){
        for(var n = 0; n<gridNums[i].length; n++){
            if(gridNums[i][n] == 0) return true;
        }
    }
    return false;
}

function endGame(){
    alert("you lost");
}
function restart(){
    //resetting the grid
    for(var i = 0; i<gridNums.length; i++){
        for(var n = 0; n<gridNums[i].length; n++){
            gridNums[i][n] = 0;
        }
    }
    drawGrid();
}
if(counter == 0){
    drawGrid();
    counter++;
}
function moveIsAvailable(){
    //looping from left to right in each row to check for a possible move
    for(var i = 0; i<gridNums.length; i++){
        for(var n = 0; n<gridNums[i].length-1; n++){
            if(gridNums[i][n] == gridNums[i][n+1]){
                return true;
            }
        }
    }

    //looping from top to bottom in each column to check for a possible move
    for(var i = 0; i<gridNums.length-1; i++){
        for(var n = 0; n<gridNums[i].length; n++){
            if(gridNums[i][n] == gridNums[i+1][n]){
                return true;
            }
        }
    }
    return false;
}
//Key is pressed
window.addEventListener('keydown', function (e) {
    if(`${e.key}` == "ArrowDown"){  
        moveDown();
        drawGrid();
        if(!moveIsAvailable()){
            endGame();
        }
    }
    else if(`${e.key}` == "ArrowUp"){  
        moveUp();
        drawGrid();
        if(!moveIsAvailable()){
            endGame();
        }
    }
    else if(`${e.key}` == "ArrowLeft"){  
        moveLeft();
        drawGrid();
        if(!moveIsAvailable()){
            endGame();
        }
    }
    else if(`${e.key}` == "ArrowRight"){  
        moveRight();
        drawGrid();
        if(!moveIsAvailable()){
            endGame();
        }
    }
  }, false);
