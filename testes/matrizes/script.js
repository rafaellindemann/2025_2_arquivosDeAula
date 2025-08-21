let linhas = Number(prompt("Número de linhas: ")) 
let colunas = Number(prompt("Número de colunas: ")) 
let mi = Number(prompt("Mult i: ")) 
let ei = Number(prompt("Exp i: ")) 
let mj = Number(prompt("Mult j: ")) 
let ej = Number(prompt("Exp j: "))
const a = []
for(let i=0; i<linhas; i++){
    a.push([])
}

for(let i=0; i<linhas; i++){
    for(let j=0; j<colunas; j++){
        // a[i].push(i+1 + j+1)
        a[i].push(mi*(i+1)**ei + mj*(j+1)**ej)
    }
}

console.table(a);