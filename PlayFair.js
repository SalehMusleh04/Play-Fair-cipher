
function generateAlphabetMatrix(key) {
key = key.toUpperCase().replace(/J/g ,'I');
let Matrix = [];
let used = new Set();
let alphabet = 'ABCDEFGHIKLMNOPQRSTUVWXYZ';

key.split("").forEach(letter => {
    if (!used.has(letter) && alphabet.includes(letter)){
        Matrix.push(letter);
        used.add(letter);

    }
});

for (let char of alphabet){
    if(!used.has(char)){
       Matrix.push(char)
    
    }
}

let Matrix_2D = [];
for(let i = 0 ; i<5 ; i++){
Matrix_2D.push(Matrix.slice(i*5,i*5+5))
}

return Matrix_2D ;
}

function plaintext (text) {
text = text.toUpperCase().replace(/[^A-Z]/g , "").replace(/J/g , "I");
let result = "" ;
for(let i = 0 ; i<text.length ; i+=2){
   let first_char = text[i];
   let second_char = text[i+1]; 

   if(first_char == second_char){
      second_char = "X";
      i--;
   }
   else if (second_char == undefined) {
      second_char = "X";
      i--;
   }
   result += first_char + second_char ; 
}

let two_chars = [];
for(let i = 0 ; i<result.length ; i+=2){
    two_chars.push(result.slice(i , i+2))
}

return two_chars ;
}


function encryption(pairs , matrix) {
  let final_result = "" ;
  let row1 , col1 , row2 , col2 ;
for (let i = 0 ; i<pairs.length ; i++){

let [a,b] = pairs[i] ;

    for(let row = 0 ; row<5 ; row++){

        for(let col = 0 ; col<5 ; col++){
        if (matrix[row][col] == a){
            row1 = row;
            col1 = col;
        }
         if (matrix[row][col] == b){
            row2 = row;
            col2 = col;
        }    


    }
    }

if (row1 == row2 ) {
final_result += matrix[row1][(col1+1)%5] + matrix[row2][(col2+1)%5] ;
}

else if (col1 == col2 ) {
final_result += matrix[(row1+1)%5][col1] + matrix[(row2+1)%5][col2] ;
}

else  {
final_result += matrix[row1][col2] + matrix[row2][col1] ;
}
}

return final_result ;
}

function decryption(pairs , matrix) {
  let final_result = "" ;
  let row1 , col1 , row2 , col2 ;
for (let i = 0 ; i<pairs.length ; i++){

let [a,b] = pairs[i] ;

    for(let row = 0 ; row<5 ; row++){

        for(let col = 0 ; col<5 ; col++){
        if (matrix[row][col] == a){
            row1 = row;
            col1 = col;
        }
         if (matrix[row][col] == b){
            row2 = row;
            col2 = col;
        }    


    }
    }

if (row1 == row2 ) {
final_result += matrix[row1][(col1+4)%5] + matrix[row2][(col2+4)%5] ;
}

else if (col1 == col2 ) {
final_result += matrix[(row1+4)%5][col1] + matrix[(row2+4)%5][col2] ;
}

else  {
final_result += matrix[row1][col2] + matrix[row2][col1] ;
}
}

return final_result ;
}




function PlayfairAction(event) {
    const key = document.getElementById("keyInput").value;
    const text = document.getElementById("plaintextInput").value;
    const matrix = generateAlphabetMatrix(key);
    const pairs = plaintext(text);

    let result ;

    if (event.target.id === "enBtn" ){
             result = encryption(pairs , matrix);
    } else if (event.target.id === "deBtn" ) {
       result =  decryption(pairs , matrix);
    } 


if (key !== "" &&  text !== "" ){
     localStorage.setItem("PlayFairResult" , result);
      localStorage.setItem("playfairMatrix", JSON.stringify(matrix));
     window.open("grid.html" , "_blank")
}
else {
  alert("Please Enter The Key & Text values")
}

}


function displayMatrix() {
  const matrix = JSON.parse(localStorage.getItem("playfairMatrix"));
  const square = document.querySelectorAll(".square-content");
  square.forEach(elementContent => {elementContent.innerHTML = "";});
  let letters =  matrix.flat() ;

  square.forEach((elementContent , index) => {
   elementContent.innerHTML = letters[index] ;
   if(letters[index] === "I"){
    elementContent.innerHTML = "I/J";
   }

  });



}




function PlayFairResult() {
   const result = localStorage.getItem("PlayFairResult");
   document.getElementById("final").innerHTML = result ;  
}

