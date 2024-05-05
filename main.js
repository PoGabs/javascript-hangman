const input = require('sync-input');

function hangmanWordPrinter(word) {
    let i = 0;
    while (i < word.length) {
        if (guessedLetters.includes(word[i])) {
            process.stdout.write(word[i]);}
        else
            {
                process.stdout.write("-");
            }
        i += 1;
        }
        process.stdout.write("\n");
}

function winCheck(playerArray, correctArray) {
    // Check if the arrays have the same length
    if (playerArray.length !== correctArray.length) {
        return false;
    }

    // Sort both arrays
    const sortedPlayerArray = playerArray.sort();
    const sortedCorrectArray = correctArray.sort();

    // Compare the sorted arrays element by element
    for (let i = 0; i < sortedPlayerArray.length; i++) {
        if (sortedPlayerArray[i] !== sortedCorrectArray[i]) {
            return false;
        }
    }

    return true;
}
function removeDuplicates(array) {
    return array.filter((element, index) => array.indexOf(element) === index);
}

function isValidOneLetterLowercaseEnglishAlphabet(str) {
    // Regular expression to match one lowercase English alphabet letter
    const regex = /^[a-z]$/;
    return regex.test(str);
}

function hangman() {
    while (gameRunning) {
        hangmanWordPrinter(correctAnswer);
        let playerGuess = input("Input a letter: ");
        if (guessedLetters.includes(playerGuess) || wrongGuesses.includes(playerGuess)) {
            console.log("You've already guessed this letter.");
            continue;
        }
        if (playerGuess.length > 1 || playerGuess.length === 0) {
            console.log("Please, input a single letter.");
            continue;
        }
        if (!isValidOneLetterLowercaseEnglishAlphabet(playerGuess)) {
            console.log("Please, enter a lowercase letter from the English alphabet.\n")
            continue;
            }
        if (correctAnswer.includes(playerGuess)) {
            guessedLetters.push(playerGuess);
            if (winCheck(guessedLetters, arrayOfCorrectLetters)) {
                gameWin = true;
                gameRunning = false;
                break;
                }
        } else {
                wrongGuesses.push(playerGuess);
                console.log("That letter doesn't appear in the word.\n")
                remainingAttempts -= 1;
                }
        if (remainingAttempts === 0) {
            gameRunning = false;
        }
        console.log();
    }
    if (gameWin) {
        console.log(`You guessed the word ${correctAnswer}!`);
        console.log("You survived!");
        winCount += 1;
    } else {
        console.log("You lost!");
        lostCount += 1;
    }

}

console.log("H A N G M A N\n");
let wordList = ["python", "java", "swift", "javascript"];
let correctAnswer;
let guessedLetters;
let wrongGuesses;
let arrayOfCorrectLetters;
let gameWin;
let gameRunning;
let winCount = 0;
let lostCount = 0;
let remainingAttempts;

while (true) {
    let menuSelection = input("Type \"play\" to play the game, \"results\" to show the scoreboard, and \"exit\" to quit: ")
    if (menuSelection === "play") {
        gameRunning = true;
        gameWin = false;
        guessedLetters = [];
        wrongGuesses = [];
        remainingAttempts = 8;
        correctAnswer = wordList[Math.floor(Math.random() * wordList.length)];
        arrayOfCorrectLetters = removeDuplicates(correctAnswer.split(""));
        console.log();
        hangman();
    } else if (menuSelection === "results") {
        console.log(`You won: ${winCount} times.`)
        console.log(`You lost: ${lostCount} times.`)
    } else if (menuSelection === "exit") {
        break;
    }
}
