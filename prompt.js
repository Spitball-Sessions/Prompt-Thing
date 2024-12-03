
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

function createNewPrompt(child, prefix){

    let newPosition = 0
    positionNumber = String(child).slice(-1);
    /*since all the HTML id's are shorthanded to 'pos' and 'neg', 
    this will append the correct queue based on the function entered from */
    let shortPrefix = prefix.slice(0,3);
    console.log(shortPrefix);

    if(positionNumber != "r"){
        newPosition = parseInt(positionNumber) + 1;
        console.log(newPosition);
    }
    else{//if no cards exist, last child will be header, so last letter of the tag will be 
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

function copyPromptCardToDisplay(event){
    const card = event.target.closest(".card")
    if (card){
        let text = card.querySelector(".promptText").textContent;
        const display = q.promptDisplay.querySelector("#promptDisplay"); 
        text = text.replace('<br>','\n') //converts the <br> from the HTML display to \n for the textarea display
        console.log(text)
        display.value = text;
    }
    else{ //in case you click outside the card.
        return
    }
}

function savePositivePrompt(event){
    text = document.getElementById("promptInput").value;
    let child = q.posQueue.lastElementChild.id;
    let prefix = "positive";
    paragraph = createNewPrompt(child,prefix); 
    paragraph.textContent = text;
} 
function saveNegativePrompt(event){
    text = document.getElementById("promptInput").value;
    let child = q.negQueue.lastElementChild.id;
    let prefix = "negative";
    paragraph = createNewPrompt(child,prefix);
    paragraph.textContent = text;
}

function labelPromptCards(event){
    if(event.key === "Enter"){
        //creates a paragraph, copies over the text and then replaces the input with a label
        let libelLiable = document.createElement("label");
        libelLiable.textContent = event.target.value;
        let span = event.target.parentElement;
        console.log(span);
        span.textContent="";
        span.appendChild(libelLiable);
        
    }
}

q.leftSide.addEventListener("dblclick", copyPromptCardToDisplay);

//saving prompts
q.savePos.addEventListener("click", savePositivePrompt);
q.saveNeg.addEventListener("click", saveNegativePrompt);

q.leftSide.addEventListener("keypress",labelPromptCards);