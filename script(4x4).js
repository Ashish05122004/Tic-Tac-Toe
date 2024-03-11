let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#resetBtn");
let newBtn = document.querySelector("#newBtn");
let msg = document.querySelector(".msg");
let msgContainer = document.querySelector(".msg-conatiner");
let backBtn = document.querySelector("#back");
let pO = document.getElementById("pO");
let pX = document.getElementById("pX");


let winPattern =[
    [0,1,2,3],
    [0,4,8,12],
    [4,5,6,7],
    [1,5,9,13],
    [8,9,10,11],
    [2,6,10,14],
    [12,13,14,15],
    [3,7,11,15],
    [0,5,10,15],
    [3,6,9,12]
];

let turn=0;
let turnCount=0;
let b,k;
boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        turnCount++;       
        if(turn === 0){
            box.innerText = "O";
            box.style.color ="#d00000";
            pX.style.color ="#ee9b00";
            pO.style.color ="#000";
            
            b=box.getAttribute("id");
            k=document.getElementById(b);
            backBtn.addEventListener("click",()=>{
                k.innerText = "";
                pO.style.color ="#ee9b00";
                pX.style.color ="#000";
                box.disabled = false;
                turn=0;
            })
            turn=1;
        }
        else{
            box.innerHTML = "X";
            box.style.color ="#ffb703";
            pO.style.color ="#ee9b00";
            pX.style.color ="#000";

            b=box.getAttribute("id");
            k=document.getElementById(b);
            backBtn.addEventListener("click",()=>{
                k.innerHTML = "";
                pX.style.color ="#ee9b00";
                pO.style.color ="#000";
                box.disabled = false;
                turn=1;
            })
            turn=0;
        }
        box.disabled = true;
        let isWinner = checkWinner();
        if(isFull() && !isWinner) {
            showDraw();
        } 
    });
});

//function for size of the boxes...
const isFull = ()=>{
    let size=0;
    boxes.forEach((box)=>{
        size+=box.childNodes.length;
    });
    if(size == 16){    
        return true;
    }else{
        return false;
    }
}

const disableBtns = ()=>{
    for(let i of boxes){
        i.disabled=true;
    }
}

//function to show draw or winner
const showWinner = (winner)=>{
    msg.innerText =`Congrtulation,Winner is Player${winner} 🏆🏆`;
    msgContainer.classList.remove("hide");
    disableBtns();//it will disable all rest buttons
}
const showDraw = (winner)=>{
    msg.innerText ="It's a Draw🤦‍♂️🤦‍♂️";
    msgContainer.classList.remove("hide");
    disableBtns();//it will disable all rest buttons

}

const checkWinner = ()=>{
    for(let p of winPattern){
        let pos1=boxes[p[0]].innerText;
        let pos2=boxes[p[1]].innerText;
        let pos3=boxes[p[2]].innerText;
        let pos4=boxes[p[3]].innerText;
        if(pos1!="" && pos2!="" && pos3!="" && pos4!=""){
            if(pos1 === pos2 && pos2 === pos3 && pos3 === pos4){
                showWinner(pos1);//it will show the winner
                return true; 
            }   
        }    
    }
};

const enableBtns = ()=>{
    for(let i of boxes){
        i.disabled=false;
        i.innerText = "";

        pO.style.color ="#ee9b00";
        pX.style.color ="#000";
    }
}
const resetGame = ()=>{
    turn=0;
    enableBtns();
    msgContainer.classList.add("hide");
}

newBtn.addEventListener("click",resetGame);
resetBtn.addEventListener("click",resetGame);