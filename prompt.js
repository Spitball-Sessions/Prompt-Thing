
function getElements(){
    const leftSide = document.getElementById("leftSidebar")
    const posQueue = document.getElementById("positiveQueue");
    const negQueue = document.getElementById("negativeQueue");
    const promptBoxes = document.getElementById("promptBoxes");

    return{posQueue,negQueue,promptBoxes,leftSide}
};


const q = getElements();

q.leftSide.addEventListener("dblclick", (event) =>{
    const card = event.target.closest(".card")
    if (card){
        let text = card.querySelector(".promptText").textContent;
        const display = promptBoxes.querySelector("#promptDisplay"); 
        text = text.replace('<br>','\n')
        console.log(text)
        display.textContent = text;


    }
    else{
        return
    }
}) 


