
//Selectors
const nameInput = document.querySelector(".name-input");
const submitButton = document.querySelector(".submit-button");
const waitQ = document.querySelector(".wait-queue");

//Event Listeners
submitButton.addEventListener("click", addToWait);

function addToWait(event){

    var d = new Date();

    event.preventDefault();
    const waitQDiv = document.createElement("div");
    waitQDiv.classList.add("customer");

    //Create li
    const newCustomer = document.createElement("li");
    newCustomer.innerHTML = nameInput.value.bold().big() + " added  at: " + d.toLocaleTimeString().bold();
    newCustomer.classList.add('customer-item');
    waitQDiv.appendChild(newCustomer);

    //Check button
    const completedButton = document.createElement('button');
    completedButton.innerText = 'send text';
    completedButton.classList.add('btn');
    waitQDiv.appendChild(completedButton);

    //Check delete button
    const trashButton = document.createElement('button');
    trashButton.innerText = 'remove';
    trashButton.classList.add('btn');
    waitQDiv.appendChild(trashButton);

    waitQ.appendChild(waitQDiv);

    nameInput.value = "";

}