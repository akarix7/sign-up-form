const form = document.querySelector("#form");
const input = form.getElementsByTagName("input");
window.addEventListener("load", startup, false);

let formInput = {
    fullInputArr: [],
    inputIdArr: []
}

const getFullInputArr = () => formInput.fullInputArr;
const getInputIdArr = () => formInput.inputIdArr;

function populateInputArr(){
    for(let i of input){
        formInput.fullInputArr.push(i);
        formInput.inputIdArr.push(i.id);
    }
}

function insertDiv(newNode, existingNode){
    existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
}

function createDiv(){
    for(let i of input){
        let errDiv = document.createElement("div");
        errDiv.className = `${i.id}-err`;
        //document.querySelector(`#${i.id}`).nextSibling
        insertDiv(errDiv, document.querySelector(`#${i.id}`));
    }
}

function readInput(){
    const arr = getFullInputArr();
    const arrId = getInputIdArr();

    arr.forEach( (elem) => {
        elem.addEventListener("input", () => {
            if(arrId.includes(elem.id) && document.querySelector(`#${elem.id}`).value === ""){
                errorMessage(arrId.indexOf(elem.id));
            }
        })
    })

}

function errorMessage(errCode){
    let pleaseProvide = "Please provide a";

    switch(errCode){
        case 0: updateErrorMessage(`${pleaseProvide} first name`);
        break;
        case 1: updateErrorMessage(`${pleaseProvide} last name`);
        break;
        case 2: updateErrorMessage(`${pleaseProvide}n email`);
        break;
        case 3: updateErrorMessage(`${pleaseProvide} phone number`);
        break;
        case 4: updateErrorMessage(`${pleaseProvide} password`);
        break;
        case 5: updateErrorMessage(`${pleaseProvide} matching password.`);
        break;
        default: updateErrorMessage("Unknown Error.");
    }
}

function updateErrorMessage(errMessage){
    console.log(errMessage);
}

function startup(){
    populateInputArr();
    createDiv();
    readInput();
}