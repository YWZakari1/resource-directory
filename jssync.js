// console.log("first");
// setTimeout(function(){
//    console.log("second");
// },5000)

// console.log("third");


function firstF(parameter){
    console.log("first fuunction")
    parameter()
}


function secondF(){
    console.log("second function")
}


// callback

firstF(secondF)