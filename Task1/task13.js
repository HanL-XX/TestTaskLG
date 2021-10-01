let array1 = [10,15,20,9,6]
let array2 = [0,0,0,0,1]
let array3 = [120,596,89,1,1]
let k1 = 16
let k2 = 2
let k3 = 91

addTwoNumber = (k,list)=>{
    for(let i=0; i<list.length-1; i++){
        for(let j=i+1; j<list.length; j++){
            if((list[i] + list[j]) == k)
                return true
        }
    }
    return false
}

let output1 = addTwoNumber(k1,array1);
let output2 = addTwoNumber(k2,array2);
let output3 = addTwoNumber(k3,array3);

console.log(output1);
console.log(output2);
console.log(output3);