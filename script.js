const form = document.querySelector("#form");
const input = form.getElementsByTagName("input");
window.addEventListener("load", startup, false);

let formInput = {
    inputArr: []
}

const getInputArr = () => formInput.inputArr;

function inputNames(){
    for(let i of input){
        formInput.inputArr.push(i.id);
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
    let arr = getInputArr();
    arr.forEach( (elem) => {
        elem.addEventListener("input", () => {
            //add function or send to errorMessage function
        })
    })

}

function errorMessage(errCode){

}
function startup(){
    inputNames();
    createDiv();
    readInput();
}