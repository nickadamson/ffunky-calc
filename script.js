// Math Functions
const add = (a, b) => (Number(a) + Number(b));
const subtract = (a, b) => (a - b);
const multiply = (a, b) => (a * b);
const divide = (a, b) => Number((a / b).toFixed(10)); //accurate to 10 decimal places

// Routes the 3 array elements to respective math functions
const operate = (a, b, operator) => {
    if (operator === '+') {
        return add(a, b).toString();
    } else if (operator === '-') {
        return subtract(a, b).toString();
    } else if (operator === "*") {
        return multiply(a, b).toString();
    } else if (operator === '/') {
        return divide(a, b).toString();
    }
}

// Gets and sanitizes user input
function getInput() {
    let dirtyInput = document.getElementById("input").value;
    // Removes any letters and/or script tags, then surrounds operators with "~". The string will be split() into an array @ "~"s.
    let cleanInput = dirtyInput.replaceAll(/[A-Za-z=]/g, '').replaceAll(/(<|>)/g, '').replaceAll(/(\+|-|\*|\/)/g, '~$&~'); 

    return cleanInput;
}

// main()
function solve() {

    //When converting sanitized input string, "~" will split the string so that each element is either a term, or an operator.
    let equations = getInput().split("~");
    
    console.table(equations);
    let loopIteration = 1;

    
    while (equations.length > 1) {
        console.groupCollapsed('Step ' + loopIteration + ' Table')

        if (equations.indexOf("*") != -1 || equations.indexOf("/") != -1) {

            if (equations.indexOf("/") == -1) {
                let timesIndex = equations.indexOf("*");
                answer = operate(equations[(timesIndex - 1)], equations[(timesIndex + 1)], equations[timesIndex]);
                equations.splice((timesIndex - 1), 3, answer);

            } else if (equations.indexOf("*") == -1) {
                let divideIndex = equations.indexOf("/");
                answer = operate(equations[(divideIndex - 1)], equations[(divideIndex + 1)], equations[divideIndex]);
                equations.splice((divideIndex - 1), 3, answer);

            } else if (equations.indexOf("*") < equations.indexOf("/")) {
                let timesIndex = equations.indexOf("*");
                answer = operate(equations[(timesIndex - 1)], equations[(timesIndex + 1)], equations[timesIndex]);
                equations.splice((timesIndex - 1), 3, answer);

            } else if (equations.indexOf("/") < equations.indexOf("*")) {
                let divideIndex = equations.indexOf("/");
                answer = operate(equations[(divideIndex - 1)], equations[(divideIndex + 1)], equations[divideIndex]);
                equations.splice((divideIndex - 1), 3, answer);

            } else {
                console.log('Error: solve() PE>MD<AS'); 
            }

        } else if (equations.indexOf("+") != -1 || equations.indexOf("-") != -1) {
            
            if (equations.indexOf("+") == -1) {
                let minusIndex = equations.indexOf("-");
                answer = operate(equations[(minusIndex - 1)], equations[(minusIndex + 1)], equations[minusIndex]);
                equations.splice((minusIndex - 1), 3, answer);

            } else if (equations.indexOf("-") == -1) {
                let plusIndex = equations.indexOf("+");
                answer = operate(equations[(plusIndex - 1)], equations[(plusIndex + 1)], equations[plusIndex]);
                equations.splice((plusIndex - 1), 3, answer);

            } else if (equations.indexOf("+") < equations.indexOf("-")) {
                let plusIndex = equations.indexOf("+");
                answer = operate(equations[(plusIndex - 1)], equations[(plusIndex + 1)], equations[plusIndex]);
                equations.splice((plusIndex - 1), 3, answer);

            } else if (equations.indexOf("-") < equations.indexOf("+")) {
                let minusIndex = equations.indexOf("-");
                answer = operate(equations[(minusIndex - 1)], equations[(minusIndex + 1)], equations[minusIndex]);
                equations.splice((minusIndex - 1), 3, answer);

            } else {
                console.log('Error: solve() PEMD>AS<'); 
            }

        } else {
            console.log('Error Invalid Data'); 
        }

        console.table(equations);
        console.groupEnd();

        loopIteration = (loopIteration + 1);
    }
    let problemSolution = equations[0];
    
    resultsBox.innerHTML = problemSolution;
    lastFormulaText.innerHTML = getInput().replaceAll('~', '').concat('=');
    opButtons.forEach((opButton) => {
        opButton.classList.remove('active');
        opButton.classList.remove('disabled');
        opButton.classList.replace('concave', 'flat');
        opButton.classList.replace('convex', 'flat');
    });
    inputText.value = '';

    console.log(problemSolution);
}

