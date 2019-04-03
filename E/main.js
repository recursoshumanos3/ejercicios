function comenzar(){
    const entrada = document.querySelector(".begin");
    const salida = document.querySelector(".finish");
    salida.value ="";
    traducir(entrada,salida);
}
function traducir(e,s) {
    e = e.value.split("\n");
    e.pop();
    e = e.map(el => el.split(" "));
    console.log(e);
    procesar(e,s);
}

function procesar(e,s) {
    e.map(el => {
        const a = parseFloat(el[0])/1000;
        const b = parseFloat(el[1]);
        const c = parseFloat(el[2]/3600);
        console.log("resultado: " +  a/c+ " < " + b);
        if(a> 0 && b > 0 && c > 0){
            if(a / c < b){s.value += "OK";
            }else if(a / c > b && a / c < b * 1.2){s.value += "MULTA";
            }else{s.value += "PUNTOS";}
        }else{s.value +="ERROR";}   
        s.value +="\n";
    })
}