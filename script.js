let blockOne = document.getElementsByClassName("word");
let wordBank = ["pizza", "hello", "jazzy","spazz"];
let currentRow = 0;
let currentColumn = 0;

// * Actual Blocks
let blockRows = document.getElementsByClassName("block-row");
document.body.addEventListener("keydown",Get_KeyBoardInput);

/*
Important References
 ! 1.) To get a column, blockRow[rowBlock].children[columnBlock]
*/

// document.body.onkeydown = ()=>{
//     let currentBlock = blockRows[currentRow].children[currentColumn].firstElementChild // * Gets currentBlock
//     currentBlock.innerHTML = "a";
// }


function Get_KeyBoardInput(event){
    // * Validate input first
    let flag1 = (event.keyCode >= 65 && event.keyCode <= 90); // * if character is uppercase
    let flag2 = (event.keyCode >= 97 && event.keyCode <= 122); // * if character is lowercase
    let flag3 = currentColumn !=5;

    console.log(event.keyCode)
    if ( (flag1 || flag2) && flag3 ){ // * for some reason enter key is valid


        let currentBlock = blockRows[currentRow].children[currentColumn].firstElementChild // * Gets current word based on current row and column 
        console.log(currentBlock);
        currentBlock.innerHTML = event.key.toLowerCase();

        
        currentColumn++; // * Moves to the next column

        console.log(currentColumn);
    }

    else if (event.keyCode === 8)  DeleteCharacter();
    else if (event.keyCode === 13) SubmitAnswer();


}

function DeleteCharacter(event){ // * Deletes content of currentBlock and moves to previous blockColumn
    if (currentColumn != 0){
        currentColumn--; // * Moves a 1 column towards the left
        let currentBlock = blockRows[currentRow].children[currentColumn].firstElementChild // * Gets current block based on current row and column 
        currentBlock.innerHTML = ""; // * Resets content to none
    }
}

function SubmitAnswer(){ // * Can only submit in if currentColumn is at Column 5 and has a character inside of it
    let flag1 = (currentColumn == 5); // * when its on the last column
    let flag2 =  (blockRows[currentRow].children[4].firstElementChild.innerHTML.length === 1) // * Checks if last word in column is occupied
    let flag3 = currentRow <= 4;
    console.log(flag2)
    if (flag1 && flag2 && flag3){ // ! Valid input

        CheckInput();
        currentColumn = 0;
        currentRow++;
    }
    else{
        console.log("not valid")
    }
}


function CheckInput(){ // * Checks input if its letters are correct or not
    let columnWord = blockRows[currentRow].children;
    let wordSubmission = "";

    for (let character of columnWord){
        wordSubmission += character.firstElementChild.innerHTML;
    }

    console.log(wordSubmission);

}

function Get_RandomWord(){
    let randomIndex = Math.floor(Math.random * wordBank.length);
    return wordBank[randomIndex];
}