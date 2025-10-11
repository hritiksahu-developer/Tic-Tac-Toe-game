let boxes = document.querySelectorAll(".box");
let msgContainer = document.querySelector(".msg-container");
let winmsg = document.querySelector("#win-msg");
let newGameBtn = document.querySelector("#newGame");
let resetBtn = document.querySelector("#reset");
let turnX = true;
let pturn = document.querySelector("#turn");

const winPattern = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

const checkTurn = () => {
  if (turnX) {
    pturn.innerHTML = "It's **X's** Turn"; // Use innerHTML for bolding
    pturn.classList.remove("playerO");
    pturn.classList.add("playerX");
  } else {
    pturn.innerHTML = "It's **O's** Turn";
    pturn.classList.remove("playerX");
    pturn.classList.add("playerO");
  }
};
checkTurn();

boxes.forEach((box) =>{
    box.addEventListener("click", () =>{
        console.log(`Button-Clicked`);
        if(turnX === true){
            box.innerText = "X";
            box.classList.add("playerX");
            box.classList.remove("playerO");
            box.disabled = true;
            turnX = false;
        }else{
            box.innerText = "O";
            box.classList.add("playerO");
            box.classList.remove("playerX");
            box.disabled = true;
            turnX = true;
        }
        checkWinner();
        if (msgContainer.classList.contains("hide")) {
      checkTurn();
    }
    })
})
const checkWinner = () => {
    for(let pattern of winPattern){
        let pos0 = boxes[pattern[0]].innerText;
        let pos1 = boxes[pattern[1]].innerText;
        let pos2 = boxes[pattern[2]].innerText;
        if(pos0 !== "" && pos1 !== "" && pos2 !==""){
            if(pos0 === pos1 && pos1 === pos2){
                console.log(`Winner is ${pos0}`);
                showWinner(pos0);
                disableBox();
                return;
            }
        }
    }
    checkDraw();
};
const showWinner = (pos0) => {
    msgContainer.classList.remove("hide");
    winmsg.innerText = `Congratulations Winner "${pos0}"`;
    pturn.innerText = "Game Over!"; // ✅ FIX 2: Update turn area to Game Over
    pturn.classList.remove("playerX", "playerO");
    disableBox();
};
const disableBox = () => {
    for(let box of boxes){
        box.disabled = true;
    }
};
const enableBox = () => {
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
        box.classList.remove("playerO", "playerX");
        msgContainer.classList.add("hide");
    }
    turnX = true;
    checkTurn();
};
const checkDraw = () => {
    let count = 0;
    boxes.forEach((box) => {
        if(box.innerText !== ""){
            count++;
        }
        });
        if(count === 9){
            winmsg.innerHTML = `Match Draw, Play Again...!`;
            msgContainer.classList.remove("hide");
            pturn.innerText = ""; // ✅ FIX 3: Update turn area for a draw
            pturn.classList.remove("playerX", "playerO");
            disableBox();
        }
};
resetBtn.addEventListener("click", enableBox);
newGameBtn.addEventListener("click", enableBox);

