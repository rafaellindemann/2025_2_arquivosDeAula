class NomeDaClasse {
    // private declaraVariavel // JAVA
    //#declaraVariavel
    constructor(param1, param2) {
    this.batata = param1
    this.quiabo = param2
    }
    metodoExemplo() {
    // aqui vcs colocam a lógica do método
    let soma = this.batata + this.quiabo
    console.log(`Soma: ${soma}`)
    }
   }
   const objeto = new NomeDaClasse (8, 42)
   objeto.metodoExemplo() 