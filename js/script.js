const previousOperationText = document.querySelector("#operacao-anterior")
const currentOperationText = document.querySelector("#operacao-atual")
const buttons = document.querySelectorAll("#buttons-container button")

class Calculadora{
    constructor(previousOperationText, currentOperationText) {
        this.previousOperationText = previousOperationText
        this.currentOperationText = currentOperationText
        this.currentOperation = ""
    }
    
    // Adicionar digito a tela da calculadora
    addDigit(digit){
        
    // Verificcar sem o numero ja tem Ponto "."
        if(digit === "." && this.currentOperationText.innerText.includes(".")) {
            return
        }

        this.currentOperation = digit
        this.updateScreen()

    }
    // Processar todas eoperações da calculadora
    processOperation(operation) {

    // Verificar sem o Current Value está vazio
        if(this.currentOperationText.innerText === "" && operation !== "C"){
            
    // Mudar operação        
            if(this.previousOperationText.innerText !== ""){
                this.changeOperation(operation)
            }
            return;
        }

        let operationValue
        const previous = +this.previousOperationText.innerText.split(" ")[0];
        const current = +this.currentOperationText.innerText;

        switch(operation) {
            case "+":
               operationValue = previous + current
               this.updateScreen(operationValue, operation, current, previous)             
            break;
            case "-":
               operationValue = previous - current
               this.updateScreen(operationValue, operation, current, previous)             
            break;
            case "/":
               operationValue = previous / current
               this.updateScreen(operationValue, operation, current, previous)             
            break;
            case "*":
               operationValue = previous * current
               this.updateScreen(operationValue, operation, current, previous)             
            break;
            case "DEL":
               this.processDelOperator();  
            break;
            case "CE":
               this.processClearCurrentOperation();  
            break;
            case "C":
                this.processClearCurrentAndPreviousOperation();  
             break;
             case "=":
                this.processEqualOperator();  
             break;
            default:
            return;
        }
    }

    updateScreen(
        operationValue = null, 
        operation = null, 
        current = null, 
        previous = null
        ) {
        
        if(operationValue === null) {
            this.currentOperationText.innerText += this.currentOperation;
        } else {
            if(previous === 0){
                operationValue = current
            }

            this.previousOperationText.innerText = `${operationValue} ${operation}`
            this.currentOperationText.innerText = "";
        }
    }

    changeOperation(operation){

        const mathOperations = ["*", "/", "+", "-"]

        if(!mathOperations.includes(operation)) {
            return
        }

        this.previousOperationText.innerText = 
        this.previousOperationText.innerText.slice(0, -1) + operation;
    }
 // Deletar ultimo digito
    processDelOperator() {
        this.currentOperationText.innerText = 
        this.currentOperationText.innerText.slice(0, -1);
    }
 // Limpar current operation
    processClearCurrentOperation() {
        this.currentOperationText.innerText = "";
    }

// Limpar Current e Previous operation
processClearCurrentAndPreviousOperation() {
    this.currentOperationText.innerText = "" ,
    this.previousOperationText.innerText = "";
}

 // Ativar botão igual funcinando
processEqualOperator(){
    const operation = previousOperationText.innerText.split(" ")[1]
    this.processOperation(operation);
}
}

const calc = new Calculadora(previousOperationText, currentOperationText);


buttons.forEach((btn) => {
    btn.addEventListener("click", (e) =>{
        const value = e.target.innerText;

        if(+value >=0 || value === ".") {
            calc.addDigit(value);
        }   else{
            calc.processOperation(value);
        }
    })
})