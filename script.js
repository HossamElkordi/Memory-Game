var row = 6;
var col = 6;
var flipped = 0;
var flippedCards = [];
var matches = 0;
var started = 0;
var changed = 0;
var time = 0;
var images = [];
var board = new Array(row*col);
var check = new Array(row*col);

function setBacks() {
    var index = 1;
    for (var i = 0; i <= 27; i++){
        images[i] = 'emojis/'+ index + '.png';
        index++;
    }
}

function setBoard() {
    for (var i = 0; i<check.length; i++){
        check[i] = false;
    }
    var index = random(1,row*col);
    for (var i = 0; i<board.length/2; i++){
        while (check[index-1] == true){
            index = random(1,row*col);
        }
        board[index-1] = images[i];
        check[index-1] = true;
        var index = random(1,row*col);
        while (check[index-1] == true){
            index = random(1,row*col);
        }
        board[index-1] = images[i];
        check[index-1] = true;
    }
}

function createTable(select, gameTable){
    var s = document.getElementById(select);
    switch (s.value){
        case "66" : row = 6; col = 6; check = new Array(row*col);
                    board = new Array(row*col); changed = 1;started = 0; matches = 0; break;
        case "58" : row = 5; col = 8; check = new Array(row*col);
                    board = new Array(row*col); changed = 1;started = 0; matches = 0; break;
        case "76" : row = 7; col = 6; check = new Array(row*col);
                    board = new Array(row*col); changed = 1;started = 0; matches = 0; break;
        case "86" : row = 8; col = 6; check = new Array(row*col);
                    board = new Array(row*col); changed = 1;started = 0; matches = 0;  break;
        case "87" : row = 8; col = 7; check = new Array(row*col);
                    board = new Array(row*col); changed = 1;started = 0; matches = 0; break;
    }
   table(gameTable);
}

function table(gameTable){
    setBacks();
    setBoard();
    var cellNum = 1;
    var gameTable = document.getElementById('gameTable');
    var body = '<table>';
    for (var i = 0; i < row;  i++){
        body += '<tr>';
        for (var j = 0; j < col;  j++){
            var cell = 'cell-' + cellNum;
            body += '<td><div class="card"><div class="content" id ='+cell+' onclick="flip(this.id);"><script>timer();</script><div class="front"><img  src='+board[cellNum-1]+'></div><div class="back"><img src="backgrdCard.png"></div></div></button></div></td>'; 
            cellNum ++;
        }
        body += '</tr>';
    }
    body += '</table>';
    gameTable.innerHTML = body;
}

function flip (cardContent){
    if (flipped >= 2){
        return;
    }
      started ++;
      if (started == 1){
          restartAndSolve();
          timer();
      }
      var content = document.getElementById(cardContent);
      content.style.transform = "rotateY(180deg)";
      flippedCards.push(cardContent);
      flipped++;
      game();
}

function backFlip(cardContent){
    var content= document.getElementById(cardContent);
    content.style.transform = "rotateY(360deg)";
}

function cover(){
    var second = flippedCards.pop();
    var index1 = second.substring((second.indexOf('-')+1),(second.length));
    
    var first = flippedCards.pop();
    var index2 = first.substring((first.indexOf('-')+1),(first.length));
    
    if((board[index1-1] != board[index2-1]) || (index1-1 == index2-1)){
        backFlip(first);
        backFlip(second);
    }else{
        matches ++;
        document.getElementById(first).setAttribute('onclick','');
        document.getElementById(second).setAttribute('onclick','');
    }
    flipped = 0;
}

function game (){
    if(flipped != 2){
        return;
    }
    window.setTimeout(cover,600);   
}

function random (min,max){
    return Math.floor(Math.random()*max)+min;
}

function timer(){
    started = 1;
    if ((started == 1) && (matches != (row*col/2)) && (changed == 0)){
        window.setTimeout(function(){
          time++;
          document.getElementById("time").innerHTML="Your time is : "+ Math.floor(time/60) +":"+time%60;
            timer();
            return;
        },1000);
    }else{
        document.getElementById("time").innerHTML="Your time is : "+ Math.floor(time/60) +":"+time%60;
         changed = 0;
         time = 0;
         matches = 0;
         started = 0;
    }
}
function restartAndSolve(){
    var b = document.getElementById('restart');
    b.style.opacity = '1';
    var c = document.getElementById('solve');
    c.style.opacity = '1';
}

function solve(){
   for (var i = 1; i<=row*col; i++){
       var name = 'cell-' + i;
       var content = document.getElementById(name);
       content.style.transform = "rotateY(180deg)"; 
       matches = row*col/2;
   }
}
