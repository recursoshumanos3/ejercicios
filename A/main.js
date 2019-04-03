function comenzar(){
    const entrada = document.querySelector("textarea");
    const salida = document.querySelector("textarea:last-of-type");
    salida.value = "";
    proceso(entrada,salida);
}

function proceso(E,S){
    /*
    S.value = "";
    let array = "";
    E.value === "" ? "": array = E.value.split("\n");
    for(z = 0 ;z < array.length;z++){
        S.value += cod_barras(array[z]);
    }*/
    console.log( E.value.split("\n"));
    E.value.split("\n")
        .map(l =>  S.value += cod_barras(l.split("")));
}
/*
function cod_barras(cod){
    let total = 0;
    let resultado = "";
    for(y=cod.length-1,x=0;y > 0;y--,x++){
        let caracter = parseInt(cod.substring(y-1,y));
        if((x+1) % 2 ==0){
            total += caracter;
            console.log("caracter par,valor: " + caracter);
            console.log("valor actual: " + caracter);
        }else{
            total += caracter * 3;
            console.log("caracter impar,valor: " + caracter);
            console.log("valor actual: " + caracter * 3);
        }
    }
    total += parseInt(cod.substring(cod.length - 1));
    console.log("valor del total = " + total);
    if(total % 10 == 0 && (cod.length == 8 || cod.length == 13)){resultado= "SI";}
    else{resultado= "NO";}
    if(cod.length==13){
      resultado =  calculo_pais(cod,resultado);
    }
    return resultado + "\n";
}
*/
function cod_barras(cod) {
    if(cod.length <= 1) {
        return "NO\n";
    }
    let v = parseInt(cod.pop());
    cod.reverse()
        .map(x => parseInt(x))
        .map((l,i) => v += i%2==0 ? l*3 : l);
        
    if(v % 10 == 0 && cod.length == 7) {
        return "SI\n";
    } else if(v % 10 == 0 && cod.length++ == 12) {
        cod = cod.reverse()
                .slice(1,4)
                .join('')
        return `SI ${calculo_pais(cod)}\n`;
    } else {
        return "NO\n";
    }
}

function calculo_pais(cod){
    /*
    const regex = m; // eeuu
    const regex = /^50\d{11}/gm; // inglaterra
    const regex = /^70\d{11}/gm; // noruega
    const regex = /^380\d{10}/gm; // bulgaria
    const regex = /^539\d{10}/gm; // irlanda
    const regex = /^560\d{10}/gm; // portugal
    const regex = /^759\d{10}/gm; // venezuela
    const regex = /^850\d{10}/gm; // cuba
    const regex = /^590\d{10}/gm; // india
    */
    let resultado = "";
    resultado += cod.match(/^0\d{12}/g) ? "eeuu" : ""
    if(cod.match(/^0\d{12}/g)) resultado += "EEUU";
    else if (cod.match(/^70\d{11}/g)) resultado += "EEUU";

    switch (cod) {
        case String(cod.match(/0../)):
            resultado += " EEUU";
            break;

        case "380":
            resultado += " Bulgaria";
            break;

        case String(cod.match(/50./)):
            resultado += " Inglaterra";
            break;
            
        case "539":
            resultado += " Irlanda";
            break;

        case "560":
            resultado += " portugal";
            break;

        case String(cod.match(/70./)):
            resultado += " noruega";
            break;

        case "759":
            resultado += " venezulela";
            break;

        case "850":
            resultado += " cuba";
            break;

        case "890":
            resultado += " india";
            break;

        default:
            resultado += " desconocido";
            break;
    }
    return resultado;
}