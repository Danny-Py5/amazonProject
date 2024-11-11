import { formatCurrency } from "../scripts/utils/money.js";


console.log('test suite: format currency')

// test case 1     -------------  basic test case
console.log('convert cents to dollars')
console.log(typeof formatCurrency(2095))
if (formatCurrency(2095) === '20.95') {
    console.log('Test Passed')
} else {
    console.log('Test Failed')
}


// test case 2    -------------  edge case
console.log('works with 0')
if (formatCurrency(0) === '0.00'){
    console.log('Test Passed');
} else {
    console.log("Test Failed")
}

// test case 3     -------------  edge case
console.log('rounds up to the nearest cents')
if (formatCurrency(2000.5) === '20.01'){
    console.log("Test Passed")
} else {
    console.log("Test Failed")
}

// test case 4     -------------  edge case
if (formatCurrency(2000.4) === '20.00'){
    console.log("Test Passed")
} else {
    console.log("Test Failed")
}


