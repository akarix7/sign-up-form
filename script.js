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
        errDiv.id = `${i.id}-err`;
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
            }else{
                document.getElementById(`${arrId[arrId.indexOf(elem.id)]}-err`).textContent = "";
            }
        })
    })

}

function errorMessage(errCode){
    let pleaseProvide = "Please provide a";

    switch(errCode){
        case 0: updateErrorMessage(`${pleaseProvide} first name`, errCode);
        break;
        case 1: updateErrorMessage(`${pleaseProvide} last name`, errCode);
        break;
        case 2: updateErrorMessage(`${pleaseProvide}n email`, errCode);
        break;
        case 3: updateErrorMessage(`${pleaseProvide} phone number`, errCode);
        break;
        case 4: updateErrorMessage(`${pleaseProvide} password`, errCode);
        break;
        case 5: updateErrorMessage("Passwords do not match", errCode);
        break;
        default: updateErrorMessage("Unknown Error.", 404);
    }
}

function updateErrorMessage(errMessage, code){
    const arrId = getInputIdArr();
    document.getElementById(`${arrId[code]}-err`).textContent = `${errMessage}`;
}

function validatePasswords(){
    const pwd2 = document.getElementById("pwd2");
    pwd2.addEventListener("input", () => {
        if(pwd2.value !== document.getElementById("pwd").value){
            errorMessage(5);
        }else{
            pwd2.textContent = "";
        }
    })
}

function startup(){
    populateInputArr();
    createDiv();
    readInput();
    validatePasswords();
}