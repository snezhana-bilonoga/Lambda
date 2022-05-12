const testString = 'abcde';

// 1 dot combinations solution
const oneDotArr = [];
for (let i = 0; i < testString.length - 1; i++) {
    const start = testString.slice(0, i + 1);
    const end = testString.slice(i + 1);
    const result = [start, end].join('.');
    oneDotArr.push(result);
}
console.log(oneDotArr);

// 2 dots combinations solution
const twoDotArr = [];
for (let i = 0; i < testString.length - 1; i++) {
    const start = testString.slice(0, i + 1);

    for (let j = i + 1; j < testString.length - 1; j++) {
        const middle = testString.slice(i + 1, j + 1);
        const end = testString.slice(j + 1);
        const result = [start, middle, end].join('.');
        twoDotArr.push(result);
    }
}
console.log(twoDotArr);

// 3 dots combinations solution
const threeDotArr = [];
for (let i = 0; i < testString.length - 1; i++) {
    const start = testString.slice(0, i + 1);

    for (let j = i + 1; j < testString.length - 1; j++) {
        const middle = testString.slice(i + 1, j + 1);

        for (let k = j + 1; k < testString.length - 1; k++) {
            const afterMiddle = testString.slice(j + 1, k + 1);
            const end = testString.slice(k + 1);
            const result = [start, middle, afterMiddle, end].join('.');
            threeDotArr.push(result);
        }
    }
}
console.log(threeDotArr);

// Generalization using recursion
const dotArr = [];
function getDotArr(str, i) {
    for (; i < str.length - 1; i++) {
        const start = str.slice(0, i + 1);
        const end = str.slice(i + 1);
        const result = [start, end].join('.');
        dotArr.push(result);
        getDotArr(result, i + 2);
    }
}
getDotArr(testString, 0);
console.log(dotArr);

// Prettified/optimized recursion solution
function getDotCombinations(baseString) {
    const result = [baseString];

    function generateCombination(str, i) {
        for (; i < str.length - 1; i++) {
            const start = str.slice(0, i + 1);
            const end = str.slice(i + 1);
            const combination = [start, end].join('.');
            result.push(combination);
            generateCombination(combination, i + 2);
        }
    }

    generateCombination(baseString, 0);
    return result;
}
// Result compared with the previous 1/2/3 solutions
console.log(getDotCombinations(testString));