//results box
const resultsBox = document.getElementById('results');

//buttons
const numButtons = document.querySelectorAll('.numbtn');

const opButtons = document.querySelectorAll('.opbtn');

opButtons.forEach((opButton) => {
    opButton.addEventListener('click', () => {
        if (document.getElementById("input").value === '' && document.getElementById('results').innerHTML.length != 0) {
            document.getElementById("input").value = document.getElementById('results').innerText.concat(opButton.id);
            document.querySelectorAll('.opbtn').forEach((opDisabled) => {
                opDisabled.classList.add('disabled');
                opDisabled.classList.replace('flat', 'convex');
            });
            opButton.classList.add('active');
            opButton.classList.replace('convex', 'concave');
        } else if (document.getElementById("input").value === '' && document.getElementById('results').innerHTML.length == 0)  {
            opButton.animate([
                {backgroundColor: "rgba(233, 17, 17, 0.5)"}
            ], {
                duration: 500,
                iterations: 1
            });
        } else if (document.getElementById("input").value.toString().endsWith('+') == true || document.getElementById("input").value.toString().endsWith('-') == true || document.getElementById("input").value.toString().endsWith('/') == true || document.getElementById("input").value.toString().endsWith('*') == true) {
            document.querySelector('.active').classList.replace('concave', 'convex');
            document.querySelector('.active').classList.replace('active', 'disabled');
            document.getElementById("input").value = document.getElementById("input").value.toString().slice(0, -1).concat(opButton.id);
            opButton.classList.replace('disabled', 'active');
            opButton.classList.replace('convex', 'concave');
        } else if (opButton.classList.contains('disabled') != true && opButton.classList.contains('active') != true) {
            document.getElementById("input").value = document.getElementById("input").value.concat(opButton.id);
            document.querySelectorAll('.opbtn').forEach((opDisabled) => {
                opDisabled.classList.add('disabled');
                opDisabled.classList.replace('flat', 'convex');
            });
            opButton.classList.replace('disabled', 'active');
            opButton.classList.replace('convex', 'concave');
        }
    });
});

const equalSign = document.getElementById('=');
equalSign.addEventListener('click', () => solve());

const inputText = document.getElementById('input');
const lastFormulaText = document.getElementById('lastFormula');
const clearButton = document.getElementById('clear')
clearButton.addEventListener('click', () => clear());
function clear() {
    inputText.value = '';
    resultsBox.innerHTML = '';
    lastFormulaText.innerHTML = '';
    opButtons.forEach((opButton) => {
        opButton.classList.remove('disabled');
        opButton.classList.remove('active');
        opButton.classList.replace('convex', 'flat');
        opButton.classList.replace('concave', 'flat');
    })
}

const decimalButton = document.getElementById('.')
decimalButton.addEventListener('click', () => {
    if (document.getElementById("input").value.toString().endsWith('.') == true) {
        oneDecimal();
        decimalButton.animate([
            {backgroundColor: "rgba(233, 17, 17, 0.5)"}
        ], {
            duration: 500,
            iterations: 1
        });
    }
})

function oneDecimal() {
    document.getElementById('input').value = document.getElementById('input').value.slice(0, -1);
} 

inputText.addEventListener('keyup', function (e) {
    if (e.key === 'Enter' || e.key === '=') {
        solve();
    } else if (e.key === '.' || e.key === 'Period') {
        if (document.getElementById("input").value.toString().endsWith('..') == true) {
            oneDecimal();
        }
    }
});

// function buttonLogic() {
//     inputText.addEventListener('keyup', function (e) {
//         if (e.key === 'Enter' || e.key === '=') {
//             solve();
//         } else if (e.key === '.') {
//             if (document.getElementById("input").value.test(/(\+|-|\*|\/)+\d*\.\d*\.*/g) == 'true') {
//                 oneDecimal();
//             }
//         }
//     });
// }

numButtons.forEach((numButton) => {
    numButton.addEventListener('click', () => {
        document.getElementById("input").value = document.getElementById("input").value.concat(numButton.innerHTML);
        opButtons.forEach((opButton) => {
            opButton.classList.remove('disabled');
            opButton.classList.remove('active');
            opButton.classList.replace('concave', 'flat');
            opButton.classList.replace('convex', 'flat');
        })
    })
});