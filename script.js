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
        elem.addEventListener("input", () => {
            if(document.getElementById(`${arrId[arrId.indexOf(elem.id)]}`).validity.patternMismatch){
                errorMessage((arrId.indexOf(elem.id)+3)*2);
            }
        });
    })
}

function errorMessage(errCode){
    let pleaseProvide = "Please provide a";
    console.log("what");

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
        case 6:
        case 8: updateErrorMessage("Please enter characters only.", errCode);
        break;
        case 10: updateErrorMessage("Please enter a valid email.\nexample@domain.com", errCode);
        break;
        case 12: updateErrorMessage("Please follow format with dashes: 000-000-0000", errCode);
        break;
        case 14: updateErrorMessage("Include at least 1 capital letter\n\n" +
            "Include at least 1 number\n\n" + "Must be at least 8 characters.", errCode);
        break;
        default: updateErrorMessage("Unknown Error.", 404);
    }
}

function updateErrorMessage(errMessage, code){
    const arrId = getInputIdArr();
    if(code < 6)
        document.getElementById(`${arrId[code]}-err`).textContent = `${errMessage}`;
    else{
        code = (code/2) - 3;
        document.getElementById(`${arrId[code]}-err`).textContent = `${errMessage}`;
    }
}

function validatePasswords(){
    const pwd2 = document.getElementById("pwd2");
    pwd2.addEventListener("input", () => {
        console.log(pwd2.value);
        console.log(document.getElementById("pwd").value);
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