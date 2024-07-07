let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn"); 
let newGameBtn = document.querySelector("#newGame-btn"); 
let msgContainer = document.querySelector(".msg-container"); 
let msg = document.querySelector("#msg"); 

let turn0 = true;
const winPattern = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (box.innerHTML === "") {
            if (turn0) {
                box.innerHTML = "O";
                turn0 = false;
            } else {
                box.innerHTML = "X";
                turn0 = true;
            }
            box.disabled = true;
            chkWinner();
        }
    });
});

const chkWinner = () => {
    let isWinner = false; // Initialize flag
    for (let pattern of winPattern) {
        let ptn1Val = boxes[pattern[0]].innerText;
        let ptn2Val = boxes[pattern[1]].innerText;
        let ptn3Val = boxes[pattern[2]].innerText;
        if (ptn1Val !== "" && ptn2Val !== "" && ptn3Val !== "") {
            if (ptn1Val === ptn2Val && ptn2Val === ptn3Val) {
                showWinner(ptn1Val);
                isWinner = true; // Set flag to true if there's a winner
                break; // Exit the loop as we found a winner
            }
        }
    }
    if (!isWinner) { // If no winner is found, check for tie
        let isTie = true;
        boxes.forEach((box) => {
            if (box.innerText === "") {
                isTie = false; // If any box is empty, it's not a tie
            }
        });
        if (isTie) {
            showTie();
        }
    }
};

const disableBoxes = () => {
    boxes.forEach((box) => {
        box.disabled = true;
    });
};

const enableBoxes = () => {
    boxes.forEach((box) => {
        box.disabled = false;
        box.innerText = "";
    });
};

const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const showTie = () => {
    msg.innerText = "Match is Tie";
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const resetGame = () => {
    turn0 = true;
    enableBoxes();
    msgContainer.classList.add("hide");
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
