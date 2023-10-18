const displayHistory = document.querySelector(".display-history");
const display = document.querySelector(".display-input");
const tempResult = document.querySelector(".temp-result");
const allClear = document.querySelector(".all-clear");
const operations = document.querySelectorAll(".operation");
const numbers = document.querySelectorAll(".number");
const equal = document.querySelector(".equal");
const lastClear = document.querySelector(".last-entity-clear")

let dis1Num ="";
let dis2Num ="";
let result =null;
let lastOperation ="";
let haveDot = false;

numbers.forEach((number) => {
    number.addEventListener("click", (e) => {
        if (e.target.innerText === "." && !haveDot) {
            console.log(e.target.innerText);
            haveDot =true
        }else if(e.target.innerText === "." && haveDot){
            return;
        }
        dis2Num += e.target.innerText;
        display.innerText = dis2Num;
    })
});

operations.forEach((operation) => {
    operation.addEventListener("click", (e) => {
        if(!dis2Num) return;
        haveDot = false;
        const operationName = e.target.innerText;
        if (dis1Num && dis2Num && lastOperation) {
            mathOperation()
        }else {
            result = parseFloat(dis2Num);
        }
        clearVar(operationName);
        lastOperation = operationName
    })
})

function clearVar(name = "") {
    dis1Num += dis2Num + " " + name + " ";
    displayHistory.innerText = dis1Num;
    display.innerText = "";
    dis2Num = "";
    tempResult.innerText = result;
  }
function mathOperation () {
    if (lastOperation === "x") {
        result = parseFloat (result) * parseFloat(dis2Num)
    }else if(lastOperation === "+"){
        result = parseFloat (result) + parseFloat(dis2Num)
    }else if (lastOperation === "-"){
        result = parseFloat (result) - parseFloat(dis2Num)
    }else if (lastOperation === "/"){
        result = parseFloat (result) / parseFloat(dis2Num)
    }else if (lastOperation === "%"){
        result = parseFloat (result) % parseFloat(dis2Num)
    }
}

equal.addEventListener ("click", (e) => {
    if(!dis1Num || !dis2Num) return;
    haveDot = false;
    mathOperation ()
    clearVar ();
    display.innerText = result
    tempResult.innerText = "";
    dis2Num = result;
    dis1Num = "";
})

allClear.addEventListener ("click", () => {
    dis1Num = "";
    dis2Num = "";
    haveDot = false;
    displayHistory.innerText = "";
    display.innerText = "";
    result = "";
    lastOperation = "";
    tempResult.innerText = "";
})

lastClear.addEventListener ("click", () => {
    dis2Num = "";
    display.innerText = "";
});

window.addEventListener("keydown", (e)=> {
    if(
        e.key === "0" ||
        e.key === "1" ||
        e.key === "2" ||
        e.key === "3" ||
        e.key === "4" ||
        e.key === "5" ||
        e.key === "6" ||
        e.key === "7" ||
        e.key === "8" ||
        e.key === "9" ||
        e.key === "." 
    ) {
        clickButton(e.key);
    }else if (e.key === "+" || e.key === "-" || e.key === "/" || e.key === "%"){
        clickOperation(e.key);
    } else if (e.key === "*"){
        clickOperation("x");
    }else if (e.key == "Enter" || e.key === "="){
        clickEqual();
    }else if (e.key == "Backspace") {
        clickClear()
    }
});

function clickButton(key) {
    numbers.forEach((button) => {
        if(button.innerText === key) {
            button.click()
        }
    })
}

function clickOperation(key) {
    operations.forEach((operation) => {
        if(operation.innerText === key) {
            operation.click()
        }
    })
}

function clickEqual() {
    equal.click()
}

function clickClear() {
    allClear.click()
}