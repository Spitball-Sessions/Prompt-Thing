
function getElements(){
    const leftSide = document.getElementById("leftSidebar")
    const posQueue = document.getElementById("positiveQueue");
    const negQueue = document.getElementById("negativeQueue");
    const promptInputs = document.getElementById("promptBoxes");
    const promptDisplay = document.getElementById("upperSection");


    return{posQueue,negQueue,promptInputs,leftSide,promptDisplay}
};


const q = getElements();

q.leftSide.addEventListener("dblclick", (event) =>{
    const card = event.target.closest(".card")
    if (card){
        let text = card.querySelector(".promptText").textContent;
        const display = q.promptDisplay.querySelector("#promptDisplay"); 
        text = text.replace('<br>','\n')
        console.log(text)
        display.textContent = text;
    }
    else{
        return
    }
}) 


