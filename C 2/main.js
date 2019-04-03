function comenzar(){
    const entrada = document.querySelector(".begin");
    const salida = document.querySelector(".finish");
    const listado = ["A","C","D","M","I"];
    salida.value ="";
    traducir(entrada,salida,listado);
}

function traducir(e,s,l){
    e = e.value.split("\n");
    e.pop();
    while (e.includes("N 0")) {
        procesar(e.splice(0,e.indexOf("N 0")),s,l);
        e.shift();
    }
    procesar(e,s,l);
}

function procesar(dia,s,l) {
  //  console.log(dia);
    l =  l.map(el => {
        let contador = 0;
        dia.map(el2 =>{
            if(el2.substring(0,1)===el){contador += parseFloat(el2.substring(2,el2.length));};
        });
        const resultado = el + " " + contador;
        return resultado;
    });
//    console.log(l);
    imprimir(l,s);
}

function imprimir(l,s) {
    const numeral = l.map(el => {return parseFloat(el.substring(2,el.length))});
    const letral = l.map(el => {return el.substring(0,1);});
    salir(numeral,letral,s);
}

function salir(n,l,s) {
   const max = Math.max(...n);
   n.indexOf(max) !== n.lastIndexOf(max) ? s.value += "EMPATE#":s.value += elegir(l[n.indexOf(max)]);
   const min = Math.min(...n);
   n.indexOf(min) !== n.lastIndexOf(min) ? s.value += "EMPATE#":s.value += elegir(l[n.indexOf(min)]);
   n[0] > n.reduce(function(d , el) {return d + el})/n.length ? s.value += "SI\n":s.value += "NO\n";
}

function elegir(l){
    console.log(l);
    switch (l) {
        case "A":
            l = "Comidas#";
            break;

        case "C":
            l = "Copas#";
            break;

        case "D":
            l = "Desayuno#";
            break;

        case "M":
            l = "Meriendas#";
            break;
            
        case "I":
            l = "Cenas#";
            break;

        default:
            l = "desconocido#";
            break;
    }
    return l;
}