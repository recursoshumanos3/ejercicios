function comenzar() {
    const entrada = document.querySelector(".begin");
    const salida = document.querySelector(".finish");
    salida.value = "";
    traducir(entrada,salida);
}

function traducir(e,s) {
    e = e.value.split("\n");
    e.pop();
    while (e.includes("FIN")) {
        //console.log(e.splice(0,e.indexOf("FIN")));
        procesar(e.splice(0,e.indexOf("FIN")),s);
        e.shift();   
    }
}

function procesar(dia,s) {
    dia.shift();
    dia = dia.map(el => el.split(" "));
    console.log(dia);
    let grupos = new Array;
    dia
        .map(el => (el.filter(el2 => el2.length > 1)))
        .map(el => (el.map(el2 => grupos.push(el2))));
    grupos = grupos
                .sort()
                .filter(function(el,ind){if(el !== grupos[ind+1]){return el}});
    console.log(grupos);
    salida(dia,grupos,s);
}

function salida(dia,grupos,s) {
    let b = 0;
    let resultado = "";
    grupos.map(function(el){
        let a = 0;
            dia.map(function(el2,ind2){
                el2.map(function(el3,ind3){
                    if(el3===el){
                        if(dia[ind2][1] > dia[ind2][3]){ind3+1==1 ? a+=2:a+=1;
                        }else{ind3+1==1 ? a+=1:a+=2;}
                    }
                })
            })  
        if(a == b && a!=0){resultado ="EMPATE";
        }else if(a > b){
            b = a;
            resultado = el;
        }
    });
    s.value += resultado + " " + b+ "\n";
}