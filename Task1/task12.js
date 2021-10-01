let input1 = "AAAAAAAADDDWWWWWWWWWEEEE";
let input2 = "WWWEEEEEEEEEEEEEEEEEEEE";
let input3 = "QQQQQQQQQQQQQQQQQQQQQQQQW";
let input4 = "WEEWWEERSSDFGGYYUUUIIIXXD";

runLengthEncoding = (text) => {
  let run = 0,
    current = "",
    last = "",
    encoded = "";

  current = last = text[0];
  for (let i = 1; i <= text.length; i++) {
    if (current !== last) {
      encoded += run + last;
      run = 0;
      last = current;
    }
    current = text[i];
    run++;
  }

  encoded += run + last;

  return encoded;
};

let output1 = runLengthEncoding(input1);
let output2 = runLengthEncoding(input2);
let output3 = runLengthEncoding(input3);
let output4 = runLengthEncoding(input4);

console.log(output1);
console.log(output2);
console.log(output3);
console.log(output4);
