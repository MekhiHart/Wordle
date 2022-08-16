let blockOne = document.getElementsByClassName("word");
let wordBank = ["pizza", "hello", "jazzy","spazz","admit","argue","actor","below",
"being","blame","chest","clear","cross","dated","daily","debut","group","entry","forth",
"forty","equal","grown","found","every","guard","heart","dream","heavy","giant","given","glass",
"fluid","lives","links","metal","minor","noted","notes","mixed","large","novel","ocean","lunch",
"often","paint","paper","flair","float","radio","pride","price","sense","times","think",
"union","stuck","south","yield","worth","worst","virus","would","vital",];
let currentRow = 0;
let currentColumn = 0;
let maximum_WordLength = 5;
let gameEnd = false;


let randomWord = Get_RandomWord(); // * Uncomment after finish
console.log("Random word: "+randomWord)


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

    if ( (flag1 || flag2) && flag3 && !gameEnd ){ // * for some reason enter key is valid
        let currentBlock = blockRows[currentRow].children[currentColumn].firstElementChild // * Gets current word based on current row and column 
        currentBlock.innerHTML = event.key.toLowerCase();
        currentColumn++; // * Moves to the next column
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

function SubmitAnswer(){ // * Can only submit in if currentColumn is at Column 5 and has a character inside of 
    if (!gameEnd){
        let flag1 = (currentColumn == 5); // * when its on the last column
        let flag2 =  (blockRows[currentRow].children[4].firstElementChild.innerHTML.length === 1) // * Checks if last word in column is occupied
        let flag3 = currentRow <= 5;

        if (flag1 && flag2 && flag3){ // ! Valid input
    
            CheckInput();
            currentColumn = 0;
            currentRow++;
        }
        else{
            console.log("not valid")
        }
    }
}


function CheckInput(){ // * Checks input if its letters are correct or not
    let columnWord = blockRows[currentRow].children;
    let wordSubmission = "";

    // * backgroundColor
    let correct_Color = "#afad55";
    let incorrect_Color = "#8d5f48";
    let misplaced_Color = "#e4d369";

    for (let character of columnWord){
        wordSubmission += character.firstElementChild.innerHTML;
    }

    // * Character frequency for randomWord
    let characterFrequency = {};

    // * Initalized character properties
    for (let i = 0; i < 5; i++ ){
        characterFrequency[randomWord[i]] = 0;
    }


    // * Checks for for frequency of that character based on randomWord
    for (let i = 0; i < randomWord.length; i++){
        characterFrequency[randomWord[i]] += 1;


    // ! Checks simillarities, need to have another color if that letter exists in a different
    for (let i = 0; i < maximum_WordLength; i++ ){ // * Checks if this words are correct or incorrect

        if ( wordSubmission[i] === randomWord[i] ){ // * If character is right and in the same index
            columnWord[i].style.backgroundColor = correct_Color
            characterFrequency[wordSubmission[i]] -= 1; // * Decreases frequency if that character exists
        }
        else{
            columnWord[i].style.backgroundColor = incorrect_Color
        }
    }

    // ! Checks for misplaced letters
    }

    for (let i = 0 ; i < wordSubmission.length; i++){ // * looks for misplaced characters and prevents coloring multiple times using an object
        characterTarget = characterFrequency[wordSubmission[i]];
        if (characterTarget && characterFrequency[wordSubmission[i]] > 0 ){ // * If it exists and frequency is not 0
            console.log(wordSubmission[i] + " exists");
            characterFrequency[wordSubmission[i]] -= 1;
            columnWord[i].style.backgroundColor = misplaced_Color;            
        }
    }

    console.log(characterFrequency);

    // * Game end checks
    if (wordSubmission === randomWord ){
        gameEnd = true;
        console.log("You got the word! Game End!");
    }
    else if (currentRow === 5){ // * When the last try is not a correct
        gameEnd = true;
        console.log("You lost :( Game End")
    }
}

function Get_RandomWord(){
    let randomIndex = Math.floor(Math.random() * wordBank.length);
    return wordBank[randomIndex];
}