// Global Variables
const dice1 = document.querySelector("#dice1");
const dice2 = document.querySelector("#dice2");
const startBtn = document.querySelector("#startBtn");
const rollBtn = document.querySelector("#rollBtn");
const indivBtn = document.querySelector("#indivBtn");
const sumBtn = document.querySelector("#sumBtn");
const endBtn = document.querySelector("#endBtn");
const p1NameInput = document.querySelector("#player1");
const p2NameInput = document.querySelector("#player2");
const boxes = [0,0,0,0,0,0,0,0,0,0];

const playerDiv = document.querySelector(".player");
const boardDiv = document.querySelector(".board");
const diceDiv = document.querySelector(".dice");
const scoreDiv = document.querySelector(".scorecard");
const winnerDiv = document.querySelector(".winner");

const currentPlayer = document.querySelector("#currentPlayer");
const activeRound = document.querySelector("#round");
const sum = document.querySelector("#sum");
const winnerText = document.querySelector("#winnerText");
const againBtn = document.querySelector("#againBtn");
const p1Name = document.querySelector("#p1Name");
const p2Name = document.querySelector("#p2Name");

let playerTurn = 1;
let round = 1;
let dicevalue1 = 0;
let dicevalue2 = 0;
let p1Pts = 0;
let p1Total = 0;
let p2Pts = 0;
let p2Total = 0;

// Event Listeners
startBtn.addEventListener('click', function(){
    if (p1NameInput.value.trim() === '' || p2NameInput.value.trim() === '') {
        alert("no name")
    } else {
        currentPlayer.textContent = p1NameInput.value + " 's turn";
        p1Name.textContent = p1NameInput.value;
        p2Name.textContent = p2NameInput.value;
        activeRound.textContent = "Round " + round;
        rollBtn.disabled = false;
        boardDiv.style.display = 'block';
        diceDiv.style.display = 'block';
        playerDiv.style.display = 'none';
        scoreDiv.style.display = 'block';
   }
});

// Function to generate a random number
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

rollBtn.addEventListener('click', function(){
      dice1.classList.remove("bi-dice-" + dicevalue1);
      dice1.classList.add("bi-dice-1");
      dice2.classList.remove("bi-dice-" + dicevalue2);
      dice2.classList.add("bi-dice-1");

      let randomNumber1 = getRandomInt(1, 6);
      dicevalue1 = randomNumber1;
      let randomNumber2 = getRandomInt(1, 6);
      dicevalue2 = randomNumber2;
      dice1.classList.remove("bi-dice-1");
      dice1.classList.add("bi-dice-" + dicevalue1);
      dice2.classList.remove("bi-dice-1");
      dice2.classList.add("bi-dice-" + dicevalue2);

      sum.textContent = randomNumber1 + randomNumber2;

      // individual button
      if (dicevalue1 === dicevalue2 || boxes[dicevalue1] === "X" || boxes[dicevalue2] === "X") {
          indivBtn.disabled = true;
        } else {
            indivBtn.disabled = false;
        }
        // sum button
        if (dicevalue1 + dicevalue2 > 9 || boxes[dicevalue1 + dicevalue2] === "X"){
            sumBtn.disabled = true;
        } else {
            sumBtn.disabled = false;
        }
        // end turn button
        if (indivBtn.disabled === true && sumBtn.disabled === true){
            endBtn.disabled = false;
            rollBtn.disabled = true;
        }
     rollBtn.disabled = true;
});

// Function to "shut" the boxes
function shut(boxNumber) {
        const box = document.querySelector("#box" + boxNumber);
        box.classList.add("shut");
        box.textContent = "X";
};

indivBtn.addEventListener('click', function() {
    shut(dicevalue1);
    boxes[dicevalue1] = "X";
    shut(dicevalue2);
    boxes[dicevalue2] = "X";
    boxes[0] = boxes[0] + (dicevalue1 + dicevalue2);
    indivBtn.disabled = true;
    sumBtn.disabled = true;
    rollBtn.disabled = false;
});

sumBtn.addEventListener('click', function(){
    shut(dicevalue1 + dicevalue2);
    boxes[dicevalue1 + dicevalue2] = "X";
    boxes[0] = boxes[0] + (dicevalue1 + dicevalue2);
    indivBtn.disabled = true;
    sumBtn.disabled = true;
    rollBtn.disabled = false;
});

endBtn.addEventListener('click', function(){
    if (playerTurn === 1) {
        p1Pts = 45 - boxes[0];
        p1Total += p1Pts;
        buildRow(round, p1Pts);
        playerTurn += 1;

        resetBoard();
        currentPlayer.textContent = p2NameInput.value + " 's turn";
        activeRound.textContent = "Round " + round;
        if (round > 5) {
            gameOver();
        }
    } else {
        p2Pts = 45 - boxes[0];
        p2Total += p2Pts;
        const player2Pts = document.querySelector("#Round" + round).querySelector(".p2Pts");
        player2Pts.textContent = p2Pts;
        playerTurn -= 1;
        round += 1;

        resetBoard();
        currentPlayer.textContent = p1NameInput.value + " 's turn";
        activeRound.textContent = "Round " + round;
        if (round > 5) {
            gameOver();
        }
    }
    rollBtn.disabled = false;
    endBtn.disabled = true;
});

function buildRow(currentRound, points) {
    const table = document.querySelector("#tBody");

    const newRow = document.createElement("tr");
    newRow.setAttribute("id", "Round" + currentRound);

    const roundNumber = document.createElement("th");
    const player1Cell = document.createElement("td");
    const player2Cell = document.createElement("td");

    roundNumber.textContent = "Round " + currentRound;
    player1Cell.textContent = points;
    player1Cell.setAttribute("class", "p1Pts");
    player2Cell.setAttribute("class", "p2Pts");

    table.insertAdjacentElement('beforeend',newRow);
    newRow.insertAdjacentElement('beforeend', roundNumber);
    newRow.insertAdjacentElement('beforeend', player1Cell);
    newRow.insertAdjacentElement('beforeend', player2Cell);
};

function resetBoard() {
    boxes.fill(0);
    const cards = document.querySelectorAll(".box");
    for (let i = 0; i < 9; i++) {
        cards[i].classList.remove("shut");
        cards[i].textContent = i + 1;
    }
};

function gameOver() {
    playerDiv.style.display = 'none';
    boardDiv.style.display = 'none';
    diceDiv.style.display = 'none';
    scoreDiv.style.display = 'block';
    winnerDiv.style.display = 'block';
    if (p1Total < p2Total) {
        // winnerText.textContent = "player 1 wins!";
        winnerText.textContent = p1NameInput.value + " wins!";
    } else if (p1Total > p2Total) {
        winnerText.textContent = p2NameInput.value + " wins!";
    } else {
        console.log("TIE");
    }
};

againBtn.addEventListener('click', function() {
    playerDiv.style.display = 'block';
    boardDiv.style.display = 'none';
    diceDiv.style.display = 'none';
    scoreDiv.style.display = 'none';
    winnerDiv.style.display = 'none';

    playerTurn = 1;
    round = 1;
    dicevalue1 = 0;
    dicevalue2 = 0;
    p1Pts = 0;
    p1Total = 0;
    p2Pts = 0;
    p2Total = 0;
    document.querySelector("#Round1").outerHTML = "";
    document.querySelector("#Round2").outerHTML = "";
    document.querySelector("#Round3").outerHTML = "";
    document.querySelector("#Round4").outerHTML = "";
    document.querySelector("#Round5").outerHTML = "";
});
