// C:\fakepath\5b.png



function testar(){
    // let arquivo = document.getElementById("inputfile").value
    // console.log(arquivo);

    const fileInput = document.querySelector("input[type=file]");
const arquivo = fileInput.files[0].name;

console.log(arquivo);


    document.getElementById("imgteste").src = arquivo
    
}