function comenzar(){
    const entrada = document.querySelector(".begin");
    const salida = document.querySelector(".finish");
    const listado = ['D','A','M','I','C'];
    salida.value ="";
    let ganancias = parser(entrada,listado);
    let myms = ganancias.map(dia => findMinMax(dia));
    console.log(myms);
    let esMayorComidas = ganancias.map(dia => mayor(dia));
    console.log(esMayorComidas);
    salida.value = imprimir(myms,esMayorComidas);
}

function parser(e,listado) {
    let ganancias = [{}],N = 0;
    e.value.split('\n').map(linea => { 
        const lineaA = linea.split(' '); 
        if(listado.includes(lineaA[0])) { 
            if(ganancias[N][lineaA[0]]===undefined){ganancias[N][lineaA[0]]=0;} 
            ganancias[N][lineaA[0]] += parseFloat(lineaA[1]);
        } else if (lineaA[0] === 'N') { 
            ganancias[N] = construir(ganancias[N],listado);
            N += 1 
            ganancias[N] = {}; 
        }else{ganancias[N] = construir(ganancias[N],listado);} 
    });
    console.log(ganancias);
    return ganancias
}

function construir(o,l) {
   l = l.map(el => o[el]===undefined ? o[el] = 0:o[el]);
    return o;
}

function findMinMax(o) {
    let min = 99999, max = 0, keyMin = undefined, keyMax = undefined, x=0,y=0;
    Object.keys(o).map(key => {
        let v = o[key];
        keyMin = (v < min) ? key : keyMin;
        min = (v < min) ? v : min;

        keyMax = (v > max) ? key : keyMax;
        max = (v > max) ? v : max;
    });
    Object.values(o).map(ve => ve===min ? x++:"");
    Object.values(o).map(ve => ve===max ? y++:""); 
    x>1 ? keyMin = "Q":"";
    y>1 ? keyMax = "Q":"";   
    return [keyMax ,keyMin];
  }

  function mayor(o) {
    if(Object.keys(o).length === 0){return}
    let totalNoComida = Object.keys(o).filter(key => key !== 'A')
                                        .map(a => a = o[a])
                                        .reduce((c,b) => c+b);
    //console.log(totalNoComida);
    return o['A'] === undefined ? false : o['A'] > totalNoComida
  }

  function imprimir(a,b) {
    let resultado = "";
    //console.log(a,"---",b);
    a.map((el,i) => {
        el.map(el2 => resultado += salida(el2));
        resultado += salida(b[i]) + "\n";
    });
    return resultado;
  }

  function salida(a) {
      switch (a) {
          case "D": a = "DESAYUNO#";
            break;
  
          case "M": a = "MERIENDAS#"; 
            break;

          case "A": a = "COMIDAS#";
            break;

          case "C": a = "COPAS#";   
            break;

          case "I": a = "CENAS#";
            break;

          case "Q": a = "EMPATE#";
            break;

          case true: a = "SI";
            break;

          case false: a = "NO";
            break;
      }
    return a;
  }
