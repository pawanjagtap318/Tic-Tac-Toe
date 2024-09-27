let boxes = document.querySelectorAll(".box");
let reset = document.querySelector(".reset");
let area = document.querySelector(".area");
let d = document.querySelector(".change");
let body = document.querySelector("body");
let image1 = document.querySelector(".image1");
let image2 = document.querySelector(".image2");
let playAgain = document.querySelector(".playAgain");

let turnX = true;

const winPatterns = [
    [0, 1, 2],[0, 4, 8],[0, 3, 6],[1, 4, 7],
    [2, 5, 8],[3, 4, 5],[6, 7, 8],[6, 4, 2]
];

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        // console.log("Button was clicked");
        if(turnX){
            box.innerText = "X";
            turnX = false;
        }
        else{
            box.innerText = "O";
            turnX = true;
        }
        box.disabled = true;

        checkwinner();
        boxesDisabled();
    });
});

const checkwinner = () => {
    for(let pattern of winPatterns){
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;

        if(pos1 != "" && pos2 != "" && pos3 != ""){
            if(pos1 === pos2 && pos2 === pos3){
                // console.log(`Winner is ${pos1}`);
                d.innerText = `Congragulations \n Winner is ${pos1}`;
                showWinner();
                return true;
            }
        }
    }
    if(draw() == true){
        d.innerText = `Game Draw!`;
        showWinner();
        return true; 
    }
    return false;
};

const draw = () => {
    for(let box of boxes){
        if(box.disabled != true){
            return false;
        }
    }
    return true;
}

const boxesDisabled = () => {
    if(checkwinner() == true){
        turnX = true;
        for(let box of boxes){
            box.disabled = true;
        }
        
    }
};

const boxesEnabled = () => {
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
};

const resetGame = () => {
    turnX = true;
    boxesEnabled();
}
reset.addEventListener("click",resetGame);

const showWinner = () => {
    body.style.backgroundColor = "#5D576B";
    area.classList.add("opacityOff");
    reset.classList.add("opacityOff");
    image1.classList.add("opacityOn");  
    image2.classList.add("opacityOn");
    playAgain.classList.add("display");
}


const newGame = () => {
    turnX = true;
    boxesEnabled();
    area.classList.remove("opacityOff");
    reset.classList.remove("opacityOff");
    body.style.backgroundColor = "#538687";
    document.querySelector(".image1").classList.add("opacityOff");
    d.innerText = ``;
    document.querySelector(".image2").classList.add("opacityOff");
    playAgain.classList.remove("display");
    image1.classList.remove("opacityOn");  
    image2.classList.remove("opacityOn");
}
playAgain.addEventListener("click",newGame);