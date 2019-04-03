
function parser(e) {
    let ganancias = [{}];
    let N = 0;
    e.value.split('\n').map(linea => { 
        const lineaA = linea.split(' '); 
        if(["D","M","A","C","I"].includes(lineaA[0])) { 
            if(ganancias[N][lineaA[0]]===undefined) 
                ganancias[N][lineaA[0]]=0 
            ganancias[N][lineaA[0]] += parseFloat(lineaA[1]);
        } else if (lineaA[0] === 'N') { 
            N += 1 
            ganancias[N] = {}; 
        } 
    });
    return ganancias
}
function findMinMax(o) {
    let min = 99999, max = 0;
    let keyMin = undefined, keyMax = undefined
    Object.keys(o).map(key => {
        let v = o[key]

        keyMin = (v < min) ? key : keyMin;
        min = (v < min) ? v : min;

        keyMax = (v > max) ? key : keyMax;
        max = (v > max) ? v : max;
    });
    return [keyMin, keyMax];
  }

  function esMayorComida(o) {
    if(Object.keys(o).length === 0)
        return
    let totalNoComida = Object.keys(o)
        .filter(key => key !== 'A')
        .reduce((a,b) => a+o[b])
    return o['A'] === undefined ? false : o['A'] > totalNoComida
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


function comenzar(){
    const entrada = document.querySelector(".begin");
    const salida = document.querySelector(".finish");
    const listado = ["A","C","D","M","I"];
    salida.value ="";
    //traducir(entrada,salida,listado); // parser
    let ganancias = parser(entrada)
    let myms = ganancias.map(dia => findMinMax(dia));
    console.log(myms);
    let esMayorComidas = ganancias.map(dia => esMayorComida(dia));
    console.log(esMayorComidas);

}