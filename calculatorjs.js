const messageSelector = document.querySelector(".message")
const numberSelector = document.querySelectorAll(".number")
const displayContentSelector = document.querySelector('.displayContent')
const clearSelector = document.querySelector(".clearButton")
const allOperatorsSelector = document.querySelectorAll(".operator")
const equalSelector = document.querySelector('.equalButton')
const plusButtonSelector = document.querySelector('.plusButton')
const minusButtonSelector = document.querySelector('.minusButton')
const divideButtonSelector = document.querySelector('.divideButton')
const multiplyButtonSelector = document.querySelector('.multiplyButton')
const comaButtonSelector = document.querySelector(".comaButton")
let waitingForInput

function addResult(){
  displayContentSelector.textContent = Number(displayContentSelector.textContent) + Number(memoryValue)
  waitingForInput = true
  action ="none"
}

function minusResult(){
  displayContentSelector.textContent = (Number(memoryValue) - Number(displayContentSelector.textContent))
  waitingForInput = true
  action ="none"
}

function multiplyResult(){
  displayContentSelector.textContent = Number(memoryValue) * Number(displayContentSelector.textContent)
  waitingForInput = true
  action ="none"
}

function divideResult(){
  displayContentSelector.textContent = Number(memoryValue) / Number(displayContentSelector.textContent)
  waitingForInput = true
  action ="none"
}

function clearDisplay(){
  displayContentSelector.textContent = 0
}

function clearMemory(){
  memoryValue = 0
  
}

function removeActive(){
  allOperatorsSelector.forEach((each) => {
    each.classList.remove('active')
  })
}

numberSelector.forEach((element) => {
  element.addEventListener('click', () => {
    function enterNumber() {
      if (displayContentSelector.textContent.length <11){
        if (displayContentSelector.textContent == 0 && !displayContentSelector.textContent.includes('.') ) {
        displayContentSelector.textContent = element.textContent
        }
        else {
          displayContentSelector.textContent += element.textContent
        }
      }
    }
    if(waitingForInput == true){
      displayContentSelector.textContent = element.textContent
      waitingForInput = false
    }
    else {
      enterNumber()
    }
  })
})

clearSelector.addEventListener('click',() => {
  clearDisplay()
  clearMemory()
  removeActive()
  waitingForInput = 'undefined'
})

allOperatorsSelector.forEach((selected) => {
  selected.addEventListener('click', () => {
  removeActive()
   selected.classList.add('active')
  })
})


equalSelector.addEventListener('click', () => {
  removeActive()
  if (action === "add"){
    addResult()
  }
  else if (action ==="substract"){
    minusResult()
  }
  else if (action ==="divide"){
    divideResult()
  }
  else if (action ==="multiply"){
    multiplyResult()
  }
  memoryValue = displayContentSelector.textContent
  
  // Following will produce desired output if display screen is to small to display full result
  if (displayContentSelector.textContent.includes(".") && !displayContentSelector.textContent.includes("e") && displayContentSelector.textContent.length >11){
    let lengthsplitter = String(displayContentSelector.textContent).split('.')
    displayContentSelector.textContent = Number(displayContentSelector.textContent).toFixed(11 - lengthsplitter[0].length)
    messageSelector.textContent = `Warning! Decimal places shortened to ${11 - lengthsplitter[0].length} due to limited width of calculator display`
  }
  
  else if (displayContentSelector.textContent > 99999999999 || displayContentSelector.textContent < -99999999999 ){
      displayContentSelector.textContent = Number(displayContentSelector.textContent).toExponential(6)
    
  }
})

plusButtonSelector.addEventListener('click', () => {
  action="add"  
  if (waitingForInput == true || (displayContentSelector.textContent!==0 && waitingForInput == false)){  
  }
  else {
  waitingForInput=true
  memoryValue=displayContentSelector.textContent
  }
})

minusButtonSelector.addEventListener('click', () => {
  action="substract"  
  if (waitingForInput == true || (displayContentSelector.textContent!==0 && waitingForInput == false)){ 
  }
  else {
  waitingForInput=true
  memoryValue=displayContentSelector.textContent
  }
})

multiplyButtonSelector.addEventListener('click', () => {
  action="multiply"
  if (waitingForInput == true || (displayContentSelector.textContent!==0 && waitingForInput == false)){ 
  }
  else {
  waitingForInput=true
  memoryValue=displayContentSelector.textContent
  }
})

divideButtonSelector.addEventListener('click', () => {
  action="divide"  
  if (waitingForInput == true || (displayContentSelector.textContent!==0 && waitingForInput == false)){ 
  }
  else {
  waitingForInput=true
  memoryValue=displayContentSelector.textContent
  }
})

comaButtonSelector.addEventListener('click',() => {
  if (!displayContentSelector.textContent.includes(".") && waitingForInput === false){
    displayContentSelector.textContent += "."
  } 
})

