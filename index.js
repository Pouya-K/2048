//Variables
var lostGame = true;
var counter = 0;
var gridNums = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
var grid = [[document.getElementById('00'), document.getElementById('01'), document.getElementById('02'), document.getElementById('03')], [document.getElementById('10'), document.getElementById('11'), document.getElementById('12'), document.getElementById('13')], [document.getElementById('20'), document.getElementById('21'), document.getElementById('22'), document.getElementById('23')], [document.getElementById('30'), document.getElementById('31'), document.getElementById('32'), document.getElementById('33')]];

function drawGrid(){
    randomAddition();
    for(var i = 0; i<grid.length; i++){
        for(var n = 0; n<grid[i].length; n++){
            if(gridNums[i][n] != 0){
                grid[i][n].innerHTML = gridNums[i][n];
            }
            else{
                grid[i][n].innerHTML = "100";
                lostGame = false;
            }
        }
    }
}

function move(direction){
    drawGrid();
    if(lostGame){
        endGame();
    }
    lostGame = true;
}

function randomAddition(){
    while(true){
        //Generating random position on the grid
        var x = Math.floor(Math.random() * 4);
        var y = Math.floor(Math.random() * 4);
        var randomNum = Math.floor(Math.random() * 10); //choosing whether the new spawned number is 2 or 4 (70%-30% split)
        if(gridNums[x][y] == 0){ //ensuring that space is not already occupied
            if(randomNum < 6){
                gridNums[x][y] = 2;
            } 
            else{
                gridNums[x][y] = 4;
            }
            break;
        }
    }
}

function endGame(){
    counter = 0;
    alert("you lost");
}

if(counter == 0){
    drawGrid();
    counter++;
}

window.addEventListener('keydown', function (e) {
    if(`${e.key}` == "ArrowDown"){  
        move('d');
    }
    else if(`${e.key}` == "ArrowUp"){  
        move('u');
    }
    else if(`${e.key}` == "ArrowLeft"){  
        move('l');
    }
    else if(`${e.key}` == "ArrowRight"){  
        move('r');
    }
  }, false);
