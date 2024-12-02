
function getElements(){
    const leftSide = document.getElementById("leftSidebar")
    const posQueue = document.getElementById("positiveQueue");
    const negQueue = document.getElementById("negativeQueue");
    const promptInputs = document.getElementById("promptBoxes");
    const promptDisplay = document.getElementById("upperSection");
    const savePos = document.getElementById("savePositive");
    const saveNeg = document.getElementById("saveNegative");
    return{posQueue,negQueue,promptInputs,leftSide,promptDisplay,saveNeg,savePos}
};

function createnNewNegative(child, prefix){

    let newPosition = 0
    positionNumber = String(child).slice(-1);
    let shortPrefix = prefix.slice(0,3);
    console.log(shortPrefix);

    if(positionNumber != "r"){
        newPosition = parseInt(positionNumber) + 1;
        console.log(newPosition);
    }
    else{//if no cards exist, last child will be heade'r'
        newPosition = 1
        console.log(newPosition);
    }

    const newCard = document.createElement("div");
    newCard.setAttribute("id",shortPrefix+ "Card" + newPosition);
    newCard.classList.add(prefix, "card");

    const input = document.createElement("input");
    input.setAttribute("id",shortPrefix+"Name"+newPosition);

    const span = document.createElement("span");
    span.classList.add("promptName");
    span.setAttribute("id",shortPrefix+"promptName"+newPosition)
    span.textContent = "Prompt Name:";

    newCard.appendChild(span);
    span.appendChild(input);

    const p = document.createElement("p");
    p.setAttribute("id",shortPrefix+"Prompt"+newPosition);
    p.classList.add("promptText");
    newCard.appendChild(p);
    if(shortPrefix == "neg"){
        q.negQueue.appendChild(newCard);
    }
    else{
        q.posQueue.appendChild(newCard);
    }


    return p
}



const q = getElements();

q.leftSide.addEventListener("dblclick", (event) =>{
    const card = event.target.closest(".card")
    if (card){
        let text = card.querySelector(".promptText").textContent;
        const display = q.promptDisplay.querySelector("#promptDisplay"); 
        text = text.replace('<br>','\n')
        console.log(text)
        display.value = text;
    }
    else{
        return
    }
}) 


q.saveNeg.addEventListener("click", (event) =>{
    text = document.getElementById("promptInput").value;
    let child = q.negQueue.lastElementChild.id;
    let prefix = "negative";
    paragraph = createnNewNegative(child,prefix);
    paragraph.textContent = text;
})

q.savePos.addEventListener("click",(event)=>{
    text = document.getElementById("promptInput").value;
    let child = q.posQueue.lastElementChild.id;
    let prefix = "positive";
    paragraph = createnNewNegative(child,prefix);
    paragraph.textContent = text;
} )
