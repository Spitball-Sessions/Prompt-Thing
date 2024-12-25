const debug = true

function db(input) {
    if (debug) console.log(input);
}

//basic default setter method
function englishSetter(input){
    if (input.trim() !== ""){
        return input.trim();
    }
}

//gets HTML elements.  probably more than needed.
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

function createArrays(){
    const posPrompts = [];
    const negPrompts = [];
    return {posPrompts,negPrompts}
}

class Prompt {
    constructor(name,promptText,type,description=""){
        this.name = name;
        this._description = description;
        this._promptText = promptText;
        this.type = type;
    }

    set promptText(input){
        this._promptText = englishSetter(input).concat("",",");
        }

    set description(input){
        this._description = englishSetter(input);
    }

    get promptText(){
        return this._promptText;
    }

    get description(){
        return this._description;
    }
}


function createNewPrompt(child, prefix){
    let newPosition = 0
    positionNumber = String(child).slice(-1);
    /*since all the HTML id's are shorthanded to 'pos' and 'neg', 
    this will append the correct queue based on the function entered from */
    let shortPrefix = prefix.slice(0,3);

    if(positionNumber != "r"){
        newPosition = parseInt(positionNumber) + 1;
    }
    else{//if no cards exist, last child will be header, so last letter of the tag will be 
        newPosition = 1
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

//store prompts in arrays


const q = getElements();
const {posPrompts,negPrompts} = createArrays();

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
    const input = document.getElementById("promptInput")
    const lastCard = q.posQueue.lastElementChild.id;
    const prompt = new Prompt(undefined,input.value,"positive","")
    paragraph = createNewPrompt(lastCard,prompt.type); 
    paragraph.textContent = prompt.promptText;
    posPrompts.push(prompt);
    db(posPrompts);
    input.value = "";
} 

function saveNegativePrompt(event){
    const input = document.getElementById("promptInput")
    const lastCard = q.negQueue.lastElementChild.id;
    const prompt = new Prompt(undefined,input.value,"negative","")
    paragraph = createNewPrompt(lastCard,prompt.type);
    paragraph.textContent = prompt.promptText;
    negPrompts.push(prompt);
    db(negPrompts);
    input.value = "";
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