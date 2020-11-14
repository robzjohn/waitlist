
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
window.addEventListener("load", loadWait);


function loadWait(){
    console.log('loaded');


}

function addToWait(event){

    var d = new Date();
    var customer = { "name": nameInput.value, "size": partySize.value, "phone": phoneInput.value, "where": inOut.value }

    waitStorage.setItem(customer.name, JSON.stringify(customer));

    //event.preventDefault();
    const waitQDiv = document.createElement("div");
    waitQDiv.classList.add("customer");

    //Create li
    const newCustomer = document.createElement("li");
    newCustomer.innerHTML = nameInput.value.bold() +":&nbsp;" + "<p>party of " + partySize.value + " for " + inOut.value + "<br>phone: " + phoneInput.value + " <br>added  at: " + d.toLocaleTimeString();
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

    nameInput.value = "";
    phoneInput.value = "";

}

function removeCustomer(event){
    const item = event.target;

    if(item.classList[0] === "remove-btn"){
        const c = item.parentElement;
        c.remove();
        waitStorage.removeItem(extractName(item.parentElement.innerHTML));
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

