var height = 6;//number of guesses
var width = 5;//length of the word

//var row = 0;
//var col = 0;

var currow = 0; // current guess(attempt #)
var curcol = 0; //current letter for that attempt

var gameOver = false;
var word = "GLENN";

window.onload = function(){
    initialize();
}

function initialize(){
    // create the game board
    for (let r = 0; r < height; r++){
        for(let c = 0; c < width; c++){
            // <span id = "0-0" class = "tile"></span>
            let tile = document.createElement("span")
            tile.id = r.toString() + "-" + c.toString()
            tile.classList.add("tile");
            tile.innerText = ""
            document.getElementById("board").appendChild(tile);
        }
    }

    // Listen for Key Press
    document.addEventListener("keyup", (e) => {
        if (gameOver){
            return;
        }
        // alert(e.code);
        if("KeyA" <= e.code && e.code <= "KeyZ"){
            if(curcol < width){
                let currTile = document.getElementById(currow.toString() + "-"+ curcol.toString())
                //alert("Ya");
                //curcol++;
                if(currTile.innerText == ""){
                    currTile.innerText = e.code[3];
                    curcol += 1;
                    //alert(curcol)
                    // if(curcol >= width){
                    //     curcol = 0
                    //     //alert(">")
                    // }
                }
            }
        }
        else if (e.code == "Backspace"){
            if(0<curcol && curcol <= width){
                curcol -= 1;

            }
            let currTile = document.getElementById(currow.toString() + "-"+ curcol.toString());
            currTile.innerText = "";
        }
        else if (e.code == "Enter"){
            update();
            currow += 1; //start new row
            curcol = 0; //start at 0 for new row.
        }

        if(!gameOver && currow == height){
            gameOver = true;
            document.getElementById("answer").innerText = word;
        }
    })
}



function update(){
    let correct = 0;
    let letterCount = {}; //KENNY -> {K:1, E:1, N:2, Y:1}


    for(let i = 0; i < word.length; i++){
        let letter = word[i];
        if(letterCount[letter]){
            letterCount[letter]+=1;
        }else{
            letterCount[letter] = 1;
        }
    }
    for (let c = 0; c < width; c++){
        let currTile = document.getElementById(currow.toString()+"-"+c.toString());
        let letter = currTile.innerText;

        //Is it in the correct position?
        if(word[c] == letter){
            currTile.classList.add("correct");
            correct+=1;
            //alert("1");
            letterCount[letter]-=1;
        }

        if (correct == width){gameOver = true;}
    }
    //go again and mark which ones are present but in wrong position
    for (let c = 0; c < width; c++){
        let currTile = document.getElementById(currow.toString()+"-"+c.toString());
        let letter = currTile.innerText;
        if(!currTile.classList.contains("correct")){
            if(word.includes(letter) && letterCount[letter] > 0){
                currTile.classList.add("present");
                letterCount[letter]-=1;
            }else{
                currTile.classList.add("absent");
                //letterCount[letter]-=1;
            }
        }



    }

}
