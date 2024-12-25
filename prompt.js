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
    const queueContainer = document.getElementById("leftSidebar");
    const posQueue = document.getElementById("positiveQueue");
    const negQueue = document.getElementById("negativeQueue");
    const promptInputs = document.getElementById("promptBoxes");
    const promptDisplay = document.getElementById("upperSection");
    const savePositivePrompt = document.getElementById("savePositive");
    const saveNegativePrompt = document.getElementById("saveNegative");
    return{posQueue,negQueue,promptInputs,queueContainer,promptDisplay,saveNegativePrompt,savePositivePrompt}
};
//immediately call.
const {posQueue,negQueue,promptInputs,queueContainer,promptDisplay,saveNegativePrompt,savePositivePrompt} = getElements();


//creates arrays for Positive and Negative prompts.
const {posPrompts,negPrompts} = (function (){
    const posPrompts = [];
    const negPrompts = [];
    return {posPrompts,negPrompts}
})();


class Prompt {
    constructor(name,promptText,type,description=""){
        this.name = name;
        this._description = description;
        this._promptText = promptText;
        this.type = type;
    }

    set promptText(input){this._promptText = englishSetter(input).concat("",",");}
    set description(input){this._description = englishSetter(input);}

    get promptText(){return this._promptText;}
    get description(){return this._description;}
}

//temporary
const prompt1 = new Prompt("posprompt1", "girl, intricate, detailed face, high res, photorealistic,upper body, close up, from above, looking up, night, back turned, looking back, pitch black, dark alleyway, graffiti wall, 1girl, backless short black dress, playful, allure, sensation, sultry, pouting, (masterpiece, high quality, best quality)","positive","Back Alley");
const prompt2 = new Prompt("posprompt2","Aesthethic: {2.5D flat-color anime art. draped in shadows with a ring lighting to enhances her unique features.}/nForeground: {A woman with a bright and wispy ethereal mist surrounding her body. The mist creates a dramatic and surreal effect. The girl is wearing an intricate and tattered gown. The bottom of the gown is covered in blood. The woman's face has a blank and cold expression, her eyes are covered by her long blue hair. Holding finger to lips, shush, shushing motion}/nBackground: {A neon-lit night cityscape filled with a swarm of flying doves. The city has large futuristic buildings and strong contrast between light and shadows. There is a hint of danger and intrigue.}","positive","cyberpunk");
posPrompts.push(prompt1,prompt2)
db(posPrompts[1].name)
prompt1.name = "negprompt1";
prompt1.promptText = "low quality, medium quality, blurry, censored, blurry, censored, wrinkles, deformed,lowres, worst quality, normal quality, text, watermark, mutated, Bad art, mutation, deformed iris, deformed pupils, bad limbs, conjoined, featureless, messed up clothes, bad features, incorrect background, incorrect objects, cropped out face, messed up accessories, text in image, piercings, logo";
prompt1.type = "negative";
prompt1.description = "Basic Negative Prompt";
negPrompts.push(prompt1);
db(negPrompts[0].promptText)

//convert to "create cards from prompts"
function createNewPrompt(prompt, child){
    let newPosition = 0;
    let prefix = prompt.type;
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

    idname = shortPrefix + "Card" + newPosition;
    prompt.name = idname
    db(prompt)

    const newCard = document.createElement("div");
    newCard.setAttribute("id",idname);
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
        negQueue.appendChild(newCard);
    }
    else{
        posQueue.appendChild(newCard);
    }

    return p
}

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

//takes queue assigned based on event button.  creates new prompt and adds to positive or negative queue array.
function savePrompt(type){
    const input = document.getElementById("promptInput");
    const prompt = new Prompt(undefined,input.value,type,"");
    if (type === "positive"){
        posPrompts.push(prompt);
        db(posPrompts);
    } 
    else{
        negPrompts.push(prompt);
        db(negPrompts);
    }
    input.value = "";
}

queueContainer.addEventListener("dblclick", copyPromptCardToDisplay);

//saving prompts
savePositivePrompt.addEventListener("click", ()=> savePrompt("positive"));
saveNegativePrompt.addEventListener("click", ()=> savePrompt("negative"));

queueContainer.addEventListener("keypress",labelPromptCards);