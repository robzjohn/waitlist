
//Selectors
const nameInput = document.querySelector(".name-input");
const phoneInput = document.querySelector(".phone-input");
const inOut = document.getElementById("in-or-out");
const partySize = document.getElementById("party-size");
const submitButton = document.querySelector(".submit-btn");
const waitQ = document.querySelector(".wait-queue");

const waitStorage = window.localStorage;

//Event Listeners
submitButton.addEventListener("click", addToWait);
waitQ.addEventListener("click", removeCustomer);
waitQ.addEventListener("click", sendText);
window.addEventListener("load", loadWait);


function loadWait(){
    console.log('loaded');
    console.log(waitStorage);
    for(let name in waitStorage){
        if(typeof(waitStorage[name]) == 'string'){
            
            addCustomer(JSON.parse(waitStorage[name]));
        }
    }


}


function addToWait(event){

    var customer = { "name": nameInput.value, "size": partySize.value, "phone": phoneInput.value, "where": inOut.value }

    waitStorage.setItem(customer.name, JSON.stringify(customer));

    addCustomer(customer);

    nameInput.value = "";
    phoneInput.value = "";

}

function addCustomer(c){

    var d = new Date();

    //event.preventDefault();
    const waitQDiv = document.createElement("div");
    waitQDiv.classList.add("customer");

    //Create li
    const newCustomer = document.createElement("li");
    newCustomer.innerHTML = c.name +":&nbsp;" + "<p>party of " + c.size + " for " + c.where + "<br>phone: " + c.phone + " <br>added  at: " + d.toLocaleTimeString();
    newCustomer.classList.add('customer');
    waitQDiv.appendChild(newCustomer);

    //Check button
    const sendButton = document.createElement('button');
    sendButton.innerText = 'send text';
    sendButton.classList.add('send-btn');
    waitQDiv.appendChild(sendButton);

    //Check delete button
    const removeButton = document.createElement('button');
    removeButton.innerText = 'remove';
    removeButton.classList.add('remove-btn');
    waitQDiv.appendChild(removeButton);

    waitQ.appendChild(waitQDiv);

    
}

function removeCustomer(event){
    let item = event.target;

    if(item.classList[0] === "remove-btn"){
        let c = item.parentElement;
        c.remove();
        waitStorage.removeItem(extractName(item.parentElement.innerHTML));
    }

}

function sendText(event){
    let item = event.target;

    if(item.classList[0] === 'send-btn'){
        item.classList.add('sent');
        console.log(item.innerHTML = 'message sent');
        console.log(JSON.parse(waitStorage.getItem(extractName(item.parentElement.innerHTML))).phone);

        

    }
}

function extractName(str){

    let l = str.slice(21);
    let result = "";
    for(let i = 0; i < l.length; i++){
        if(l[i] == ":"){
            return result;
        } else {
            result += (l[i]);
        }
    }
    return result;
}

function printStorage(){
    console.log(waitStorage);
}

function clearStorage(){
    waitStorage.clear();
}

