let input1 = "webmaster";
let input2 = "WEbmaster";
let input3 = "web masTer";
let input4 = "WEBMASTER";

getSortAphabet = (text) => {
  return text
    .split("")
    .sort((a, b) => {
      return a.localeCompare(b, undefined, {sensitivity: 'base'}); 
    })
    .join("");
};

let output1 = getSortAphabet(input1);
let output2 = getSortAphabet(input2);
let output3 = getSortAphabet(input3);
let output4 = getSortAphabet(input4);

console.log(output1);
console.log(output2);
console.log(output3);
console.log(output4);
