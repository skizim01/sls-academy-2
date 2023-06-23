const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let inputData = '';

function sortAlphabetically(data) {
    return data.sort();
}

function sortNumbersAscending(data) {
    return data.sort((a, b) => a - b);
}

function sortNumbersDescending(data) {
    return data.sort((a, b) => b - a);
}

function sortByWordLength(data) {
    return data.sort((a, b) => a.length - b.length);
}

function filterUniqueWords(data) {
    const uniqueWords = new Set();
    const result = [];
    for (let i = 0; i < data.length; i++) {
        const word = data[i];
        if (!/\d/.test(word)) {
            if (!uniqueWords.has(word)) {
                result.push(word);
                uniqueWords.add(word);
            }
        }
    }
    return result;
}


function filterUniqueValues(data) {
    return [...new Set(data)];
}

function displayOperations() {
    console.log('Please select an operation:');
    console.log('1. Sort words alphabetically');
    console.log('2. Show numbers from lesser to greater');
    console.log('3. Show numbers from bigger to smaller');
    console.log('4. Display words in ascending order by number of letters');
    console.log('5. Show only unique words');
    console.log('6. Display only unique values');
    console.log('0. Exit');
}

function processInput(operation, data) {
    let result;
    switch (operation) {
        case '1':
            result = sortAlphabetically(data);
            break;
        case '2':
            result = sortNumbersAscending(data);
            break;
        case '3':
            result = sortNumbersDescending(data);
            break;
        case '4':
            result = sortByWordLength(data);
            break;
        case '5':
            result = filterUniqueWords(data);
            break;
        case '6':
            result = filterUniqueValues(data);
            break;
        case '0':
            console.log('Exiting the program...');
            rl.close();
            process.exit(0);
            return;
        default:
            console.log('Invalid operation!');
            return;
    }

    console.log('Result:', result.join(' '));
}

function getUserInput() {
    if (!inputData) {
        rl.question('Enter data (space-separated): ', (input) => {
            inputData = input;
            displayOperations();
            getUserSelection();
        });
    } else {
        displayOperations();
        getUserSelection();
    }
}

function getUserSelection() {
    rl.question('Enter the operation number: ', (selection) => {
        processInput(selection, inputData.split(' '));
        getUserInput();
    });
}

getUserInput();
